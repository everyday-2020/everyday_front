import React, { FC, useState, useEffect } from "react";

import { RoomEntity, UserEntity } from "../types/entities";
import { roomsMock, userMock } from "../mocks/rooms";
import styles from "./roomList.module.scss";
import UserProfile from "../components/userCard";
import LogoBar from "../components/logobar";
import RoomCard from "../components/roomCard";
import { getUser, getRooms } from "../api";

interface RoomListProps {}

const RoomList: FC<RoomListProps> = () => {
  const [rooms, setRooms] = useState<RoomEntity[]>(roomsMock);
  const [userInfo, setUser] = useState<UserEntity>(userMock);
  const fetchRooms = () => {
    getRooms().then((rooms) => {
      setRooms(rooms);
    });
  };
  const fetchUserInfo = () => {
    getUser().then((userInfo) => {
      setUser(userInfo);
    });
  };
  useEffect(() => {
    fetchRooms();
    fetchUserInfo();
  }, []);
  return (
    <div className={styles["root"]}>
      <LogoBar></LogoBar>
      <div className={styles.header}>
        <UserProfile user={userInfo} />
      </div>
      <div className={styles.list}>
        <RoomCard
          room={{
            title: "새 방 만들기",
            description: "",
            complete_at: "",
            category: "heavy_plus_sign",
            id: 0,
            created_at: "",
            modified_at: "",
            invite_code: "create",
          }}
        />
        {rooms.map((room) => (
          <RoomCard room={room} key={room.id} />
        ))}
      </div>
    </div>
  );
};

export default RoomList;
