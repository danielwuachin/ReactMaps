import logo from "../logo.svg";

export const Logo = () => {
  return (
    <img
      src={logo}
      alt="Logo"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "130px",
      }}
    />
  );
};
