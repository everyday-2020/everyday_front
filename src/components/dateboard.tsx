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
import logo from "../logo.svg";

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
          return radius(clicks);
        })
      );
    const tick = () => {
      const u = select(svgRef.current)
        .selectAll<SVGCircleElement, unknown>("circle")
        .data<VideoEntity & SimulationNodeDatum>(videos);
      u.enter()
        .append("circle")
        .attr("r", ({ clicks }) => radius(clicks))
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr("fill", "transparent")
        .merge(u)
        .attr("cx", (d) => {
          const r = radius(d.clicks);
          return (d.x = Math.max(r, Math.min(d.x || 0, width - r)));
        })
        .attr("cy", (d) => {
          const r = radius(d.clicks);
          return (d.y = Math.max(r, Math.min(d.y || 0, height - r)));
        })
        .attr("fill", (d) => {
          return "url(#image)";
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
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="image"
            patternContentUnits="objectBoundingBox"
            height="100%"
            width="100%"
          >
            <image height="1" width="1" xlinkHref={logo}></image>
          </pattern>
        </defs>
      </svg>
    </div>
  );
};

export default DateBoard;

const radius = (clicks: number) => {
  return 16 * Math.log((clicks + 1) * Math.exp(1));
};
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
