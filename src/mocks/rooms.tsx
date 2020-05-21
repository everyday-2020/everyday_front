import { UserEntity, RoomEntity } from "../types/entities";

export const roomsMock: RoomEntity[] = [
  {
    id: 1,
    createdAt: new Date("2020-01-02"),
    modifiedAt: new Date("2020-01-02"),
    name: "",
    description: "",
    completeAt: new Date("2020-06-07"),
    inviteCode: "abcde",
    category: "tree",
  },
];
export const userMock: UserEntity = {
  id: 1,
  createdAt: new Date("2020-01-02"),
  modifiedAt: new Date("2020-01-02"),
  nickname: "test1",
  username: "test1",
  profilePic: "hamburger",
};
