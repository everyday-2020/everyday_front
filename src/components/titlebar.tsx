import React from "react";

import { useHistory } from "react-router-dom";
import ShareRoom from "./shareRoom";
import "./titlebar.scss";

interface TitleBarProps {
  title: string;
}

const TitleBar: React.FC<TitleBarProps> = ({ title }) => {
  const history = useHistory();
  return (
    <div className="titlebar">
      <div className="title">
        <span
          onClick={() => {
            history.push("/");
          }}
        >
          {title}
        </span>
      <div id="right">
        <ShareRoom />
      </div>
      </div>
    </div>
  );
};

export default TitleBar;
