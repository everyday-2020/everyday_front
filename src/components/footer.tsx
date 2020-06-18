import React, { FC } from "react";
import { useHistory } from "react-router-dom";

interface FooterProps {
  logout: () => void;
}
const Footer: FC<FooterProps> = ({ logout }) => {
  const history = useHistory();
  return (
    <div
      style={{
        marginTop: "auto",
        marginBottom: "5px",
        textAlign: "center",
      }}
    >
      <span
        onClick={() => {
          logout();
          history.push("/signin");
        }}
        style={{ padding: "5px", fontSize: "0.2rem", color: "grey" }}
      >
        logout
      </span>
    </div>
  );
};

export default Footer;
