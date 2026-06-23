"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";

const ROWS = 12;
const TEXT = " gomero.dev ";

type DOEWithPermission = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

function HeroBgRow({
  index,
  springX,
  springY,
}: {
  index: number;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}) {
  const depth = (index % 4) + 1;
  const x = useTransform(springX, (v) => v * depth * 14);
  const y = useTransform(springY, (v) => v * depth * 10);

  return (
    <motion.div className="hero-bg-row" style={{ x, y }}>
      <div
        className="hero-bg-row-inner"
        style={{
          animationDuration: `${30 + index * 3}s`,
          animationDirection: index % 2 === 0 ? "normal" : "reverse",
        }}
      >
        {TEXT.repeat(10)}
      </div>
    </motion.div>
  );
}

export default function HeroBackground() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 40, damping: 20, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 40, damping: 20, mass: 0.6 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    let gyroActive = false;

    function handleMouseMove(e: MouseEvent) {
      pointerX.set(e.clientX / window.innerWidth - 0.5);
      pointerY.set(e.clientY / window.innerHeight - 0.5);
    }

    function handleOrientation(e: DeviceOrientationEvent) {
      if (e.gamma == null || e.beta == null) return;
      gyroActive = true;
      pointerX.set(Math.max(-1, Math.min(1, e.gamma / 45)) / 2);
      pointerY.set(Math.max(-1, Math.min(1, (e.beta - 45) / 45)) / 2);
    }

    function handleScrollFallback() {
      if (gyroActive) return;
      const progress = window.scrollY / (window.innerHeight || 1);
      pointerY.set(Math.max(-0.5, Math.min(0.5, progress - 0.3)));
    }

    if (!isTouch) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }

    window.addEventListener("deviceorientation", handleOrientation);
    window.addEventListener("scroll", handleScrollFallback, { passive: true });

    const DOE = DeviceOrientationEvent as DOEWithPermission;
    if (typeof DOE?.requestPermission === "function") {
      const requestOnce = () => {
        DOE.requestPermission?.().catch(() => {});
        window.removeEventListener("touchstart", requestOnce);
      };
      window.addEventListener("touchstart", requestOnce, { once: true });
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("scroll", handleScrollFallback);
    };
  }, [pointerX, pointerY]);

  return (
    <div className="hero-bg-wrapper" aria-hidden="true">
      {Array.from({ length: ROWS }).map((_, i) => (
        <HeroBgRow key={i} index={i} springX={springX} springY={springY} />
      ))}
    </div>
  );
}
