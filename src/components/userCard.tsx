import React, { FC } from "react";
import emoji from "node-emoji";

import { UserEntity } from "../types/entities";
import "./userCard.scss";

interface UsercardProps {
  user: UserEntity;
}

const UserCard: FC<UsercardProps> = ({ user }) => {
  return (
    <div className="card-root">
      <div className="card">{emoji.find(user.profilePic).emoji}</div>
      <div className="card-name">
        <div className="card-nickname">{user.nickname}</div>
        <div className="card-username">{user.username}</div>
      </div>
    </div>
  );
};

export default UserCard;
