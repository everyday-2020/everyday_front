interface Entity {
  id: number;
  created_at: string;
  modified_at: string;
}

export interface VideoEntity extends Entity {
  clicks: number;
  length: number;
  user: UserEntity;
  location: string;
  thumbnail: string;
}

export interface RoomEntity extends Entity {
  title: string;
  description: string;
  complete_at: string;
  invite_code: string;
  category: string;
}

export interface UserEntity extends Entity {
  nickname: string;
  username: string;
  profile_pic: string;
}
