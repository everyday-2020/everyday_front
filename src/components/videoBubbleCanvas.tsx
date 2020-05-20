import React, { FC, useRef, useEffect } from "react";
import { select } from "d3-selection";
import {
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceCollide,
  SimulationNodeDatum,
} from "d3-force";

import { VideoEntity } from "../types/entities";
import "./videoBubbleCanvas.css";

interface VideoBubbleCanvasProps {
  date: Date;
  videos: VideoEntity[];
}

const VideoBubbleCanvas: FC<VideoBubbleCanvasProps> = ({ videos, date }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const { width = 0, height = 0 } =
      svgRef.current?.getBoundingClientRect() || {};
    const simulation = forceSimulation<VideoEntity & SimulationNodeDatum>(
      videos
    )
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

    const captions = groups
      .append("text")
      .text(({ user }: VideoEntity) => user.nickname)
      .attr("text-anchor", "middle");

    const thumbnails = groups
      .append("foreignObject")
      .attr("fill", "black")
      .attr("width", ({ clicks }) => 2 * radius(clicks))
      .attr("height", ({ clicks }) => 2 * radius(clicks));

    thumbnails
      .append("xhtml:video")
      .attr("class", "bubble-thumbnail")
      .attr("autoplay", false)
      .attr("muted", true)
      .attr("loop", true)
      .append("xhtml:source")
      .attr("src", ({ location }) => location);

    const tick = () => {
      captions
        .attr("x", ({ x }) => x || 0)
        .attr("y", ({ clicks, y }) => 15 + radius(clicks) + (y || 0));
      thumbnails
        .attr("x", (d) => {
          const r = radius(d.clicks);
          d.x = Math.max(r, Math.min(d.x || 0, width - r));
          return (d.x || 0) - r;
        })
        .attr("y", (d) => {
          const r = radius(d.clicks);
          d.y = Math.max(r, Math.min(d.y || 0, height - r));
          return (d.y || 0) - r;
        })
        .attr("clip-path", ({ clicks, x = 0, y = 0 }) => {
          const r = radius(clicks);
          return `circle(${r}px at ${-x + 2 * r}px ${-y + 2 * r}px )`;
        });
      // requestAnimationFrame(tick);
    };
    simulation.on("tick", tick);

    // requestAnimationFrame(tick);
  }, []);
  return (
    <svg
      ref={svgRef}
      style={{
        flex: 1,
        backgroundColor: "#f0f0f0",
        minHeight: `${videos.length * 64}px`,
      }}
      xmlns="http://www.w3.org/2000/svg"
    ></svg>
  );
};

export default VideoBubbleCanvas;

const radius = (clicks: number) => {
  return 16 * Math.log((clicks + 1) * Math.exp(1));
};
