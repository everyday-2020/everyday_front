import { UserEntity, RoomEntity } from "../types/entities";

export const roomsMock: RoomEntity[] = [
  {
    id: 1,
    created_at: "2020-01-02",
    modified_at: "2020-01-02",
    title: "나무 심기",
    description: "하루에 한 그루씩 나무를 심는 방",
    complete_at: "2020-06-20",
    invite_code: "abcde",
    category: "deciduous_tree",
  },
  {
    id: 2,
    created_at: "2020-01-02",
    modified_at: "2020-01-02",
    title: "저녁 먹기",
    description: "하루에 한 번씩 저녁을 먹는 방",
    complete_at: "2020-06-20",
    invite_code: "abcde",
    category: "🍽️",
  },
  {
    id: 3,
    created_at: "2020-01-02",
    modified_at: "2020-01-02",
    title: "탁구",
    description: "1일1탁구",
    complete_at: "2020-06-07",
    invite_code: "abcde",
    category: "🏓",
  },
  {
    id: 4,
    created_at: "2020-01-02",
    modified_at: "2020-01-02",
    title: "주사위",
    description: "주사위 던진다",
    complete_at: "2020-02-07",
    invite_code: "abcde",
    category: "🎲",
  },
];
export const userMock: UserEntity = {
  id: 1,
  created_at: "2020-01-02",
  modified_at: "2020-01-02",
  nickname: "버거킹",
  username: "I love burger...",
  profilePic: "hamburger",
};
