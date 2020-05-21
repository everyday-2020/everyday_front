import React, { useState } from "react";
import {
  BottomNavigationAction,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import VideoThumbnail from "react-video-thumbnail";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

export default function VideoSelect() {
  const [videoURL, setVideo] = useState("");
  const onVideoChange = (e: any) => {
    e.preventDefault();
    setVideo(URL.createObjectURL(e.target.files[0]));
    handleClickOpen();
  };
  //dialog
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //업로드 확인 dialog ()
  const openDialog = (videoURL) => {
    if (videoURL !== "") {
      return (
        <div>
          <Dialog open={open} onClose={handleClose} maxWidth={"xs"}>
            <DialogTitle
              id="alert-dialog-title"
              style={{ textAlign: "center" }}
            >
              {"이 비디오를 업로드 할까요?"}
            </DialogTitle>
            <DialogContent
              style={{
                width: 250,
                height: 250,
                overflow: "hidden",
              }}
            >
              <VideoThumbnail videoUrl={videoURL} width={250} height={250} />
            </DialogContent>
            <DialogActions style={{ justifyContent: "center" }}>
              <Button
                onClick={() => (window.location.href = "/room")}
                variant="outlined"
                style={{
                  backgroundColor: "#2575fc",
                  color: "#ffffff",
                }}
                autoFocus
              >
                네
              </Button>
              <Button
                onClick={handleClose}
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
        </div>
      );
    } else {
      return (
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">
              {"비디오를 선택해주세요."}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                닫기
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  };
  return (
    <div>
      <div>
        <input
          type="file"
          id="upload_file"
          multiple
          onChange={onVideoChange}
          style={{ display: "none" }}
        />
      </div>
      <label htmlFor="upload_file">
        <BottomNavigationAction
          component="span"
          label="Upload"
          showLabel
          icon={<AddBoxOutlinedIcon />}
        />
      </label>
      {openDialog(videoURL)}
    </div>
  );
}
