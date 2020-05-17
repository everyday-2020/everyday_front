import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

export default () => {
  return (
    <>
      <div className="content" style={{ height: "3000px" }}></div>
      <BottomNavigation
        style={{ position: "sticky", bottom: 0, backgroundColor: "#f0f0f0" }}
        showLabels
      >
        <BottomNavigationAction label="Upload" icon={<AddBoxOutlinedIcon />} />
      </BottomNavigation>
    </>
  );
};
