/* eslint import/no-webpack-loader-syntax: off */
/* 
contexto para enviar el mapa a cualquier componente interno a traves del proveedor
*/

//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Map } from "!mapbox-gl";
import { createContext } from "react";

interface MapContextProps {
  isMapReady: boolean;
  map?: Map;

  //metodos - asi se tipean en typesccript y asi el proveedor sabe de que tipo es el metodo que estas enviando (esto es en el archivo Provider)
  setMap: (map: Map) => void;
  getRouteBetweenPoints: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>;
}

export const MapContext = createContext({} as MapContextProps);
