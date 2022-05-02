import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 4,
    access_token:
      "pk.eyJ1IjoiZGFuaWVsd3VhY2hpbiIsImEiOiJjbDJqbnR5OWQwMWpmM2RycWIxcGhuc3R5In0.fP0pxJI7im3ym-FZ2Fdllw",
  },
});

export default searchApi;
