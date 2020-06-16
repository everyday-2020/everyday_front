import axios from "axios";

const apiUrl = "http://localhost:3000";
const loginUrl = `${apiUrl}/login`;
const usersUrl = `${apiUrl}/users`;
const userUrl = `${apiUrl}/user`;
const roomUrl = `${apiUrl}/rooms`;

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
  axios
    .post(
      loginUrl,
      {
        user: signInForm,
      },
      { withCredentials: true }
    )
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
  try {
    const response = await axios.get(userUrl, {
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    window.location.href = "/signin";
  }
}

export function signup(signUpForm: SignUpForm) {
  axios
    .post(
      usersUrl,
      {
        user: signUpForm,
      },
      { withCredentials: true }
    )
    .then((response) => {
      alert("Sign Up Success");
      console.log(response);
      window.location.href = "/";
    })
    .catch((error) => {
      console.log(error);
      alert("Failed");
    });
}

export function makeRoom(makeRoomForm: MakeRoomForm) {
  axios.post(
    roomUrl,
    {
      room: makeRoomForm,
    },
    { withCredentials: true }
  )
  .then((response) => {
    alert("New Room is created");
    window.location.href = "/";
  })
  .catch((error) => {
    alert("Failed");
  })
}
