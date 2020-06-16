import axios from "axios";

const apiUrl = "http://localhost:3000";
const loginUrl = `${apiUrl}/login`;
const usersUrl = `${apiUrl}/users`;
const userUrl = `${apiUrl}/user`;

interface SignInForm {
  username: string;
  password: string;
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
    window.location.href="/signin";
  }
}
