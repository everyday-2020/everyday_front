import React, { FunctionComponent, Dispatch, SetStateAction } from "react";

import { VideoEntity } from "../types/entities";
import VideoBubbleCanvas from "./videoBubbleCanvas";

interface DateBoardProps {
  date: Date;
  videos?: VideoEntity[];
  playVideo: Dispatch<SetStateAction<VideoEntity | undefined>>;
}
const DateBoard: FunctionComponent<DateBoardProps> = ({
  date,
  videos = [],
  playVideo,
}) => {
  return (
    <div
      style={{
        minHeight: "100px",
        display: "flex",
        flexDirection: "column",
        paddingTop: "10px",
        backgroundColor: "#ffffff",
        color: "#98979c",
        borderTop: "1px solid #6f6e75",
      }}
    >
      <span style={{ margin: "0 auto" }}>{date.toLocaleDateString()}</span>
      <VideoBubbleCanvas videos={videos} date={date} playVideo={playVideo} />
    </div>
  );
};

export default DateBoard;
