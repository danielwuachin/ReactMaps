import React from "react";
import "./Loading.css";
export const LoadingPlaces = () => {
  return (
    <div className="alert alert-primary-mt-2 text-center">
      <div className="lds-ellipsis text-center">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
