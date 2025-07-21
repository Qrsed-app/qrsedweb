'use client';
import React from 'react';
import { motion } from 'motion/react';

type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
};

export const Spotlight = ({
  gradientFirst = 'radial-gradient(68.54% 68.72% at 55.02% 31.46%, oklch(0.5197 0.2712 293.31 / 0.05) 0, oklch(0.6069 0.2416 293.08 / 0.015) 40%, transparent 70%)',
  gradientSecond = 'radial-gradient(50% 50% at 50% 50%, oklch(0.7028 0.1771 293.93 / 0.025) 0, oklch(0.6069 0.2416 293.08 / 0.008) 40%, transparent 60%)',
  gradientThird = 'radial-gradient(50% 50% at 50% 50%, oklch(0.6548 0.1374 55.39 / 0.02) 0, oklch(0.7331 0.1367 57.55 / 0.008) 40%, transparent 60%)',
  translateY = 350,
  width = 560,
  height = 1080,
  smallWidth = 340,
  duration = 7,
  xOffset = 100,
}: SpotlightProps = {}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
      }}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    >
      <motion.div
        animate={{
          x: [0, xOffset, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute left-0 bottom-0 z-0 h-screen w-screen"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className={`absolute left-0 bottom-0`}
        />

        <div
          style={{
            transform: 'rotate(45deg) translate(-50%, 50%)',
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className={`absolute left-0 bottom-0 origin-bottom-left`}
        />

        <div
          style={{
            transform: 'rotate(45deg) translate(-180%, 70%)',
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className={`absolute left-0 bottom-0 origin-bottom-left`}
        />
      </motion.div>

      <motion.div
        animate={{
          x: [0, -xOffset, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute right-0 bottom-0 z-40 h-screen w-screen"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
          }}
          className={`absolute right-0 bottom-0`}
        />

        <div
          style={{
            transform: 'rotate(-45deg) translate(50%, 50%)',
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className={`absolute right-0 bottom-0 origin-bottom-right`}
        />

        <div
          style={{
            transform: 'rotate(-45deg) translate(180%, 70%)',
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
          }}
          className={`absolute right-0 bottom-0 origin-bottom-right`}
        />
      </motion.div>
    </motion.div>
  );
};
