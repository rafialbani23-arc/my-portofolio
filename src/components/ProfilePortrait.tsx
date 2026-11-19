"use client";

import Image from "next/image";
import { useId, type PointerEvent } from "react";

const portraitSource = "/images/profile-rafi-transparent.webp";

export default function ProfilePortrait() {
  const logoId = useId();

  function positionSpotlight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;

    const portrait = event.currentTarget;
    const bounds = portrait.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    portrait.style.setProperty("--spot-x", `${x * 100}%`);
    portrait.style.setProperty("--spot-y", `${y * 100}%`);
  }

  return (
    <div
      className="profile-photo reveal"
      tabIndex={0}
      onPointerEnter={positionSpotlight}
      onPointerMove={positionSpotlight}
    >
      <span className="profile-base">
        <Image src={portraitSource} alt="Rafi Albani Syafarel" fill sizes="(max-width: 780px) 46vw, 335px" />
        <svg className="profile-badge" viewBox="0 0 1000 1307" aria-hidden="true">
          <defs>
            <filter id={`${logoId}-color`} colorInterpolationFilters="sRGB">
              <feColorMatrix type="matrix" values=".05 .1 .04 0 .3  .05 .13 .06 0 .45  .04 .1 .1 0 .53  0 3.8 3.7 0 -1.3" />
            </filter>
            <clipPath id={`${logoId}-bounds`}>
              <rect x="690" y="960" width="114" height="135" />
            </clipPath>
          </defs>
          <image href={portraitSource} width="1000" height="1307"
            filter={`url(#${logoId}-color)`} clipPath={`url(#${logoId}-bounds)`} />
        </svg>
      </span>
      <span className="profile-effect" aria-hidden="true" />
      <span className="profile-pointer" aria-hidden="true" />
    </div>
  );
}
