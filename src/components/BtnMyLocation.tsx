import React, { useContext } from "react";
import { MapContext } from "../context/map/MapContext";
import { PlacesContext } from "../context/places/PlacesContext";

export const BtnMyLocation = () => {
  const { map, isMapReady } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  //asegurarse de qeuel mapa este listo y saber ubicacion del usuario
  const onClick = () => {
    if (!isMapReady) throw new Error("Mapa no esta listo");
    if (!userLocation) throw new Error("No hay ubicacion de usuario");

    /* esto esta dentro de mapbox */
    map?.flyTo({
      zoom: 14,
      center: userLocation,
    });
  };

  return (
    <button
      className="btn btn-primary"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 999,
      }}
      onClick={onClick}
    >
      Mi ubicacion
    </button>
  );
};
