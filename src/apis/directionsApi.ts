import axios from "axios";

const directionsApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: "geojson",
    overview: "simplified",
    steps: false,
    access_token:
      "pk.eyJ1IjoiZGFuaWVsd3VhY2hpbiIsImEiOiJjbDJqbnR5OWQwMWpmM2RycWIxcGhuc3R5In0.fP0pxJI7im3ym-FZ2Fdllw",
  },
});

export default directionsApi;
