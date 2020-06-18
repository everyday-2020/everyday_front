import React, { FunctionComponent, Dispatch, SetStateAction } from "react";

import { VideoEntity } from "../types/entities";
import VideoBubbleCanvas from "./videoBubbleCanvas";
import styles from "./dateboard.module.scss";

interface DateBoardProps {
  date: Date;
  videos?: VideoEntity[];
  playVideo: (VideoEntity) => void;
}
const DateBoard: FunctionComponent<DateBoardProps> = ({
  date,
  videos = [],
  playVideo,
}) => {
  return (
    <div className={styles.dateboard}>
      <span style={{ margin: "0 auto" }}>{date.toLocaleDateString()}</span>
      <VideoBubbleCanvas videos={videos} date={date} playVideo={playVideo} />
    </div>
  );
};

export default DateBoard;
