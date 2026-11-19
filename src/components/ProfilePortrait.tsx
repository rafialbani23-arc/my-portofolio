"use client";

import Image from "next/image";
import type { PointerEvent } from "react";

export default function ProfilePortrait() {
  function positionSpotlight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;

    const portrait = event.currentTarget;
    const bounds = portrait.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const onHead = x >= .28 && x <= .72 && y >= 0 && y <= .43;
    portrait.dataset.headActive = String(onHead);
    portrait.style.setProperty("--spot-x", `${x * 100}%`);
    portrait.style.setProperty("--spot-y", `${y * 100}%`);
  }

  return (
    <div
      className="profile-photo reveal"
      tabIndex={0}
      onPointerEnter={positionSpotlight}
      onPointerMove={positionSpotlight}
      onPointerLeave={(event) => delete event.currentTarget.dataset.headActive}
    >
      <Image
        src="/images/profile-rafi-transparent.webp"
        alt="Rafi Albani Syafarel"
        fill
        sizes="(max-width: 780px) 46vw, 335px"
      />
      <span className="profile-effect" aria-hidden="true" />
      <span className="profile-hood" aria-hidden="true" />
      <span className="profile-pointer" aria-hidden="true" />
    </div>
  );
}
