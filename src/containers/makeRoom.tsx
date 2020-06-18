import React, { useState } from "react";
import LogoBar from "../components/logobar";
import {
  TextField,
  Slider,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Avatar,
} from "@material-ui/core";
import { makeRoom } from "../api";
import Picker from "emoji-picker-react";
import { useHistory } from "react-router-dom";
import BigEmoji from "../components/bigEmoji";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

interface MakeRoomForm {
  title: string;
  description: string;
  complete_at: string;
  category: string;
}

const useStyles = makeStyles((theme) => ({
  profile: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: "#868e96",
  },
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
    margin: "20px",
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
        backgroundColor: "white",
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
        borderRadius: "4px",
        "&$focused": {
          backgroundColor: "transparent",
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

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 30,
    label: "30",
  },
];

const MakeRoom: React.FC = () => {
  const classes = useStyles();
  const tf_classes = tfStyles();
  const [makeRoomForm, setForm] = useState<MakeRoomForm>({
    title: "",
    description: "",
    complete_at: "",
    category: "",
  });

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const history = useHistory();
  //dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function valueDuration(value) {
    return `${value}`;
  }

  const confirmRoom = async (e: any) => {
    e.preventDefault();

    makeRoom(makeRoomForm)
      .then((response) => {
        history.push("/");
      })
      .catch((error) => {
        alert("Failed");
      });
    console.log(makeRoomForm);
    setForm({
      title: "",
      description: "",
      complete_at: "",
      category: "",
    });
  };

  const changeForm = (e: any) => {
    setForm({
      ...makeRoomForm,
      [e.target.id]: e.target.value,
    });
  };

  const changeDuration = (e: any, v: any) => {
    let end = new Date();
    end.setDate(end.getDate() + v);
    const year = end.getFullYear();
    const month = end.getMonth() + 1;
    const date = end.getDate();
    const complete_at = `${year}-${month}-${date}`;
    setForm({
      ...makeRoomForm,
      complete_at: complete_at,
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
      ...makeRoomForm,
      category: name,
    });
    handleClose();
  };

  const showPicker = (e: any) => {
    e.preventDefault();
    handleClickOpen();
  };

  return (
    <div
      className="content"
      style={{ height: "calc(100vh - 56px)", overflow: "scroll" }}
    >
      <div>
        <p
          style={{
            letterSpacing: "-0.5px",
            textAlign: "center",
            fontSize: "25px",
            fontWeight: 600,
            margin: "20px",
          }}
        >
          {"Create Room"}
        </p>
      </div>

      <form
        onSubmit={confirmRoom}
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 20,
        }}
      >
        <div>
          <Avatar className={classes.profile}>
            <div>
              {chosenEmoji ? (
                <BigEmoji
                  emoji={makeRoomForm.category}
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
              className={classes.button}
            >
              Choose
            </Button>
          </div>
        </div>
        <ThemeProvider theme={tf_theme}>
          <TextField
            id="title"
            className={tf_classes.root}
            onChange={changeForm}
            required
            label="Room title"
            InputProps={{
              disableUnderline: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="filled"
            value={makeRoomForm.title}
            fullWidth
          />
          <TextField
            id="description"
            onChange={changeForm}
            className={tf_classes.root}
            required
            label="Description"
            InputProps={{
              disableUnderline: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="filled"
            value={makeRoomForm.description}
            fullWidth
          />
        </ThemeProvider>
        <Typography
          id="duration-slider"
          gutterBottom
          style={{ marginTop: 15, fontSize: 15, color: "#2575fc" }}
        >
          Duration *
        </Typography>
        <Slider
          id="duration"
          onChange={changeDuration}
          defaultValue={0}
          getAriaValueText={valueDuration}
          aria-labelledby="duration-slider"
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={30}
          marks={marks}
        />
        <Button type="submit" className={classes.submit} variant="outlined">
          Create new room
        </Button>
      </form>
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
    </div>
  );
};

export default MakeRoom;
