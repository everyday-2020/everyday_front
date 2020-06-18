import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  Container,
  CssBaseline,
  Typography,
  Avatar,
} from "@material-ui/core";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { signup } from "../api";
import Picker from "emoji-picker-react";
import BigEmoji from "../components/bigEmoji";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

interface SignUpForm {
  username: string;
  nickname: string;
  password: string;
  profile_pic: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profile: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: "#868e96",
  },
}));

const tfStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: "4px",
    boxShadow: "0px 0px 6px 2px rgba(0,0,0,0.1)",
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
  button: {
    backgroundColor: "#ffffff",
    boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.1)",
    color: "#005bea",
    marginBottom: "10px",
    marginTop: "10px",
  },
  submit: {
    backgroundColor: "#005bea",
    boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.1)",
    color: "#ffffff",
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const bt_classes = buttonStyles();
  const tf_classes = tfStyles();

  const [signUpForm, setForm] = useState<SignUpForm>({
    username: "",
    nickname: "",
    password: "",
    profile_pic: "",
  });
  const history = useHistory();
  const { redirect } = queryString.parse(history.location.search, {
    decode: false,
  });

  const [chosenEmoji, setChosenEmoji] = useState(null);

  console.log("signUpForm ", signUpForm);

  //dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const confirmSignUp = (e: any) => {
    e.preventDefault();

    signup(signUpForm)
      .then(() => {
        history.push(`/signin?redirect=${redirect}`);
      })
      .catch((error) => {
        console.log(error);
        alert("Failed");
      });

    setForm({
      username: "",
      nickname: "",
      password: "",
      profile_pic: "",
    });
  };

  const changeForm = (e: any) => {
    setForm({
      ...signUpForm,
      [e.target.id]: e.target.value,
    });
  };

  const onEmojiClick = (e, emojiObject) => {
    setChosenEmoji(emojiObject.emoji);
    console.log(emojiObject);
    console.log(emojiObject.names[0]);
    const name =
      emojiObject.names.length === 1
        ? emojiObject.names[0]
        : emojiObject.names[1];
    setForm({
      ...signUpForm,
      profile_pic: name,
    });
    handleClose();
  };

  const showPicker = (e: any) => {
    e.preventDefault();
    handleClickOpen();
  };

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <div>
        <p
          style={{
            letterSpacing: "-0.2px",
            textAlign: "center",
            fontSize: "25px",
            fontWeight: 600,
            margin: "20px",
          }}
        >
          {"Sign Up"}
        </p>
      </div>

      <Avatar className={classes.profile}>
        <div>
          {chosenEmoji ? (
            <BigEmoji
              emoji={signUpForm.profile_pic}
              style={{
                backgroundColor: "transparent",
                fontSize: "3.75rem",
                width: "4rem",
                height: "4rem",
                marginLeft: "auto",
                alignSelf: "center",
              }}
            />
          ) : (
            <span style={{ color: "#ffffff" }}> none </span>
          )}
        </div>
      </Avatar>
      <div>
        <Button
          onClick={showPicker}
          variant="contained"
          size="small"
          className={bt_classes.button}
        >
          Choose
        </Button>
      </div>
      <ThemeProvider
        theme={createMuiTheme({
          palette: { type: "dark", primary: { main: "#f9f9f9" } },
        })}
      >
        <div className={classes.paper}>
          <form onSubmit={confirmSignUp}>
            <ThemeProvider theme={tf_theme}>
              <TextField
                className={tf_classes.root}
                label="Username"
                onChange={changeForm}
                id="username"
                fullWidth
                variant="filled"
                margin="normal"
                required
                autoComplete="username"
                autoFocus
                InputProps={{
                  disableUnderline: true,
                }}
              />
              <TextField
                className={tf_classes.root}
                label="Nickname"
                onChange={changeForm}
                id="nickname"
                fullWidth
                variant="filled"
                margin="normal"
                required
                autoComplete="nickname"
                autoFocus
                InputProps={{
                  disableUnderline: true,
                }}
              />
              <TextField
                className={tf_classes.root}
                label="Password"
                onChange={changeForm}
                id="password"
                type="password"
                fullWidth
                variant="filled"
                margin="normal"
                required
                autoComplete="password"
                autoFocus
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </ThemeProvider>
            <div style={{ padding: "20px" }}>
              <Button
                type="submit"
                variant="outlined"
                className={bt_classes.submit}
                fullWidth
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </ThemeProvider>
      <Dialog open={open} onClose={handleClose} maxWidth={"sm"}>
        <DialogContent
          style={{
            width: 300,
            height: 300,
            overflow: "hidden",
          }}
        >
          <Picker onEmojiClick={onEmojiClick} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
