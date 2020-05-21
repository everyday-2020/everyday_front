import { UserEntity, RoomEntity } from "../types/entities";

export const roomsMock: RoomEntity[] = [
  {
    id: 1,
    createdAt: new Date("2020-01-02"),
    modifiedAt: new Date("2020-01-02"),
    name: "나무 심기",
    description: "하루에 한 그루씩 나무를 심는 방",
    completeAt: new Date("2020-06-07"),
    inviteCode: "abcde",
    category: "deciduous_tree",
  },
  {
    id: 2,
    createdAt: new Date("2020-01-02"),
    modifiedAt: new Date("2020-01-02"),
    name: "저녁 먹기",
    description: "하루에 한 번씩 저녁을 먹는 방",
    completeAt: new Date("2020-06-07"),
    inviteCode: "abcde",
    category: "🍽️",
  },
  {
    id: 3,
    createdAt: new Date("2020-01-02"),
    modifiedAt: new Date("2020-01-02"),
    name: "탁구",
    description: "1일1탁구",
    completeAt: new Date("2020-06-07"),
    inviteCode: "abcde",
    category: "🏓",
  },
  {
    id: 4,
    createdAt: new Date("2020-01-02"),
    modifiedAt: new Date("2020-01-02"),
    name: "주사위",
    description: "주사위 던진다",
    completeAt: new Date("2020-02-07"),
    inviteCode: "abcde",
    category: "🎲",
  },
];
export const userMock: UserEntity = {
  id: 1,
  createdAt: new Date("2020-01-02"),
  modifiedAt: new Date("2020-01-02"),
  nickname: "버거킹",
  username: "I love burger...",
  profilePic: "hamburger",
};
