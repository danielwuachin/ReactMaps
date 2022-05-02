import { useContext, useState } from "react";
import { MapContext, PlacesContext } from "../context";

import { LoadingPlaces } from "./";
import { Feature } from "../interfaces/places";

export const SearchResults = () => {
  const { isLoadingPlaces, places, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPoints } = useContext(MapContext);

  const [activeId, setActiveId] = useState("");

  //para volar al hacer click en un resultado de busqueda
  const onPlaceClicked = (place: Feature) => {
    // crear estado activo
    setActiveId(place.id);

    // hacer el fly
    const [lng, lat] = place.center;
    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

  // para las direcciones
  const getRoute = (place: Feature) => {
    if (!userLocation) return console.log("NOLSA PERRO");

    const [lng, lat] = place.center;
    getRouteBetweenPoints(userLocation, [lng, lat]);
  };

  if (isLoadingPlaces) {
    return <LoadingPlaces />;
  }

  // para evitar padding fantasma
  if (places.length === 0) {
    return <></>;
  }

  return (
    <ul className="list-group mt-3">
      {places.map((place) => (
        <li
          key={place.id}
          className={`list-group-item list-group-item-action pointer ${
            activeId === place.id ? "active" : ""
          }`}
          onClick={() => onPlaceClicked(place)}
        >
          <h6>{place.text}</h6>
          <p
            style={{
              fontSize: "12px",
            }}
          >
            {place.place_name}
          </p>
          <button
            onClick={() => getRoute(place)}
            className={`btn  btn-sm ${
              activeId === place.id
                ? "btn-outline-light"
                : "btn-outline-primary"
            }`}
          >
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
};
