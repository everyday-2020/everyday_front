import React, { FC } from "react";

import { RoomEntity, UserEntity } from "../types/entities";
import { roomsMock, userMock } from "../mocks/rooms";
import "./roomList.scss";
import UserProfile from "../components/userProfile";

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
      <div className="rooms-header">
        <UserProfile user={user}/>
      </div>
      <div className="rooms-list">
        <div className="rooms-entry"></div>
        <div className="rooms-entry"></div>
      </div>
    </div>
  );
};

export default RoomList;
