import React, { FC, useState, useEffect } from "react";

import styles from "./roomList.module.scss";
import UserProfile from "../components/userCard";
import LogoBar from "../components/logobar";
import RoomCard from "../components/roomCard";
import { postLogout, useGetUser, useGetRooms } from "../api";
import Footer from "../components/footer";

interface RoomListProps {}

const RoomList: FC<RoomListProps> = () => {
  const [{ data: rooms = [] }, refetchRooms] = useGetRooms();
  const [{ data: userInfo }] = useGetUser();
  const logout = () => {
    postLogout();
  };
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
      <Footer logout={logout}></Footer>
    </div>
  );
};

export default RoomList;
