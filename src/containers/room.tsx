import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
//import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
//import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

import DateBoard from "../components/dateboard";
import { vids2, vids } from "../mocks/video";

import LogoBar from "../components/logobar";
import VideoSelect from "./videoSelect";

const Room: React.FC = () => {
  return (
    <>
      <div
        className="content"
        style={{ height: "calc(100vh - 56px)", overflow: "scroll" }}
      >
        <LogoBar />
        <DateBoard date={new Date(2020, 4, 21)} videos={vids} />
        <DateBoard date={new Date(2020, 4, 22)} videos={vids2} />
      </div>
      <BottomNavigation
        style={{ position: "sticky", bottom: 0, backgroundColor: "#f0f0f0" }}
        showLabels
      >
        <VideoSelect />
      </BottomNavigation>
    </>
  );
};

export default Room;
