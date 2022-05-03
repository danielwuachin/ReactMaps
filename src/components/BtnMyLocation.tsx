import React, { useContext } from "react";
import { MapContext } from "../context/map/MapContext";
import { PlacesContext } from "../context/places/PlacesContext";
import locationWhite from "../locationWhite.svg";

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
      className="btn btn-primary shadow"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 999,
      }}
      onClick={onClick}
    >
      You
      <img
        alt="your location icon"
        src={locationWhite}
        style={{
          marginLeft: "4px",
          width: "1.1rem",
          height: "1.1rem",
        }}
      />
    </button>
  );
};
