import React, { useState } from "react";
import LogoBar from "../components/logobar";
import { TextField, Slider, Typography, Button } from "@material-ui/core";
import { makeRoom } from "../api";

interface MakeRoomForm {
  title: string;
  description: string;
  complete_at: string;
  category: string;
}

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  },
  {
    value: 30,
    label: '30',
  }
]

const MakeRoom: React.FC = () => {
  const [makeRoomForm, setForm] = useState<MakeRoomForm>({
    title: '',
    description: '',
    complete_at: '',
    category: 'fitness'
  });
  
  function valueDuration(value) {
    return `${value}`;
  }
  
  const confirmRoom = (e:any) => {
    e.preventDefault();

    makeRoom(makeRoomForm);

    setForm({
      title: '',
      description: '',
      complete_at: '',
      category: 'fitness'
    })
  }
  
  const changeForm = (e:any) => {
    setForm({
      ...makeRoomForm,
      [e.target.id]: e.target.value,
    })
  }
  const changeDuration = (e:any, v:any) => {
      //console.log("e", v);
      let end = new Date();
      //console.log("now", end);
      end.setDate(end.getDate() + v);
      //console.log("end", end);
      const year = end.getFullYear();
      const month = end.getMonth() + 1;
      const date = end.getDate();
      const complete_at = `${year}-${month}-${date}`;
      //console.log(complete_at);
      setForm({
        ...makeRoomForm,
        complete_at: complete_at
      })
      
  }
  
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
          Duration
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
        <Button
          type="submit"
          variant="outlined"
          style={{ margin: 20, color: "#2575fc", borderColor: "#2575fc" }}
        >
          Make new room
        </Button>
      </form>
    </div>
  );
};

export default MakeRoom;
