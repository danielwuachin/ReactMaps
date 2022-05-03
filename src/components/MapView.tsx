/* eslint import/no-webpack-loader-syntax: off */
//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import { useContext, useLayoutEffect, useRef } from "react";
import { PlacesContext, MapContext } from "../context";
import { Loading } from "./Loading";
import { SearchBar } from "./SearchBar";
import { BtnMyLocation } from "./BtnMyLocation";

export const MapView = () => {
  /* 
recuerda SIEMPRE importar el contexto y usarlo asi para poder tener acceso a lo que este te esta proveyendo
*/
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);

  /* como la referencia sera a un div, usamos el HTMLdicelement */
  const mapDiv = useRef<HTMLDivElement>(null);

  /* para esperar a que la referencia haya sido montado y la referencia tenga un valor, y tenga las dimensiones correctas */
  useLayoutEffect(() => {
    if (!isLoading) {
      /* codigo copiado de la guia de instalacion del mapbox, y se le agregaron los valores como center y container adecuados para que funcione como queremos  */
      const map = new mapboxgl.Map({
        container: mapDiv.current!, // container ID

        /* aqui puedes cambiar el tema del mapa, puedes usar /light-v11, o dark-v11, ver documentacion */
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });

      /* como ya tenemos el mapa, se lo pasamos al context por este metodo para que dispare el reducer y actualize el estado */
      setMap(map);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <BtnMyLocation />
      <SearchBar />
      <div
        ref={mapDiv}
        style={{
          height: "100vh",
          left: 0,
          position: "fixed",
          top: 0,
          width: "100vw",
        }}
      >
        {/* el ? significa que si userLocation es true, ejecuta el join, sino no hagas nada */}
        {userLocation?.join(",")}
      </div>
    </>
  );
};
