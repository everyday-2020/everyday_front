import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import VideoThumbnail from "react-video-thumbnail";

interface videoState {
  //file: "",
  imgURL: null;
}

export const VideoSelect: React.FC = () => {
  //const [video, setVideo] = useState("");
  const [imgURL, setImage] = useState("");
  //dialog
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //video thumbnail
  const onVideoChange = (e: any) => {
    e.preventDefault();
    //setVideo(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
    //sessionStorage.setItem('thumbnail', imgURL);
  };

  return (
    <div
      style={{
        marginTop: 20,
        marginLeft: 20,
        alignItems: "center",
      }}
    >
      <div>
        <input type="file" onChange={onVideoChange} />
      </div>
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Upload
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          style={{
            maxHeight: "60vh",
          }}
        >
          <DialogTitle id="alert-dialog-title">
            {"이 비디오를 업로드 할까요?"}
          </DialogTitle>
          <DialogContent>
            <VideoThumbnail videoUrl={imgURL} width={250} height={250} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              아니오
            </Button>
            <Button
              onClick={() => (window.location.href = "/rooms")}
              color="primary"
              autoFocus
            >
              네
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
