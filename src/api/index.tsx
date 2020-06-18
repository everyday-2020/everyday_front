import axios from "axios";
import useAxios from "axios-hooks";
import { RoomEntity, UserEntity, VideoEntity } from "../types/entities";

export const baseURL = "http://localhost:3000";

const loginUrl = `/login`;
const logoutUrl = `/logout`;
const usersUrl = `/users`;
const userUrl = `/user`;
const roomUrl = `/rooms`;
const videosUrl = `/videos`;
const videoUrl = `/video`;

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

export function useGetUser() {
  return useAxios<UserEntity>({ url: userUrl, method: "GET" });
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

export function useGetRooms() {
  return useAxios<RoomEntity[]>({ url: roomUrl, method: "GET" });
}

export async function getVideos(
  inviteCode: string,
  date_start?: string,
  date_end?: string
) {
  return instance
    .get<VideoEntity[]>(`${videosUrl}/${inviteCode}`, {
      params: { date_start, date_end },
    })
    .then((response) => response.data);
}
export function useGetVideos(
  inviteCode: string,
  date_start?: string,
  date_end?: string
) {
  return useAxios<VideoEntity[]>({
    url: `${videosUrl}/${inviteCode}`,
    method: "GET",
    params: { date_end, date_start },
  });
}

export async function patchRoom(inviteCode: string) {
  return instance.patch(`${roomUrl}/${inviteCode}`);
}
export async function postVideo(inviteCode: string, clip: File) {
  const data = new FormData();
  data.append("clip", clip);
  return instance.post(`${videosUrl}/${inviteCode}`, data);
}

export async function getVideo(id: number) {
  return instance.get(`${videoUrl}/${id}`);
}

export async function postLogout() {
  return instance.post(logoutUrl);
}
