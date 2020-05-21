import React, { FC } from "react";

import { UserEntity } from "../types/entities";
import "./userCard.scss";
import BigEmoji from "./bigEmoji";

interface UsercardProps {
  user: UserEntity;
}

const UserCard: FC<UsercardProps> = ({ user }) => {
  return (
    <div className="usercard-root">
      <BigEmoji emoji={user.profilePic}/>
      <div className="usercard-name">
        <div className="usercard-nickname">{user.nickname}</div>
        <div className="usercard-username">{user.username}</div>
      </div>
    </div>
  );
};

export default UserCard;
