import React, { FC } from "react";

import { RoomEntity } from "../types/entities";
import BigEmoji from "./bigEmoji";
import "./roomCard.scss";

interface RoomCardProps {
  room: RoomEntity;
}
const RoomCard: FC<RoomCardProps> = ({ room }) => {
  return (
    <div className="rooms-card">
      <BigEmoji emoji={room.category} backgroundColor="transparent" fontSize={'3.75rem'} />
    </div>
  );
};

export default RoomCard;
