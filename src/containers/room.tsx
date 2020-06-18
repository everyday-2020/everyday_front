import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import groupBy from "lodash/groupBy";

import DateBoard from "../components/dateboard";
import LogoBar from "../components/logobar";
import ShareRoom from "../components/shareRoom";
import VideoSelect from "./videoSelect";
import { VideoEntity } from "../types/entities";
import VideoPlayer from "../components/videoPlayer";
import styles from "./room.module.scss";
import { getVideo, postVideo, useGetVideos, patchRoom } from "../api";

const Room: React.FC = () => {
  const [playingVideo, playVideo] = useState<VideoEntity>();
  const { inviteCode } = useParams();
  const [{ data: videos, error }, refetchVideos] = useGetVideos(inviteCode);
  if (error?.response?.status === 403) {
    if (window.confirm("Do you want to join in this room?")) {
      patchRoom(inviteCode).then(() => {
        refetchVideos();
      });
    }
  }
  const dates = groupBy(videos, (video) =>
    new Date(video.created_at).toDateString()
  );

  const onVideoSubmit = (video: File) => {
    postVideo(inviteCode, video).then(() => {
      refetchVideos();
    });
  };

  return (
    <>
      <div className={styles.content}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <LogoBar />
          <ShareRoom />
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
                      getVideo(video.id).then(() => {
                        refetchVideos();
                      });
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
