import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

import Asset1 from "../icons/scatter/Asset 1.svg";
import Asset2 from "../icons/scatter/Asset 2.svg";
import Asset3 from "../icons/scatter/Asset 3.svg";
import Asset4 from "../icons/scatter/Asset 4.svg";
import Asset5 from "../icons/scatter/Asset 5.svg";
import Asset6 from "../icons/scatter/Asset 6.svg";
import Asset7 from "../icons/scatter/Asset 7.svg";
import Asset8 from "../icons/scatter/Asset 8.svg";
import Asset9 from "../icons/scatter/Asset 9.svg";

const assets = [
  Asset1,
  Asset2,
  Asset3,
  Asset4,
  Asset5,
  Asset6,
  Asset7,
  Asset8,
  Asset9,
];

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function AnimatedBackground({ darkMode }) {
  const iconsCount = 40;

  const icons = useMemo(() => {
    // returns an array of randomly picked assets with random horizontal positions, random durations, and random rotations

    return Array.from({ length: iconsCount }).map((_, index) => {
      const asset = assets[getRandomInt(0, assets.length - 1)];
      const left = getRandomInt(0, 100);
      // Starting vertical position off-screen (e.g., between 110% and 130%)
      const startTop = getRandomInt(110, 130);
      // Ending vertical position (above the top of the screen)
      const endTop = -20;
      const duration = getRandomInt(10, 30);
      const delay = Math.random() * 5;
      const angle = getRandomInt(0, 360);

      return (
        <motion.img
          key={index}
          src={asset}
          alt=""
          style={{
            position: "absolute",
            left: `${left}%`,
            opacity: 0.15,
            width: "30px",
            height: "30px",
            ...(darkMode && {
              filter:
                "brightness(0) saturate(100%) invert(13%) sepia(6%) saturate(1100%) hue-rotate(180deg) brightness(95%) contrast(90%)",
            }),
          }}
          initial={{ top: `${startTop}%`, rotate: angle }}
          animate={{ top: `${endTop}%` }}
          transition={{
            duration: duration,
            delay: delay,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      );
    });
  }, [iconsCount, darkMode]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      {icons}
    </div>
  );
}

export default React.memo(AnimatedBackground);
