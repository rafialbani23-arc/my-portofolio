"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import "./DriftWall.css";

type Tile = { image: string; title: string };
const tileRatio = 132 / 200;
const gap = 18;

export default function DriftWall({ items }: { items: Tile[] }) {
  const wall = useRef<HTMLDivElement>(null);
  const [{ width, height }, setSize] = useState({ width: 1024, height: 640 });
  const [visible, setVisible] = useState(false);
  const columnCount = Math.min(items.length, width < 540 ? 3 : width < 900 ? 4 : 5);
  const tileWidth = Math.min(200, Math.max(88, width / (columnCount + .35)));
  const tileHeight = Math.round(tileWidth * tileRatio);
  const columns: Tile[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, index) => columns[index % columnCount].push(item));

  useEffect(() => {
    const element = wall.current;
    if (!element) return;
    const resize = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width && height) setSize({ width: Math.round(width), height: Math.round(height) });
    });
    const intersection = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    resize.observe(element);
    intersection.observe(element);
    return () => {
      resize.disconnect();
      intersection.disconnect();
    };
  }, []);

  function steer(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    element.style.setProperty("--dw-turn-x", `${((event.clientX - rect.left) / rect.width - .5) * 4.8}deg`);
    element.style.setProperty("--dw-turn-y", `${(.5 - (event.clientY - rect.top) / rect.height) * 4.8}deg`);
  }

  function resetSteer(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.removeProperty("--dw-turn-x");
    event.currentTarget.style.removeProperty("--dw-turn-y");
  }

  return (
    <div className="drift-wall" ref={wall} data-running={visible} onPointerMove={steer} onPointerLeave={resetSteer}
      style={{ "--dw-tile-width": `${tileWidth}px`, "--dw-tile-height": `${tileHeight}px`, "--dw-gap": `${gap}px` } as CSSProperties}>
      <div className="drift-wall__plane">
        {columns.map((tiles, column) => {
          const sequenceHeight = tiles.length * (tileHeight + gap);
          const repeats = Math.max(1, Math.ceil((height * 1.28) / sequenceHeight));
          const variance = ((column * .618 + .35) % 1) * 2 - 1;
          const seconds = (repeats * sequenceHeight) / (42 * (1 + .45 * variance));
          return (
            <div className="drift-wall__col" key={tiles[0].title}>
              <div className="drift-wall__track" style={{
                "--dw-duration": `${seconds}s`,
                "--dw-delay": `${-seconds * ((column * .37) % 1)}s`,
              } as CSSProperties}>
                {[0, 1].map((loop) => (
                  <div className="drift-wall__loop" key={loop}>
                    {Array.from({ length: repeats }, (_, repeat) => tiles.map(({ image, title }) => (
                      <div className="drift-wall__tile" key={`${repeat}-${title}`} data-project={title} data-repeat={repeat > 0}>
                        <span className="drift-wall__inner">
                          <Image src={image} alt="" fill sizes="200px" draggable={false} />
                        </span>
                      </div>
                    )))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
