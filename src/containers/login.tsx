import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Logo from "../assets/images/main_logo.png";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#005bea",
    height: "100vh",
  },
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  bg_rectangle: {
    display: "flex",
    height: "134px",
    background: "#005bea",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {},
  tf: {},
}));

const tfStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    borderRadius: 10,
  },
}));
const tf_theme = createMuiTheme({
  overrides: {
    MuiFilledInput: {
      root: {
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
  submit: {
    backgroundColor: "#D3D3D3",
    color: "#005bea",
  },
}));

function PasswordTextField(props) {
  const classes = tfStyles();

  return (
    <ThemeProvider theme={tf_theme}>
      <TextField
        className={classes.root}
        variant="filled"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        InputProps={{
          disableUnderline: true,
        }}
      />
    </ThemeProvider>
  );
}
function UsernameTextField(props) {
  const classes = tfStyles();
  return (
    <TextField
      className={classes.root}
      variant="filled"
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      autoFocus
      InputProps={{
        disableUnderline: true,
      }}
    />
  );
}
function SignInButton() {
  const classes = buttonStyles();
  return (
    <div className={classes.container}>
      <Link
        href="./rooms"
        style={{
          textDecoration: "none",
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className={classes.submit}
        >
          Sign In
        </Button>
      </Link>
    </div>
  );
}

export default function SignIn() {
  const classes = useStyles();
  const tf_classes = tfStyles();

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <div className={classes.bg_rectangle}>
        <img className={classes.logo} src={Logo} alt="logo"></img>
      </div>

      <div className={classes.paper}>
        <UsernameTextField></UsernameTextField>
        <PasswordTextField></PasswordTextField>
        <SignInButton></SignInButton>
      </div>
    </Container>
  );
}
