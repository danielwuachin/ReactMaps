import { createContext } from "react";
import { Feature } from "../../interfaces/places";

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];

  //busqueda
  isLoadingPlaces: boolean;
  places: Feature[];

  //methods
  searchPlacesByTerm: (query: string) => Promise<Feature[]>;
}

// usamos el as para que no de error y no haga falta inicializarlo con valores como cuando usas genericos
export const PlacesContext = createContext({} as PlacesContextProps);
