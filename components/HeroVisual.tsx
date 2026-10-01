"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";

const nodes = ["Build", "Connect", "Analyze", "Automate", "Grow"];
const X = [30, 270];
const Y = (i: number) => 20 + i * 90;

function path(i: number) {
  const leftToRight = i % 2 === 0;
  const y1 = Y(i) + 26;
  const y2 = Y(i + 1) + 26;
  return leftToRight
    ? `M210 ${y1} C 240 ${y1}, 240 ${y2}, 270 ${y2}`
    : `M270 ${y1} C 240 ${y1}, 240 ${y2}, 210 ${y2}`;
}

export function HeroVisual() {
  const reduce = useReducedMotion();
  return (
    <>
      <svg
        viewBox="0 0 480 440"
        role="img"
        aria-label="Diagram of the ELS flow: Build, Connect, Analyze, Automate, Grow"
        className="hidden h-auto w-full max-w-md md:block"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={i} x1={0} x2={480} y1={i * 55} y2={i * 55} stroke="#ffffff" strokeOpacity={0.04} />
        ))}
        {nodes.slice(0, -1).map((_, i) => (
          <m.path
            key={i}
            d={path(i)}
            fill="none"
            stroke="#06B6D4"
            strokeWidth={1.5}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.5, ease: "easeInOut" }}
          />
        ))}
        {nodes.map((n, i) => (
          <m.g
            key={n}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.5 }}
          >
            <rect x={X[i % 2]} y={Y(i)} width={180} height={52} rx={6} fill="#0F2A44" stroke="#ffffff" strokeOpacity={0.18} />
            <text x={X[i % 2] + 16} y={Y(i) + 31} fill="#06B6D4" fontFamily="var(--font-mono)" fontSize={12}>
              {String(i + 1).padStart(2, "0")}
            </text>
            <text x={X[i % 2] + 48} y={Y(i) + 32} fill="#F8FAFC" fontSize={17} fontWeight={500}>
              {n}
            </text>
          </m.g>
        ))}
      </svg>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-sm text-cyan md:hidden" aria-label="Build, Connect, Analyze, Automate, Grow">
        {nodes.map((n, i) => (
          <li key={n} className="flex items-center gap-2">
            {n}
            {i < nodes.length - 1 && <span aria-hidden>→</span>}
          </li>
        ))}
      </ol>
    </>
  );
}
