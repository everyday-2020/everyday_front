import axios from "axios";
import { RoomEntity, UserEntity, VideoEntity } from "../types/entities";

const baseURL = "http://localhost:3000";

const loginUrl = `/login`;
const usersUrl = `/users`;
const userUrl = `/user`;
const roomUrl = `/rooms`;
const videoUrl = `/videos`;

export const instance = axios.create({
  baseURL,
  withCredentials: true,
});

interface SignInForm {
  username: string;
  password: string;
}

interface SignUpForm {
  username: string;
  nickname: string;
  password: string;
  profile_pic: string;
}

interface MakeRoomForm {
  title: string;
  description: string;
  complete_at: string;
  category: string;
}

export async function login(signInForm: SignInForm) {
  return instance.post(loginUrl, {
    user: signInForm,
  });
}

export async function getUser() {
  return instance.get<UserEntity>(userUrl).then((response) => response.data);
}

export async function signup(signUpForm: SignUpForm) {
  return instance.post(usersUrl, {
    user: signUpForm,
  });
}

export async function makeRoom(makeRoomForm: MakeRoomForm) {
  return instance.post(roomUrl, {
    room: makeRoomForm,
  });
}

export async function getRooms() {
  return instance.get<RoomEntity[]>(roomUrl).then((response) => response.data);
}

export async function getVideos(
  inviteCode: string,
  date_start?: string,
  date_end?: string
) {
  return instance
    .get<VideoEntity[]>(`${videoUrl}/${inviteCode}`, {
      params: { date_start, date_end },
    })
    .then((response) => response.data);
}
