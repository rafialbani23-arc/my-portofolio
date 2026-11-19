"use client";

import Image from "next/image";
import type { PointerEvent } from "react";

export default function ProfilePortrait() {
  function positionSpotlight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;

    const portrait = event.currentTarget;
    const bounds = portrait.getBoundingClientRect();
    portrait.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    portrait.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
  }

  return (
    <div
      className="profile-photo reveal"
      tabIndex={0}
      onPointerEnter={positionSpotlight}
      onPointerMove={positionSpotlight}
    >
      <Image
        src="/images/profile-rafi-transparent.webp"
        alt="Rafi Albani Syafarel"
        fill
        sizes="(max-width: 780px) 46vw, 335px"
      />
      <span className="profile-effect" aria-hidden="true" />
      <span className="profile-pointer" aria-hidden="true" />
    </div>
  );
}
