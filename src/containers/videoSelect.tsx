import React, { ChangeEvent, FC, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import VideoThumbnail from "react-video-thumbnail";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";

interface VideoSelectProps {
  onVideoSubmit: (video: File) => void;
}

const VideoSelect: FC<VideoSelectProps> = ({ onVideoSubmit }) => {
  const [videoURL, setVideoUrl] = useState("");
  const [video, setVideo] = useState<File>();
  const [open, setOpen] = useState(false);

  const onVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setVideoUrl(URL.createObjectURL(e.target.files[0]));
      setVideo(e.target.files[0]);
    }
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
            maxHeight: "320px",
          }}
        >
          <VideoThumbnail videoUrl={videoURL} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (video) {
                onVideoSubmit(video);
              }
              setOpen(false);
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
};

export default VideoSelect;
