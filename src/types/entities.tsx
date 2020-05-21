interface Entity {
  id: number;
  createdAt: Date;
  modifiedAt: Date;
}

export interface VideoEntity extends Entity {
  clicks: number;
  length: number;
  user: UserEntity;
  location: string;
}

export interface RoomEntity extends Entity {
  name: string;
  description: string;
  completeAt: Date;
  inviteCode: string;
  category: string;
}

export interface UserEntity extends Entity {
  nickname: string;
  username: string;
  profilePic: string;
}
