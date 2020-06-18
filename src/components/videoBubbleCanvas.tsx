import React, { FC, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { select, event } from "d3-selection";
import {
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceCollide,
  SimulationNodeDatum,
} from "d3-force";
import { drag } from "d3-drag";

import { VideoEntity } from "../types/entities";
import "./videoBubbleCanvas.css";
import { baseURL } from "../api";

interface VideoBubbleCanvasProps {
  date: Date;
  videos: VideoEntity[];
  playVideo: Dispatch<SetStateAction<VideoEntity | undefined>>;
}

type Datum = SimulationNodeDatum & VideoEntity;

const FONT_SIZE = 16;
const VIDEO_CLOSEUP = 2;

const VideoBubbleCanvas: FC<VideoBubbleCanvasProps> = ({
  videos,
  date,
  playVideo,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const radius = (clicks: number) => {
    return 16 * (Math.log(clicks + 1) + 1);
  };
  const radiuses = videos.map(({ clicks }) => radius(clicks));
  useEffect(() => {
    const { width: rootWidth = 0, height: rootHeight = 0 } =
      svgRef.current?.getBoundingClientRect() || {};

    let simulation = forceSimulation<Datum>(videos)
      .alphaMin(0.1)
      .force("charge", forceManyBody().strength(-2))
      .force("center", forceCenter(rootWidth / 2, rootHeight / 2))
      .force(
        "collision",
        forceCollide<Datum>().radius((d, i) => radiuses[i] + FONT_SIZE)
      );
    const masks = select(svgRef.current)
      .selectAll("mask")
      .data(videos as Datum[])
      .join("mask")
      .attr("id", ({ id }) => `mask-${date.getDate()}-${id}`);
    masks
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", rootWidth)
      .attr("height", rootHeight)
      .attr("fill", "black");
    masks
      .append("circle")
      .attr("r", (d, i) => radiuses[i])
      .attr("fill", "white")
      .attr("stroke", "green");
    const groups = select(svgRef.current)
      .selectAll<SVGGElement, Datum>("g")
      .data(videos as Datum[])
      .join("g")
      .call(
        drag<SVGGElement, Datum>().on("drag", (d) => {
          simulation.alpha(0.5).restart();
          d.x = event.x;
          d.y = event.y;
        })
      );
    const captions = groups
      .append("text")
      .text(({ user_nickname }: VideoEntity) => user_nickname || "")
      .attr("text-anchor", "middle")
      .attr("fill", "#ffffff");

    const rims = groups
      .append("circle")
      .attr("stroke-width", "4px")
      .attr("stroke", "url(#gradient)")
      .attr("fill", (d) => `transparent`)
      .attr("r", (d, i) => radiuses[i] + 1);

    const thumbnails = groups
      .append("image")
      .attr("width", (d, i) => 2 * radiuses[i] * VIDEO_CLOSEUP)
      .attr("height", (d, i) => 2 * radiuses[i] * VIDEO_CLOSEUP)
      .attr("xlink:href", (d) => `${baseURL}${d.clip.thumb.url}`)
      .on("click", (d) => {
        playVideo(d);
      })
      .attr("style", ({ id }) => `mask: url(#mask-${date.getDate()}-${id})`);

    const tick = () => {
      thumbnails
        .attr("x", (d, i) => {
          const r = radiuses[i];
          const svg_padding = r + FONT_SIZE;
          d.x = Math.max(
            svg_padding,
            Math.min(d.x || 0, rootWidth - svg_padding)
          );
          return (d.x || 0) - r * VIDEO_CLOSEUP;
        })
        .attr("y", (d, i) => {
          const r = radiuses[i];
          const svg_padding = r + FONT_SIZE;
          d.y = Math.max(
            svg_padding,
            Math.min(d.y || 0, rootHeight - svg_padding)
          );
          return (d.y || 0) - r * VIDEO_CLOSEUP;
        });
      rims.attr("cx", ({ x = 0 }) => x).attr("cy", ({ y = 0 }) => y);
      masks
        .select("circle")
        .attr("cx", ({ x = 0 }, i) => {
          return x;
        })
        .attr("cy", ({ y = 0 }, i) => {
          return y;
        });
      captions
        .attr("x", ({ x = 0 }) => x)
        .attr("y", ({ y = 0 }, i) => radiuses[i] + y + FONT_SIZE);
    };
    simulation.on("tick", tick);
  }, []);
  return (
    <svg
      ref={svgRef}
      style={{
        flex: 1,
        minHeight: `${videos.length * 64}px`,
        fontSize: `${FONT_SIZE}`,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2575fc" />
          <stop offset="100%" stopColor="#2575fc" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default VideoBubbleCanvas;
