import React, { useState } from "react";
import {
  BottomNavigationAction,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import VideoThumbnail from "react-video-thumbnail";
import { useHistory } from "react-router-dom";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

export default function VideoSelect() {
  const [videoURL, setVideo] = useState("");
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const onVideoChange = (e: any) => {
    e.preventDefault();
    setVideo(URL.createObjectURL(e.target.files[0]));
    setOpen(true);
  };

  return (
    <>
      <input
        type="file"
        id="upload_file"
        multiple
        onChange={onVideoChange}
        style={{ display: "none" }}
      />
      <label
        htmlFor="upload_file"
        style={{
          marginTop: "auto",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "30px",
        }}
      >
        <AddBoxOutlinedIcon
          style={{
            backgroundColor: "gray",
            width: "100px",
            borderRadius: "1.5rem",
            padding: "10px",
          }}
        />
      </label>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        maxWidth={"xs"}
      >
        <DialogTitle>{"이 비디오를 업로드 할까요?"}</DialogTitle>
        <DialogContent
          style={{
            overflow: "hidden",
            padding: 0,
            alignSelf: "center",
          }}
        >
          <VideoThumbnail
            videoUrl={videoURL}
            maxWidth="100%"
            maxHeight="100%"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              history.push("/room");
            }}
            style={{
              backgroundColor: "#2575fc",
              color: "#ffffff",
            }}
            autoFocus
          >
            네
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant="outlined"
            style={{
              borderColor: "#2575fc",
              color: "#2575fc",
            }}
          >
            아니오
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
