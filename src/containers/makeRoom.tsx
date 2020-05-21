import React from "react";
import LogoBar from "../components/logobar";
import { TextField, Slider, Typography, Button } from "@material-ui/core";

function valueDuration(value) {
  return "${value}일";
}

const MakeRoom: React.FC = () => {
  return (
    <div
      className="content"
      style={{ height: "calc(100vh - 56px)", overflow: "scroll" }}
    >
      <LogoBar />
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 20,
        }}
      >
        <TextField
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
          defaultValue={7}
          getAriaValueText={valueDuration}
          aria-labelledby="duration-slider"
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={30}
        />
      </form>
      <Button
        variant="outlined"
        style={{ margin: 20, color: "#2575fc", borderColor: "#2575fc" }}
        onClick={() => (window.location.href = "/rooms")}
      >
        Make new room
      </Button>
    </div>
  );
};

export default MakeRoom;
