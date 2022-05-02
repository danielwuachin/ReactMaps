/* ESTE ARCHIVO ES PARA TENER UN LUGAR DONDE GUARDAR EL ESTADO Y PROVEERLO */

import React, { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { PlacesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers/getUserLocation";
import { searchApi } from "../../apis";
import { Feature, PlacesResponse } from "../../interfaces/places";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];

  //para cargar las busquedas
  isLoadingPlaces: boolean;
  places: Feature[];
}

/* recuerda asi definir lo que vaya a ser JSX */
interface Props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

/* se coloca el {children} para que pueda recibir contenido jsx dentro de el al momento de invocar el PlacesProvider como etiqueta en el App.tsx */
export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(PlacesReducer, INITIAL_STATE);

  useEffect(() => {
    //lngLat de longitud, latitud (el array devuelto por el resolve)

    //si es true, disparamos el setUserLocation y de payload lo que devuleve el getUserLocation
    getUserLocation().then((lngLat) =>
      dispatch({ type: "setUserLocation", payload: lngLat })
    );
  }, []);

  //para busquedas
  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    //limpiar el cuadro de busqueda
    if (query.length === 0) {
      dispatch({
        type: "setPlaces",
        payload: [],
      });
      return [];
    }

    if (!state.userLocation) throw new Error("No hay ubicacion del usuario");

    // cargar la busqueda
    dispatch({ type: "setLoadingPlaces" });

    //tipamos la respuesta que viene en el get
    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        //ya nuestro userLocation viene en formato longitud - latitud
        proximity: state.userLocation.join(","),
      },
    });

    // guardar la data de los lugares buscados
    dispatch({ type: "setPlaces", payload: resp.data.features });
    console.log(resp.data);

    return resp.data.features;
  };

  return (
    /* no inicializamos los datos en PlacesContext porque ya lo estamos haciendo aqui */
    <PlacesContext.Provider
      value={{
        ...state,

        //methods
        searchPlacesByTerm,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
