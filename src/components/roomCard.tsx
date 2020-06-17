import React, { FC } from "react";

import { RoomEntity } from "../types/entities";
import BigEmoji from "./bigEmoji";
import "./roomCard.scss";
import { useHistory } from "react-router-dom";

interface RoomCardProps {
  room: RoomEntity;
}
const RoomCard: FC<RoomCardProps> = ({ room }) => {
  const isCompleted = new Date(room.complete_at) < new Date();
  const history = useHistory();
  return (
    <div
      className={`rooms-card ${isCompleted && "completed"}`}
      onClick={() => {
        history.push(`/room/${room.invite_code}`);
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3>{room.title}</h3>
        <div style={{ flex: 0, marginTop: "auto" }}>
          {room.description}
          <br />
          {new Date(room.complete_at).toLocaleDateString()}
        </div>
      </div>
      <BigEmoji
        emoji={room.category}
        style={{
          backgroundColor: "transparent",
          fontSize: "3.75rem",
          width: "4rem",
          height: "4rem",
          marginLeft: "auto",
          alignSelf: "center",
        }}
      />
    </div>
  );
};

export default RoomCard;
