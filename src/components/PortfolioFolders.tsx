"use client";

import { useEffect, useRef, useState } from "react";
import Folder from "./Folder";

type Entry = { id: string; label: string; count: number; previews: string[] };

export default function PortfolioFolders({ entries }: { entries: Entry[] }) {
  const firstSlot = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(.4);

  useEffect(() => {
    const slot = firstSlot.current;
    if (!slot) return;
    const update = () => setSize(Math.min(1.15, Math.max(.3, (slot.clientWidth - 2) / 224)));
    const observer = new ResizeObserver(update);
    update();
    observer.observe(slot);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="folders">
      {entries.map(({ id, label, count, previews }, index) => (
        <div className="folder-slot" key={id} ref={index === 0 ? firstSlot : undefined}>
          <Folder
            href={`/portfolio/#${id}`}
            label={label}
            itemCount={count}
            items={previews.length ? previews.map((image) => ({ image })) : [{ title: "Curriculum Vitae" }]}
            variant="glass"
            color="#272d38"
            layout="stack"
            openOn="hover"
            draggable={false}
            zoomOnClick={false}
            size={size}
          />
        </div>
      ))}
    </div>
  );
}
