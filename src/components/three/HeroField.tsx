import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

const COLS = 130;
const ROWS = 70;
const WIDTH = 30;
const DEPTH = 16;

// Camera dive rig (Sprint 2): hero scroll 0→1 pushes camera in + down
const CAM_BASE = { y: 3.4, z: 8.2, lookY: -0.4 };
const CAM_DIVE = { y: 2.5, z: 6.6, lookY: -0.9 };

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

interface HeroFieldProps {
  /** Hero section scrollYProgress (0 at top → 1 scrolled away). Drives dive + wave energy. */
  scrollProgress?: MotionValue<number>;
  /**
   * Effective reduced-motion flag (OS preference + user override).
   * Falls back to matchMedia when omitted (e.g. outside the provider).
   */
  reducedMotion?: boolean;
}

const HeroField: React.FC<HeroFieldProps> = ({ scrollProgress, reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(scrollProgress);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion =
      reducedMotion ?? window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dprCap = () => (window.innerWidth < 768 ? 1 : 2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap()));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, 3.4, 8.2);
    camera.lookAt(0, -0.4, -1);

    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    const accents = new Float32Array(count);
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        positions[i * 3] = (c / (COLS - 1) - 0.5) * WIDTH;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = -(r / (ROWS - 1)) * DEPTH + 3;
        accents[i] = Math.random() < 0.012 ? 1 : 0;
        i++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aAccent", new THREE.BufferAttribute(accents, 1));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(99, 99) },
      uScroll: { value: 0 },
    };

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms,
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uScroll;
        attribute float aAccent;
        varying float vAlpha;
        varying float vAccent;
        void main() {
          vec3 p = position;
          float amp = 1.0 + uScroll * 0.55;
          float w =
            sin(p.x * 0.55 + uTime * 0.9) * 0.34 +
            cos(p.z * 0.62 + uTime * 0.7) * 0.42 +
            sin((p.x + p.z) * 0.28 + uTime * 0.45) * 0.5;
          p.y += w * amp;
          float d = distance(p.xz, uMouse);
          float m = smoothstep(3.4, 0.0, d);
          p.y += m * (1.25 + uScroll * 0.6);
          vAlpha = 0.22 + 0.7 * smoothstep(-1.3, 1.1, w) + m * 0.3 + uScroll * 0.06;
          vAccent = aAccent;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (1.7 + m * 2.6 + uScroll * 0.5) * (26.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        varying float vAccent;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          if (dot(c, c) > 0.25) discard;
          vec3 ink = vec3(0.078, 0.078, 0.075);
          vec3 accent = vec3(1.0, 0.302, 0.0);
          vec3 col = mix(ink, accent, vAccent);
          gl_FragColor = vec4(col, vAlpha * 0.85);
        }
      `,
    });

    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    scene.add(points);

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2(99, 99);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3();
    const scrollVal = { current: 0 };

    const readScroll = () => {
      try {
        const mv = progressRef.current;
        scrollVal.current = mv ? clamp01(mv.get()) : 0;
      } catch {
        scrollVal.current = 0;
      }
    };
    let visible = true;
    let dirty = false;

    const applyCamera = () => {
      const s = scrollVal.current;
      camera.position.set(
        0,
        CAM_BASE.y + (CAM_DIVE.y - CAM_BASE.y) * s,
        CAM_BASE.z + (CAM_DIVE.z - CAM_BASE.z) * s
      );
      camera.lookAt(0, CAM_BASE.lookY + (CAM_DIVE.lookY - CAM_BASE.lookY) * s, -1);
    };

    const renderStatic = () => {
      readScroll();
      uniforms.uTime.value = 0.6;
      uniforms.uScroll.value = scrollVal.current;
      applyCamera();
      renderer.render(scene, camera);
    };

    readScroll();
    const unsubScroll = progressRef.current?.on?.("change", (v: number) => {
      scrollVal.current = clamp01(typeof v === "number" ? v : 0);
      // Reduced-motion: repaint the scroll-linked frame on user scroll.
      // No autonomous animation — all changes are user-initiated.
      if (reduceMotion) {
        if (visible) renderStatic();
        else dirty = true;
      }
    });
    applyCamera();

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onLeave = () => ndc.set(99, 99);
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap()));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      // A canvas resize clears the drawing buffer — repaint the static frame.
      if (reduceMotion) {
        if (visible) renderStatic();
        else dirty = true;
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // Pause GPU work when hero is offscreen
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible && dirty) {
          dirty = false;
          if (reduceMotion) renderStatic();
        }
      },
      { threshold: 0 }
    );
    if (canvas.parentElement) io.observe(canvas.parentElement);

    let raf = 0;
    const start = performance.now();

    if (reduceMotion) {
      // Scroll-linked static frames only — no loop, no pointer tracking.
      // renderStatic runs via resize/scroll/IO callbacks above; paint once now.
      renderStatic();
      return () => {
        ro.disconnect();
        io.disconnect();
        unsubScroll?.();
        geo.dispose();
        mat.dispose();
        renderer.dispose();
      };
    }

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      uniforms.uTime.value = (performance.now() - start) / 1000;
      uniforms.uScroll.value = scrollVal.current;
      applyCamera();
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        uniforms.uMouse.value.set(hit.x, hit.z);
      }
      renderer.render(scene, camera);
    };

    frame();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      unsubScroll?.();
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
};

export default HeroField;
