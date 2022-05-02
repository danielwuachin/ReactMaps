/* eslint import/no-webpack-loader-syntax: off */
/* para definir el estado que sera global para toda la aplicacion y que llamara a las acciones del reducer con disparadores, ademas de crear funciones tipo helper para manerjar lo que contenga el estasdo */

//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl";
import { useReducer, useContext, useEffect } from "react";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { PlacesContext } from "../places/PlacesContext";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

/* recuerda siempre destructurar de las props el objeto hijo children */
export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  //marcadores
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    // propio de mapbox
    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
          <h6>${place.text}</h6>
          <p>${place.place_name}</p>
        `);

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(newMarker);
    }

    //todo: limpiar polyline
    dispatch({ type: "setMarkers", payload: newMarkers });
  }, [places]);

  /* para poder pasar el mapa como payload
  
  para saber el tipado del metodo y poder definirlo en una interfaz, solo deja el cursor en el nombre (en este caso setMap), y copia lo que dice typescript que es (aqui es: (map: Map) => void)*/
  const setMap = (map: Map) => {
    // Popup, se lo aplicaremos al dar click al marcador de mi ubicacion
    const myLocationPopup = new Popup().setHTML(`<h4>Aqui estas</h4>
    <p>tu ubicacion actual</p>`);

    //marcador, ver documentacion de mapbox y objeto Map. crear maracador y add to map
    new Marker({
      color: "#61DAFB",
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

    //actualizar estado
    dispatch({ type: "setMap", payload: map });
  };

  //direcciones
  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionsApi.get<DirectionsResponse>(
      `/${start.join(",")};${end.join(",")}`
    );

    //para agregar a futuro
    const { distance, duration, geometry } = resp.data.routes[0];

    //coordenadas para el polyline
    const { coordinates: coords } = geometry;

    /* 
    calcular distancia y kilometros
    */
    let km = distance / 1000;
    km = Math.round(km * 100);
    km /= 100;

    const minutes = Math.floor(duration / 60);
    console.log({ km, minutes });
    console.log(resp);

    /* 
    al crear la ruta, el zoom sea el adecuado para ver toda la ruta completa
    */
    const bounds = new LngLatBounds(start, start);

    for (const coord of coords) {
      // para cambiar el tipado y que lo pueda acetpar la clase bounds
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    // acomodando el zoom, metodo de mapbox. este te permite anadir un objeto con propiedades tipo css
    state.map?.fitBounds(bounds, {
      padding: 200,
    });

    /* 
    asi sacas las polylines de las rutas, ver documentacion
    las coordenadas son las que sacas de geometry arriba
    */
    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };

    /* 
    remover polilyne, tanto la data como el layout si ya existia 
    anadir y dar estilos al polyline para que se pueda ver 
    */
    if (state.map?.getLayer("RouteString")) {
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");
    }
    state.map?.addSource("RouteString", sourceData);

    //el id es el que definimos al anadir el source
    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "green",
        "line-width": 8,
      },
    });
  };
  /* esparcimos en un objeto el valor del estado para que el proveedor lo pueda otorgar a sus hijos */
  return (
    <MapContext.Provider
      value={{
        ...state,

        //metodos
        setMap,
        getRouteBetweenPoints,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
