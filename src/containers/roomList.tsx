import React, { FC, useState, useEffect } from "react";

import { RoomEntity, UserEntity } from "../types/entities";
import { roomsMock, userMock } from "../mocks/rooms";
import "./roomList.scss";
import UserProfile from "../components/userCard";
import LogoBar from "../components/logobar";
import RoomCard from "../components/roomCard";
import { getUser, getRooms } from "../api";

interface RoomListProps {}

const RoomList: FC<RoomListProps> = () => {
  const [rooms, setRooms] = useState<RoomEntity[]>(roomsMock);
  const [userInfo, setUser] = useState<UserEntity>(userMock);

  useEffect(() => {
    (async () => {
      const rooms = await getRooms();
      setRooms(rooms);
      const userInfo = await getUser();
      setUser(userInfo);
    })();
  }, []);
  return (
    <div className="rooms-root">
      <LogoBar></LogoBar>
      <div className="rooms-header">
        <UserProfile user={userInfo} />
      </div>
      <div className="rooms-list">
        {rooms.map((room) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </div>
    </div>
  );
};

export default RoomList;
