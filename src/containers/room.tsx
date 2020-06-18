import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import groupBy from "lodash/groupBy";

import DateBoard from "../components/dateboard";
import { vids2, vids } from "../mocks/video";
import LogoBar from "../components/logobar";
import VideoSelect from "./videoSelect";
import { VideoEntity } from "../types/entities";
import VideoPlayer from "../components/videoPlayer";
import styles from "./room.module.scss";
import ShareRoom from "../components/shareRoom";
import { getVideos, patchRoom, getRooms, getVideo, postVideo } from "../api";

const Room: React.FC = () => {
  const [playingVideo, playVideo] = useState<VideoEntity>();
  const { inviteCode } = useParams();
  const [dates, setDates] = useState<{ [key: string]: VideoEntity[] }>({});
  const fetchDates = () => {
    getVideos(inviteCode).then((videos) => {
      console.log("get videos");
      setDates(
        groupBy(videos, (video) => new Date(video.created_at).toDateString())
      );
    });
  };
  useEffect(() => {
    fetchDates();
  }, []);

  const onVideoSubmit = (video: File) => {
    postVideo(inviteCode, video);
    fetchDates();
  };

  return (
    <>
      <div className={styles.content}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <LogoBar />
          {Object.keys(dates)
            .sort()
            .map((date) => {
              return (
                <DateBoard
                  key={date}
                  date={new Date(date)}
                  videos={dates[date]}
                  playVideo={(video?: VideoEntity) => {
                    if (video) {
                      getVideo(video.id);
                      fetchDates();
                    }
                    playVideo(video);
                  }}
                />
              );
            })}
          <VideoSelect onVideoSubmit={onVideoSubmit} />
        </div>
      </div>
      {playingVideo && (
        <VideoPlayer video={playingVideo} playVideo={playVideo} />
      )}
    </>
  );
};

export default Room;
