import React, { FC } from "react";

import { RoomEntity, UserEntity } from "../types/entities";
import { roomsMock, userMock } from "../mocks/rooms";
import "./roomList.scss";
import UserProfile from "../components/userCard";
import LogoBar from "../components/logobar";
import RoomCard from "../components/roomCard";

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
        {rooms.map(
          room => <RoomCard room={room}/>
        )}
      </div>
    </div>
  );
};

export default RoomList;
