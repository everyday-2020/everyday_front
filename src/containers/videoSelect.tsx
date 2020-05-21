import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import VideoThumbnail from "react-video-thumbnail";

/*
interface videoState {
  videoURL: string,
  thumbnailURL: string,
}
*/

export default function VideoSelect() {
  const [videoURL, setVideo] = useState("");
  //const [thumbnailURL, setThumbnail] = useState("");
  //video thumbnail
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
            <DialogTitle id="alert-dialog-title">
              {"이 비디오를 업로드 할까요?"}
            </DialogTitle>
            <DialogContent
              style={{
                width: 250,
                height: 250,
              }}
            >
              <VideoThumbnail videoUrl={videoURL} width={250} height={250} />
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

      {openDialog(videoURL)}
    </div>
  );
}
/*
<div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Upload
        </Button>
      </div>
*/
