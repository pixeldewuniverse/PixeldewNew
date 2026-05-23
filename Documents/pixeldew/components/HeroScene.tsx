"use client";
import { useEffect, useRef } from "react";
import type * as THREE from "three";

interface HeroSceneProps {
  scrollProgress: number;
  isMobile: boolean;
}

export default function HeroScene({ scrollProgress, isMobile }: HeroSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  // Use refs so the animation loop always reads the latest values without re-init
  const progressRef = useRef(scrollProgress);
  const mobileRef = useRef(isMobile);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    mobileRef.current = isMobile;
  }, [isMobile]);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let animId = 0;
    let stopped = false;
    let cleanup: (() => void) | undefined;

    async function init() {
      const THREE = await import("three");
      if (stopped) return;

      const W = el!.clientWidth || window.innerWidth;
      const H = el!.clientHeight || window.innerHeight;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      el!.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
      camera.position.set(0, 0, 7);

      // ── Main wireframe cube ──
      const cubeGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2);
      const wireGeo = new THREE.EdgesGeometry(cubeGeo);
      const wireMat = new THREE.LineBasicMaterial({ color: 0x1ddd78, transparent: true, opacity: 0.9 });
      const wireCube = new THREE.LineSegments(wireGeo, wireMat);
      scene.add(wireCube);

      // ── Inner cube ──
      const innerGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
      const innerEdge = new THREE.EdgesGeometry(innerGeo);
      const innerMat = new THREE.LineBasicMaterial({ color: 0x0ecfdf, transparent: true, opacity: 0.5 });
      const innerCube = new THREE.LineSegments(innerEdge, innerMat);
      scene.add(innerCube);

      // ── Corner dots ──
      const dotGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0x1ddd78 });
      const corners: [number, number, number][] = [
        [-1.1, -1.1, -1.1], [1.1, -1.1, -1.1], [-1.1, 1.1, -1.1], [1.1, 1.1, -1.1],
        [-1.1, -1.1,  1.1], [1.1, -1.1,  1.1], [-1.1, 1.1,  1.1], [1.1, 1.1,  1.1],
      ];
      const dotMeshes = corners.map(([x, y, z]) => {
        const dot = new THREE.Mesh(dotGeo, dotMat);
        dot.position.set(x, y, z);
        scene.add(dot);
        return dot;
      });

      // ── Orbiting mini cubes ──
      const miniData = [
        { size: 0.35, radius: 3.2, speed:  0.4, phase: 0,              color: 0x1ddd78, opacity: 0.7  },
        { size: 0.22, radius: 2.6, speed: -0.6, phase: Math.PI / 2,    color: 0x0ecfdf, opacity: 0.6  },
        { size: 0.18, radius: 3.6, speed:  0.3, phase: Math.PI,        color: 0x4a7aff, opacity: 0.5  },
        { size: 0.28, radius: 2.9, speed: -0.5, phase: Math.PI * 1.5,  color: 0xe02cb8, opacity: 0.55 },
      ];
      const miniCubes = miniData.map((d) => {
        const g = new THREE.EdgesGeometry(new THREE.BoxGeometry(d.size, d.size, d.size));
        const m = new THREE.LineBasicMaterial({ color: d.color, transparent: true, opacity: d.opacity });
        const mesh = new THREE.LineSegments(g, m);
        scene.add(mesh);
        return mesh;
      });

      // ── Particles ──
      const ptCount = 120;
      const positions = new Float32Array(ptCount * 3);
      const initialZ = new Float32Array(ptCount);
      for (let i = 0; i < ptCount; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 12;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
        initialZ[i] = positions[i * 3 + 2];
      }
      const ptGeo = new THREE.BufferGeometry();
      ptGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const ptMat = new THREE.PointsMaterial({ color: 0x1ddd78, size: 0.035, transparent: true, opacity: 0.25 });
      const points = new THREE.Points(ptGeo, ptMat);
      scene.add(points);

      // ── Mouse parallax ──
      let mx = 0, my = 0, currentTiltX = 0, currentTiltY = 0;
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth  - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouse, { passive: true });

      // ── Resize ──
      const onResize = () => {
        if (!el) return;
        const w = el.clientWidth || window.innerWidth;
        const h = el.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // ── Smooth camera state ──
      let currentCamZ = 7;
      let currentScale = 1;
      let t = 0;

      function animate() {
        if (stopped) return;
        animId = requestAnimationFrame(animate);
        t += 0.008;

        const progress = progressRef.current;
        const mobile = mobileRef.current;
        const rotMul = 1 + progress * 2;

        // Camera Z target
        if (!mobile) {
          let targetZ = 7;
          if (progress < 0.6) {
            targetZ = 7 - (progress / 0.6) * 5.0; // 7 → 2.0
          } else if (progress < 0.85) {
            const p = (progress - 0.6) / 0.25;
            targetZ = 2.0 - p * 1.6; // 2.0 → 0.4
          } else {
            targetZ = 0.4;
          }
          currentCamZ += (targetZ - currentCamZ) * 0.06;
          camera.position.z = currentCamZ;
        }

        // Mouse tilt (max ±0.15 rad)
        if (!mobile) {
          currentTiltX += (my * 0.15 - currentTiltX) * 0.06;
          currentTiltY += (mx * 0.15 - currentTiltY) * 0.06;
          camera.rotation.x = -currentTiltX;
          camera.rotation.y = -currentTiltY;
        }

        // Cube scale target
        if (!mobile) {
          let targetScale = 1;
          if (progress > 0.6 && progress < 0.85) {
            const p = (progress - 0.6) / 0.25;
            targetScale = 1 + p * 2.5; // 1 → 3.5
          } else if (progress >= 0.85) {
            targetScale = 3.5;
          }
          currentScale += (targetScale - currentScale) * 0.08;
          wireCube.scale.setScalar(currentScale);
          innerCube.scale.setScalar(currentScale);
          dotMeshes.forEach((d) => d.scale.setScalar(currentScale));
        }

        // Main cube rotation
        wireCube.rotation.x += 0.004 * rotMul;
        wireCube.rotation.y += 0.006 * rotMul;

        // Inner cube counter-rotation
        innerCube.rotation.x -= 0.006 * rotMul;
        innerCube.rotation.y -= 0.004 * rotMul;
        innerCube.rotation.z += 0.003 * rotMul;

        // Sync dot rotations
        dotMeshes.forEach((dot) => dot.rotation.copy(wireCube.rotation));

        // Mini cube orbits
        miniData.forEach((d, i) => {
          const angle = t * d.speed + d.phase;
          miniCubes[i].position.x = Math.cos(angle) * d.radius;
          miniCubes[i].position.y = Math.sin(angle * 0.7) * 1.2;
          miniCubes[i].position.z = Math.sin(angle) * d.radius * 0.5;
          miniCubes[i].rotation.x += 0.02 * rotMul;
          miniCubes[i].rotation.y += 0.03 * rotMul;
        });

        // Particle drift toward camera
        const posAttr = ptGeo.getAttribute("position") as THREE.BufferAttribute;
        for (let i = 0; i < ptCount; i++) {
          (posAttr.array as Float32Array)[i * 3 + 2] = initialZ[i] + progress * 3;
        }
        posAttr.needsUpdate = true;
        points.rotation.y += 0.0005 * rotMul;

        // Edge fade during break-in (0.6–0.85)
        if (progress > 0.6 && progress <= 0.85) {
          const p = (progress - 0.6) / 0.25;
          wireMat.opacity = 0.9 * (1 - p);
          innerMat.opacity = 0.5 * (1 - p);
        } else if (progress <= 0.6) {
          wireMat.opacity = 0.9;
          innerMat.opacity = 0.5;
        } else {
          wireMat.opacity = 0;
          innerMat.opacity = 0;
        }

        renderer.render(scene, camera);
      }
      animate();

      cleanup = () => {
        stopped = true;
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        // Dispose geometries
        [cubeGeo, wireGeo, innerGeo, innerEdge, dotGeo, ptGeo].forEach((g) => g.dispose());
        miniData.forEach((_, i) => miniCubes[i].geometry.dispose());
        // Dispose materials
        wireMat.dispose();
        innerMat.dispose();
        dotMat.dispose();
        ptMat.dispose();
        miniCubes.forEach((m) => (m.material as THREE.Material).dispose());
        renderer.dispose();
        if (el && renderer.domElement.parentNode === el) {
          el.removeChild(renderer.domElement);
        }
      };
    }

    init();

    return () => {
      stopped = true;
      cancelAnimationFrame(animId);
      cleanup?.();
    };
  }, []); // Scene only inits once

  return (
    <div
      ref={mountRef}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    />
  );
}
