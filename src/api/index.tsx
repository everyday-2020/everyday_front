import axios from "axios";
import { RoomEntity, UserEntity, VideoEntity } from "../types/entities";

export const baseURL = "http://localhost:3000";

const loginUrl = `/login`;
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
    .get<VideoEntity[]>(`${videosUrl}/${inviteCode}`, {
      params: { date_start, date_end },
    })
    .then((response) => response.data);
}

export function patchRoom() {
  const roomcode = window.location.href.split('/')[4];
  const joinRoomUrl = roomUrl.concat('/', roomcode);
  instance.patch(joinRoomUrl).then((response) => {alert("Join in this room successfully.")})

}
export async function postVideo(inviteCode: string, clip: File) {
  const data = new FormData();
  data.append("clip", clip);
  return instance.post(`${videosUrl}/${inviteCode}`, data);
}

export async function getVideo(id: number) {
  return instance.get(`${videoUrl}/${id}`);
}
