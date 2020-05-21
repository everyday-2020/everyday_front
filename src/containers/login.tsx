import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LogoBar from "../components/logobar";

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
    <ThemeProvider theme={tf_theme}>
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
    </ThemeProvider>
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
      <LogoBar style={{ height: "36px" }} />
      <ThemeProvider
        theme={createMuiTheme({
          palette: { type: "dark", primary: { main: "#f9f9f9" } },
        })}
      >
        <div className={classes.paper}>
          <UsernameTextField></UsernameTextField>
          <PasswordTextField></PasswordTextField>
          <SignInButton></SignInButton>
        </div>
      </ThemeProvider>
    </Container>
  );
}
