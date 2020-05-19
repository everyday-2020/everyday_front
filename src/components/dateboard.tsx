import React, { useRef, useEffect, FunctionComponent } from "react";
import { select } from "d3-selection";
import {
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceCollide,
  SimulationNodeDatum,
} from "d3-force";

import { VideoEntity } from "../types/entities";

interface DateBoardProps {
  date: Date;
  videos?: VideoEntity[];
}
const DateBoard: FunctionComponent<DateBoardProps> = ({
  date,
  videos = vids,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const { width = 0, height = 0 } =
      svgRef.current?.getBoundingClientRect() || {};
    forceSimulation<VideoEntity & SimulationNodeDatum>(videos)
      .force("charge", forceManyBody().strength(-2))
      .force("center", forceCenter(width / 2, height / 2))
      .force(
        "collision",
        forceCollide<any>().radius(function ({ clicks }) {
          return clicks * 16 || 0;
        })
      );
    const tick = () => {
      const u = select(svgRef.current)
        .selectAll<SVGCircleElement, unknown>("circle")
        .data<VideoEntity & SimulationNodeDatum>(videos);
      u.enter()
        .append("circle")
        .attr("r", ({ clicks }) => clicks * 16)
        .merge(u)
        .attr("cx", (d) => {
          const r = d.clicks * 16;
          return (d.x = Math.max(r, Math.min(d.x || 0, width - r)));
        })
        .attr("cy", (d) => {
          const r = d.clicks * 16;
          return (d.y = Math.max(r, Math.min(d.y || 0, height - r)));
        });
      u.exit().remove();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);
  return (
    <div
      style={{
        minHeight: "100px",
        display: "flex",
        flexDirection: "column",
        padding: "10px 0",
      }}
    >
      <span style={{ margin: "0 auto" }}>{date.toLocaleDateString()}</span>
      <svg
        ref={svgRef}
        style={{
          flex: 1,
          backgroundColor: "#f0f00f",
          minHeight: `${videos.length * 96}px`,
        }}
      />
    </div>
  );
};

export default DateBoard;

const vids: VideoEntity[] = [
  {
    id: 1,
    createdAt: new Date(2020, 3, 14),
    modifiedAt: new Date(2020, 3, 14),
    clicks: 1,
    length: 300,
    user: {
      id: 1,
      createdAt: new Date(2020, 3, 14),
      modifiedAt: new Date(2020, 3, 14),
      nickname: "abc",
      username: "test",
      profilePic: "dog",
    },
    location: "localhost",
  },
  {
    id: 2,
    createdAt: new Date(2020, 3, 14),
    modifiedAt: new Date(2020, 3, 14),
    clicks: 2,
    length: 300,
    user: {
      id: 2,
      createdAt: new Date(2020, 3, 14),
      modifiedAt: new Date(2020, 3, 14),
      nickname: "abc",
      username: "test",
      profilePic: "dog",
    },
    location: "localhost",
  },
  {
    id: 3,
    createdAt: new Date(2020, 3, 14),
    modifiedAt: new Date(2020, 3, 14),
    clicks: 3,
    length: 300,
    user: {
      id: 6,
      createdAt: new Date(2020, 3, 14),
      modifiedAt: new Date(2020, 3, 14),
      nickname: "abc",
      username: "test",
      profilePic: "dog",
    },
    location: "localhost",
  },
];
