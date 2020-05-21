import React, { FC, CSSProperties } from "react";

import { ReactComponent as Logo } from "../logo.svg";
import "./logobar.scss";
import { useHistory } from "react-router-dom";

interface LogoBarProps {
  style?: CSSProperties;
}
const LogoBar: FC<LogoBarProps> = ({ style }) => {
  const history = useHistory();
  return (
    <div className="logobar">
      <Logo
        style={{ height: "18px", ...style }}
        onClick={() => {
          history.push("/");
        }}
      />
    </div>
  );
};

export default LogoBar;
