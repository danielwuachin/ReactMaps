/* los reducer reciben el estado y devuelven el estado igual o modificado dependiendo de las acciones 
por eso devuelve un objeto igual al definido en PlacesProvider, ya que es el mismo tipo de objeto*/

import { Feature } from "../../interfaces/places";
import { PlacesState } from "./PlacesProvider";

type PlacesAction =
  | {
      type: "setUserLocation";
      payload: [number, number];
    }
  | { type: "setPlaces"; payload: Feature[] }
  | { type: "setLoadingPlaces" };

export const PlacesReducer = (
  state: PlacesState,
  action: PlacesAction
): PlacesState => {
  switch (action.type) {
    case "setUserLocation":
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };

    // realizar la busqueda
    case "setLoadingPlaces":
      return {
        ...state,
        isLoadingPlaces: true,

        //si hacemos una busqueda, limpiamos la anterior
        places: [],
      };

    //cargar los resultados de la busqueda
    case "setPlaces":
      return {
        ...state,
        isLoadingPlaces: false,
        places: action.payload,
      };
    default:
      return state;
  }
};
