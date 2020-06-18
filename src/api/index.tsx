import axios from "axios";
import { RoomEntity, UserEntity } from "../types/entities";

const baseURL = "http://localhost:3000";

const loginUrl = `/login`;
const usersUrl = `/users`;
const userUrl = `/user`;
const roomUrl = `/rooms`;

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response.status === 403) {
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

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

export function login(signInForm: SignInForm,  prevUrl: String) {
  instance
    .post(loginUrl, {
      user: signInForm,
    })
    .then((response) => {
      const urlSplit = prevUrl.split('/');
      alert("Login Success");
      //invited
      if(urlSplit[3]==='room'){
        const invitedUrl = "/room/".concat(urlSplit[4]);
        window.location.href = invitedUrl;
      }
      else{
        window.location.href = "/";
      }      
    })
    .catch((error) => {
      console.log(error);
      alert("Login Failed");
      window.location.href = "/signin";
    });
}

export async function getUser() {
  const response = await instance.get<UserEntity>(userUrl);
  return response.data;
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
  const response = await instance.get(roomUrl);
  return await response.data;
}

export function patchRoom(rooms: RoomEntity[]) {
  const roomcode = window.location.href.split('/')[4];
  const joinRoomUrl = roomUrl.concat('/', roomcode);
  instance.patch(joinRoomUrl).then((response) => {alert("Join in this room successfully.")})

}