import React, { FC, useRef, useEffect } from "react";
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

interface VideoBubbleCanvasProps {
  date: Date;
  videos: VideoEntity[];
}

type Datum = SimulationNodeDatum & VideoEntity;

const FONT_SIZE = 16;
const VIDEO_CLOSEUP = 2;

const VideoBubbleCanvas: FC<VideoBubbleCanvasProps> = ({ videos, date }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const { width: rootWidth = 0, height: rootHeight = 0 } =
      svgRef.current?.getBoundingClientRect() || {};

    const radius = (clicks: number) => {
      return 16 * (Math.log(clicks + 1) + 1);
    };
    const radiuses = videos.map(({ clicks }) => radius(clicks));

    let simulation = forceSimulation<Datum>(videos)
      .alphaMin(0.1)
      .force("charge", forceManyBody().strength(-2))
      .force("center", forceCenter(rootWidth / 2, rootHeight / 2))
      .force(
        "collision",
        forceCollide<Datum>().radius((d, i) => radiuses[i] + FONT_SIZE)
      );
    // const masks = select(svgRef.current)
    //   .selectAll("mask")
    //   .data(videos as Datum[])
    //   .join("mask")
    //   .attr("id", ({ id }) => `mask-${date.getDate()}-${id}`);
    // masks
    //   .append("rect")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("width", rootWidth)
    //   .attr("height", rootHeight)
    //   .attr("fill", "green");
    // masks
    //   .append("circle")
    //   .attr("r", (d, i) => radiuses[i])
    //   .attr("fill", "white")
    // .attr("stroke", "green");
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
      .text(({ user }: VideoEntity) => user.nickname)
      .attr("text-anchor", "middle");

    const rims = groups
      .append("circle")
      .attr("stroke-width", "5px")
      .attr("stroke", "orange")
      .attr("fill", "transparent")
      .attr("r", (d, i) => radiuses[i]);

    const thumbnails = groups
      .append("foreignObject")
      .attr("fill", "black")
      .attr("width", (d, i) => 2 * radiuses[i] * VIDEO_CLOSEUP)
      .attr("height", (d, i) => 2 * radiuses[i] * VIDEO_CLOSEUP)
      .attr("mask", ({ id }) => `url(#mask-${date.getDate()}-${id})`);

    thumbnails
      .append("xhtml:video")
      .attr("class", "bubble-thumbnail")
      .attr("autoplay", false)
      .attr("muted", true)
      .attr("loop", true)
      .attr("style", ({ id }) => `mask: url(#mask-${date.getDate()}-${id})`)
      .append("xhtml:source")
      .attr("src", ({ location }) => location);

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
        })
        .attr("clip-path", ({ x = 0, y = 0 }, i) => {
          const r = radiuses[i];
          return `circle(${r}px at ${2 * r * VIDEO_CLOSEUP - x}px ${
            2 * r * VIDEO_CLOSEUP - y
          }px )`;
        });
      rims.attr("cx", ({ x = 0 }) => x).attr("cy", ({ y = 0 }) => y);
      // masks
      //   .select("circle")
      //   .attr("cx", ({ x = 0 }, i) => {
      //     const r = radiuses[i];
      //     return x;
      //   })
      //   .attr("cy", ({ y = 0 }, i) => {
      //     const r = radiuses[i];
      //     return y;
      //   });
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
        backgroundColor: "#f0f0f0",
        minHeight: `${videos.length * 64}px`,
        fontSize: `${FONT_SIZE}`,
      }}
      xmlns="http://www.w3.org/2000/svg"
    ></svg>
  );
};

export default VideoBubbleCanvas;
