/* eslint import/no-webpack-loader-syntax: off */

import React from "react";
import ReactDOM from "react-dom/client";
import { MapsApp } from "./MapsApp";

/* esto es para que funcione el token del mapBox, adicional descargamos unas dependencias para el typescript necesario para usar mapbox 

por problemas en produccion, evitamos que al transpilar se importe el mapbox-gl
*/

//@ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGFuaWVsd3VhY2hpbiIsImEiOiJjbDJqbnR5OWQwMWpmM2RycWIxcGhuc3R5In0.fP0pxJI7im3ym-FZ2Fdllw";

/* asi evitamos que renderice la app si no hay opcion de geolocalizacions */
/* if (!navigator.geolocation) {
  alert("Tu navegador no tiene opcion de Geolocalizacion");

  throw new Error("Tu navegador no tiene opcion de Geolocalizacion");
} */

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);
