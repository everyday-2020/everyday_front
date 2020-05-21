import React, { FC } from "react";

import { RoomEntity, UserEntity } from "../types/entities";
import { roomsMock, userMock } from "../mocks/rooms";
import "./roomList.scss";
import UserProfile from "../components/userCard";
import LogoBar from "../components/logobar";
import RoomCard from "../components/roomCard";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

interface RoomListProps {
  rooms?: RoomEntity[];
  user?: UserEntity;
}
const RoomList: FC<RoomListProps> = ({
  rooms = roomsMock,
  user = userMock,
}) => {
  return (
    <div className="rooms-root">
      <LogoBar></LogoBar>
      <div className="rooms-header">
        <UserProfile user={user} />
      </div>
      <div className="rooms-list">
        {rooms.map((room) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </div>
      <BottomNavigation
        style={{ position: "sticky", bottom: 0, backgroundColor: "#f0f0f0" }}
        showLabels
        onClick={() => {
          window.location.href = "/makeroom";
        }}
      >
        <BottomNavigationAction
          label="New room"
          icon={<AddBoxOutlinedIcon />}
        />
      </BottomNavigation>
    </div>
  );
};

export default RoomList;
