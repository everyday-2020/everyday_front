import React, { FC, Dispatch, SetStateAction } from "react";

import { VideoEntity } from "../types/entities";
import { baseURL } from "../api";

interface VideoPlayerProps {
  video: VideoEntity;
  playVideo: Dispatch<SetStateAction<VideoEntity | undefined>>;
}
const VideoPlayer: FC<VideoPlayerProps> = ({ video, playVideo }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#000000cc",
      }}
      onClick={() => playVideo(undefined)}
    >
      <video controls style={{ width: "100vw" }}>
        <source src={baseURL + video.clip.url} />
      </video>
    </div>
  );
};

export default VideoPlayer;
