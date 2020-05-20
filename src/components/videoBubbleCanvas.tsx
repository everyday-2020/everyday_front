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

    const thumbnails = groups
      .append("foreignObject")
      .attr("fill", "black")
      .attr("width", (d, i) => 2 * radiuses[i])
      .attr("height", (d, i) => 2 * radiuses[i]);

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
        .attr("y", ({ y }, i) => 15 + radiuses[i] + (y || 0));
      thumbnails
        .attr("x", (d, i) => {
          const r = radiuses[i];
          d.x = Math.max(r, Math.min(d.x || 0, rootWidth - r));
          return (d.x || 0) - r;
        })
        .attr("y", (d, i) => {
          const r = radiuses[i];
          d.y = Math.max(r, Math.min(d.y || 0, rootHeight - r));
          return (d.y || 0) - r;
        })
        .attr("clip-path", ({ clicks, x = 0, y = 0 }, i) => {
          const r = radiuses[i];
          return `circle(${r}px at ${-x + 2 * r}px ${-y + 2 * r}px )`;
        });
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
