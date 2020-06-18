import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import groupBy from "lodash/groupBy";

import DateBoard from "../components/dateboard";
import TitleBar from "../components/titlebar";
import VideoSelect from "./videoSelect";
import { VideoEntity } from "../types/entities";
import VideoPlayer from "../components/videoPlayer";
import styles from "./room.module.scss";
import {
  getVideo,
  postVideo,
  useGetVideos,
  patchRoom,
  useGetRoom,
} from "../api";

const Room: React.FC = () => {
  const [playingVideo, playVideo] = useState<VideoEntity>();
  const { inviteCode } = useParams();
  const history = useHistory();
  const [{ data: videos, error }, refetchVideos] = useGetVideos(inviteCode);
  const [
    { data: roomInfo, error: roomError, loading },
    refetchRoom,
  ] = useGetRoom(inviteCode);
  useEffect(() => {
    if (roomError?.response?.status === 403) {
      const roomTitle = roomError?.response?.data?.title;
      if (window.confirm(`${roomTitle} 방에 정말 참여하시겠습니까?`)) {
        patchRoom(inviteCode).then(() => {
          refetchVideos();
          refetchRoom();
        });
      } else {
        history.push("/rooms");
      }
    }
  }, [loading]);
  const dates = groupBy(videos, (video) =>
    new Date(video.created_at).toISOString().substr(0, 10)
  );

  const onVideoSubmit = (video: File) => {
    postVideo(inviteCode, video).then(() => {
      refetchVideos();
    });
  };

  return (
    <>
      <div className={styles.content}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TitleBar title={roomInfo?.title} />
          {Object.keys(dates)
            .sort()
            .reverse()
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
        </div>
        {playingVideo && (
          <VideoPlayer video={playingVideo} playVideo={playVideo} />
        )}
      </div>
      <VideoSelect onVideoSubmit={onVideoSubmit} />
    </>
  );
};

export default Room;
