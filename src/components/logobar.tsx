import React, { FC } from "react";

import { ReactComponent as Logo } from "../logo.svg";
import "./logobar.scss";
import { useHistory } from "react-router-dom";

const LogoBar: FC = () => {
  const history = useHistory();
  return (
    <div className="logobar">
      <Logo
        style={{ height: "18px" }}
        onClick={() => {
          history.push("/");
        }}
      />
    </div>
  );
};

export default LogoBar;
