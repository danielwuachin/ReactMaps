import "./Loading.css";
export const Loading = () => {
  return (
    <div className="loading-map flex-column d-flex justify-content-center align-items-center">
      <div className="text-center">
        <div>Localizando...</div>
        <br />
        <div className="lds-ellipsis ">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
