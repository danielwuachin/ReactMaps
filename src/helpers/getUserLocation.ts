export const getUserLocation = async (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    /* el gelocation tiene una opcion de .watch que permite ver la ubicacion en tiempo real */
    navigator.geolocation.getCurrentPosition(
      /* currentPosition recibe de parametros callback de OK y de Error */
      ({ coords }) => {
        //si todo sale bien, hacemos el resolve de la promesa
        resolve([coords.longitude, coords.latitude]);
      },
      (err) => {
        alert("No se pudo obtener la geolocalizacion");
        console.log(err);
        reject();
      },
      { timeout: 5000, enableHighAccuracy: true }
    );
  });
};
