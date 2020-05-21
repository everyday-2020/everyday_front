import React, { FC } from "react";

import { RoomEntity } from "../types/entities";
import BigEmoji from "./bigEmoji";
import "./roomCard.scss";
import { useHistory } from "react-router-dom";

interface RoomCardProps {
  room: RoomEntity;
}
const RoomCard: FC<RoomCardProps> = ({ room }) => {
  const isCompleted = room.completeAt < new Date();
  const history = useHistory();
  return (
    <div
      className={`rooms-card ${isCompleted && "completed"}`}
      onClick={() => {
        history.push("/room");
      }}
    >
      {room.name}
      <br />
      {room.description}
      <BigEmoji
        emoji={room.category}
        style={{
          backgroundColor: "transparent",
          fontSize: "3.75rem",
          width: "4rem",
          height: "4rem",
          marginLeft: "auto",
        }}
      />
    </div>
  );
};

export default RoomCard;
