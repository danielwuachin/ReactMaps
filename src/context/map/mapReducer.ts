/* eslint import/no-webpack-loader-syntax: off */

/* el reducer es para cambiar el estado dependiendo del typo de action que le pasemos */

//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import { Map, Marker } from "!mapbox-gl";
import { MapState } from "./MapProvider";

type MapAction =
  | { type: "setMap"; payload: Map }
  | { type: "setMarkers"; payload: Marker[] };

export const mapReducer = (state: MapState, action: MapAction): MapState => {
  switch (action.type) {
    case "setMap":
      return {
        ...state,
        isMapReady: true,
        /* el payload sera el mapa como tal */
        map: action.payload,
      };

    case "setMarkers":
      return {
        ...state,
        markers: action.payload,
      };
    default:
      return state;
  }
};
