import React, { useState, useEffect } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import { useParams } from "react-router-dom";
import groupBy from "lodash/groupBy";

import DateBoard from "../components/dateboard";
import { vids2, vids } from "../mocks/video";
import LogoBar from "../components/logobar";
import VideoSelect from "./videoSelect";
import { VideoEntity } from "../types/entities";
import VideoPlayer from "../components/videoPlayer";
import styles from "./room.module.scss";
import { getVideos } from "../api";

const Room: React.FC = () => {
  const [playingVideo, playVideo] = useState<VideoEntity>();
  const { inviteCode } = useParams();
  const [dates, setDates] = useState<{ [key: string]: VideoEntity[] }>({});

  useEffect(() => {
    getVideos(inviteCode).then((videos) => {
      setDates(
        groupBy(videos, (video) => new Date(video.created_at).toDateString())
      );
    });
  }, []);
  return (
    <>
      <div className={styles.content}>
        <LogoBar />
        {Object.keys(dates)
          .sort()
          .map((date) => {
            return (
              <DateBoard
                date={new Date(date)}
                videos={dates[date]}
                playVideo={playVideo}
              />
            );
          })}
        <VideoSelect />
      </div>
      {playingVideo && (
        <VideoPlayer video={playingVideo} playVideo={playVideo} />
      )}
    </>
  );
};

export default Room;
