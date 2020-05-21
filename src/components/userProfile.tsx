import React, { FC } from "react";
import emoji from "node-emoji";

import { UserEntity } from "../types/entities";
import "./userProfile.scss";

interface UserProfileProps {
  user: UserEntity;
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="profile-root">
      <div className="profile">{emoji.find(user.profilePic).emoji}</div>
      <div className="profile-name">
        <div className="profile-nickname">{user.nickname}</div>
        <div className="profile-username">@{user.username}</div>
      </div>
    </div>
  );
};

export default UserProfile;
