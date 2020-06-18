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

export function login(signInForm: SignInForm) {
  instance
    .post(loginUrl, {
      user: signInForm,
    })
    .then((response) => {
      console.log(response);
      alert("Login Success");
      window.location.href = "/";
    })
    .catch((error) => {
      console.log(error);
      alert("Login Failed");
      window.location.href = "/signin";
    });
}

export async function getUser() {
  return instance.get<UserEntity>(userUrl).then((response) => response.data);
}

export function signup(signUpForm: SignUpForm) {
  instance
    .post(usersUrl, {
      user: signUpForm,
    })
    .then((response) => {
      alert("Sign Up Success");
      console.log(response);
      window.location.href = "/signin";
    })
    .catch((error) => {
      console.log(error);
      alert("Failed");
    });
}

export function makeRoom(makeRoomForm: MakeRoomForm) {
  instance
    .post(roomUrl, {
      room: makeRoomForm,
    })
    .then((response) => {
      alert("New Room is created");
      window.location.href = "/";
    })
    .catch((error) => {
      alert("Failed");
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
