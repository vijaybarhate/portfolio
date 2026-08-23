import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const COLS = 130;
const ROWS = 70;
const WIDTH = 30;
const DEPTH = 16;

const HeroField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
    };

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms,
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        attribute float aAccent;
        varying float vAlpha;
        varying float vAccent;
        void main() {
          vec3 p = position;
          float w =
            sin(p.x * 0.55 + uTime * 0.9) * 0.34 +
            cos(p.z * 0.62 + uTime * 0.7) * 0.42 +
            sin((p.x + p.z) * 0.28 + uTime * 0.45) * 0.5;
          p.y += w;
          float d = distance(p.xz, uMouse);
          float m = smoothstep(3.4, 0.0, d);
          p.y += m * 1.25;
          vAlpha = 0.22 + 0.7 * smoothstep(-1.3, 1.1, w) + m * 0.3;
          vAccent = aAccent;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = (1.7 + m * 2.6) * (26.0 / -mv.z);
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
    scene.add(points);

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2(99, 99);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3();

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onLeave = () => ndc.set(99, 99);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const clock = new THREE.Clock();

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (document.hidden) return;
      uniforms.uTime.value = clock.getElapsedTime();
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        uniforms.uMouse.value.set(hit.x, hit.z);
      }
      renderer.render(scene, camera);
    };

    if (reduce) {
      uniforms.uTime.value = 4;
      renderer.render(scene, camera);
    } else {
      frame();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
};

export default HeroField;
