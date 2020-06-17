import React, { useState } from "react";
import LogoBar from "../components/logobar";
import {
  TextField,
  Slider,
  Typography,
  Button,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { makeRoom } from "../api";
import Picker from "emoji-picker-react";

interface MakeRoomForm {
  title: string;
  description: string;
  complete_at: string;
  category: string;
}

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
  const [makeRoomForm, setForm] = useState<MakeRoomForm>({
    title: "",
    description: "",
    complete_at: "",
    category: "",
  });

  const [chosenEmoji, setChosenEmoji] = useState(null);

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

    makeRoom(makeRoomForm);
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
      <LogoBar />
      <form
        onSubmit={confirmRoom}
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 20,
        }}
      >
        <TextField
          id="title"
          onChange={changeForm}
          required
          label="Room title"
          InputLabelProps={{
            shrink: true,
            style: { color: "#2575fc", fontSize: 20 },
          }}
          placeholder="room title"
          margin="normal"
          variant="standard"
          fullWidth
        />
        <TextField
          id="description"
          onChange={changeForm}
          required
          label="Description"
          InputLabelProps={{
            shrink: true,
            style: { color: "#2575fc", fontSize: 20 },
          }}
          placeholder="description"
          margin="normal"
          variant="standard"
          fullWidth
        />
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
          defaultValue={7}
          getAriaValueText={valueDuration}
          aria-labelledby="duration-slider"
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={30}
          marks={marks}
        />
        <div>
          <Typography
            id="category-picker"
            gutterBottom
            style={{ marginTop: 15, fontSize: 15, color: "#2575fc" }}
          >
            Category * :{" "}
            {chosenEmoji ? (
              <span>{chosenEmoji}</span>
            ) : (
              <span style={{ color: "#525252" }}>Choose the category</span>
            )}
            <Button
              onClick={showPicker}
              variant="contained"
              size="small"
              style={{
                marginLeft: "5px",
                color: "#2575fc",
                borderColor: "#2575fc",
              }}
            >
              Choose
            </Button>
          </Typography>
        </div>
        <Button
          type="submit"
          variant="outlined"
          style={{ margin: 20, color: "#2575fc", borderColor: "#2575fc" }}
        >
          Make new room
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
