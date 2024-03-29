import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { login } from "../api";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LogoBar from "../components/logobar";

interface SignInForm {
  username: string;
  password: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#005bea",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-evenly",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const tfStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
  },
}));
const tf_theme = createMuiTheme({
  overrides: {
    MuiFilledInput: {
      root: {
        color: "gray",
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderRadius: 10,
        "&$focused": {
          backgroundColor: "transparent",
          borderRadius: 10,
        },
        "&:hover": {
          "@media (hover: none)": {
            backgroundColor: "transparent",
          },
        },
      },
    },
  },
});

const buttonStyles = makeStyles((theme) => ({
  container: {
    marginTop: "40px",
  },
  signin: {
    height: "45px",
    backgroundColor: "#005BEB",
    border: "1px solid #ffffff",
    borderRadius: "10px",
    marginBottom: "10px",
    color: "#ffffff",
  },
  signup: {
    borderRadius: "8px",
    backgroundColor: "#f5f5f5",
    height: "45px",
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const button_classes = buttonStyles();
  const tf_classes = tfStyles();
  const history = useHistory();
  const { redirect = "/" } = queryString.parse(history.location.search, {
    decode: false,
  });

  const [signInForm, setForm] = useState<SignInForm>({
    username: "",
    password: "",
  });

  const signUpPage = (e: any) => {
    e.preventDefault();
    history.push(`/signup?redirect=${redirect}`);
  };

  const confirmSignIn = (e: any) => {
    e.preventDefault();

    login(signInForm).then(() => {
      history.push(redirect);
    });
    setForm({
      username: "",
      password: "",
    });
  };

  const changeForm = (e: any) => {
    setForm({
      ...signInForm,
      [e.target.id]: e.target.value,
    });
    //console.log("signInForm", signInForm);
  };

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <LogoBar style={{ height: "36px" }} />
      <ThemeProvider
        theme={createMuiTheme({
          palette: { type: "dark", primary: { main: "#f9f9f9" } },
        })}
      >
        <div className={classes.paper}>
          <form onSubmit={confirmSignIn}>
            <ThemeProvider theme={tf_theme}>
              <TextField
                onChange={changeForm}
                className={tf_classes.root}
                variant="filled"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={signInForm.username}
                autoFocus
                InputProps={{
                  disableUnderline: true,
                }}
              />
              <TextField
                onChange={changeForm}
                className={tf_classes.root}
                variant="filled"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={signInForm.password}
                autoComplete="current-password"
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </ThemeProvider>
            <div className={button_classes.container}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={button_classes.signin}
              >
                Sign In
              </Button>
              <Button
                onClick={signUpPage}
                fullWidth
                variant="contained"
                className={button_classes.signup}
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </ThemeProvider>
    </Container>
  );
}
