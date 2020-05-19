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
  videos = [],
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
        forceCollide<VideoEntity & SimulationNodeDatum>().radius(({ clicks }) =>
          radius(clicks)
        )
      );
    const groups = select(svgRef.current)
      .selectAll<SVGGElement, unknown>("g")
      .data<VideoEntity & SimulationNodeDatum>(videos)
      .join("g");
    console.log(groups);

    const circles = groups
      .append("circle")
      .attr("r", ({ clicks }) => radius(clicks))
      .attr("stroke", "black")
      .attr("stroke-width", 3)
      .attr("fill", "transparent")
      .attr("fill", (d) => {
        return "url(#image)";
      })
      .on("click", (d, i) => {});
    const captions = groups
      .append("text")
      .text(({ user }: VideoEntity) => user.nickname)
      .attr("text-anchor", "middle");
    const tick = () => {
      circles
        .attr("cx", (d) => {
          const r = radius(d.clicks);
          return (d.x = Math.max(r, Math.min(d.x || 0, width - r)));
        })
        .attr("cy", (d) => {
          const r = radius(d.clicks);
          return (d.y = Math.max(r, Math.min(d.y || 0, height - r)));
        });
      captions
        .attr("x", ({ x }) => x || 0)
        .attr("y", ({ clicks, y }) => 15 + radius(clicks) + (y || 0));
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
        paddingTop: "10px",
      }}
    >
      <span style={{ margin: "0 auto" }}>{date.toLocaleDateString()}</span>
      <svg
        ref={svgRef}
        style={{
          flex: 1,
          backgroundColor: "#f0f0df",
          minHeight: `${videos.length * 64}px`,
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
