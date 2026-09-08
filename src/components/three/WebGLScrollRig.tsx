import React, { Suspense, lazy } from "react";
import type { MotionValue } from "framer-motion";
import { useMotionPreference } from "../layout/MotionContext";

const HeroField = lazy(() => import("./HeroField"));

class FieldBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

interface WebGLScrollRigProps {
  /** Hero section scrollYProgress — drives camera dive + wave energy in HeroField. */
  progress: MotionValue<number>;
}

/**
 * WebGLScrollRig (Sprint 2) — scroll-aware wrapper for the hero WebGL field.
 * Owns lazy boundary + passes scroll uniforms through. Zero filesystem writes,
 * no layout of its own beyond filling the absolute parent.
 */
const WebGLScrollRig: React.FC<WebGLScrollRigProps> = ({ progress }) => {
  const { reduceMotion } = useMotionPreference();
  return (
    <Suspense fallback={null}>
      <FieldBoundary>
        <HeroField scrollProgress={progress} reducedMotion={reduceMotion} />
      </FieldBoundary>
    </Suspense>
  );
};

export default WebGLScrollRig;
