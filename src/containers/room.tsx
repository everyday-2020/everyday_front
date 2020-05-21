import React, { useState } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";

import DateBoard from "../components/dateboard";
import { vids2, vids } from "../mocks/video";
import LogoBar from "../components/logobar";
import VideoSelect from "./videoSelect";
import { VideoEntity } from "../types/entities";
import VideoPlayer from "../components/videoPlayer";

const Room: React.FC = () => {
  const [playingVideo, playVideo] = useState<VideoEntity>();
  return (
    <>
      <div
        className="content"
        style={{ height: "calc(100vh - 56px)", overflow: "scroll" }}
      >
        <LogoBar />
        <DateBoard
          date={new Date(2020, 4, 22)}
          videos={vids}
          playVideo={playVideo}
        />
        <DateBoard
          date={new Date(2020, 4, 21)}
          videos={vids2}
          playVideo={playVideo}
        />
      </div>
      <BottomNavigation
        style={{ position: "sticky", bottom: 0, backgroundColor: "#f0f0f0" }}
        showLabels
      >
        <VideoSelect />
      </BottomNavigation>
      {playingVideo && (
        <VideoPlayer video={playingVideo} playVideo={playVideo} />
      )}
    </>
  );
};

export default Room;
