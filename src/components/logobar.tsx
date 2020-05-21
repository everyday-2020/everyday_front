import React, { FC } from "react";

import Logo from "../assets/images/main_logo.png";
import "./logobar.scss";

const LogoBar: FC = () => (
  <div className="logobar">
    <img src={Logo}></img>
  </div>
);

export default LogoBar;
