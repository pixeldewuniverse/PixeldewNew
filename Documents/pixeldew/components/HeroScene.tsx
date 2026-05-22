"use client";
import { useEffect, useRef } from "react";

interface HeroSceneProps {
  scrollProgress: number;
  isMobile: boolean;
}

export default function HeroScene({ scrollProgress, isMobile }: HeroSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    wireCube?: any;
    innerCube?: any;
    dotMeshes?: any[];
    miniCubes?: any[];
    points?: any;
    camera?: any;
    renderer?: any;
    scene?: any;
  }>({});

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let animId: number;
    let stopped = false;

    async function init() {
      const THREE = await import("three");
      if (stopped) return;

      const W = el!.clientWidth || 480;
      const H = el!.clientHeight || 480;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      el!.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
      camera.position.set(0, 0, 7);

      // Main wireframe cube
      const cubeGeo = new THREE.BoxGeometry(2.2, 2.2, 2.2);
      const wireGeo = new THREE.EdgesGeometry(cubeGeo);
      const wireMat = new THREE.LineBasicMaterial({
        color: 0x1ddd78,
        transparent: true,
        opacity: 0.9,
      });
      const wireCube = new THREE.LineSegments(wireGeo, wireMat);
      scene.add(wireCube);

      // Inner cube
      const innerGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
      const innerEdge = new THREE.EdgesGeometry(innerGeo);
      const innerMat = new THREE.LineBasicMaterial({
        color: 0x0ecfdf,
        transparent: true,
        opacity: 0.5,
      });
      const innerCube = new THREE.LineSegments(innerEdge, innerMat);
      scene.add(innerCube);

      // Corner dots
      const dotGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);
      const corners = [
        [-1.1, -1.1, -1.1],
        [1.1, -1.1, -1.1],
        [-1.1, 1.1, -1.1],
        [1.1, 1.1, -1.1],
        [-1.1, -1.1, 1.1],
        [1.1, -1.1, 1.1],
        [-1.1, 1.1, 1.1],
        [1.1, 1.1, 1.1],
      ] as [number, number, number][];
      const dotMeshes: InstanceType<typeof THREE.Mesh>[] = [];
      corners.forEach(([x, y, z]) => {
        const dot = new THREE.Mesh(
          dotGeo,
          new THREE.MeshBasicMaterial({ color: 0x1ddd78 })
        );
        dot.position.set(x, y, z);
        scene.add(dot);
        dotMeshes.push(dot);
      });

      // Orbiting mini cubes
      const miniCubes: InstanceType<typeof THREE.LineSegments>[] = [];
      const miniData = [
        {
          size: 0.35,
          radius: 3.2,
          speed: 0.4,
          phase: 0,
          color: 0x1ddd78,
          opacity: 0.7,
        },
        {
          size: 0.22,
          radius: 2.6,
          speed: -0.6,
          phase: Math.PI / 2,
          color: 0x0ecfdf,
          opacity: 0.6,
        },
        {
          size: 0.18,
          radius: 3.6,
          speed: 0.3,
          phase: Math.PI,
          color: 0x4a7aff,
          opacity: 0.5,
        },
        {
          size: 0.28,
          radius: 2.9,
          speed: -0.5,
          phase: Math.PI * 1.5,
          color: 0xe02cb8,
          opacity: 0.55,
        },
      ];
      miniData.forEach((d) => {
        const g = new THREE.EdgesGeometry(
          new THREE.BoxGeometry(d.size, d.size, d.size)
        );
        const m = new THREE.LineBasicMaterial({
          color: d.color,
          transparent: true,
          opacity: d.opacity,
        });
        const mesh = new THREE.LineSegments(g, m);
        scene.add(mesh);
        miniCubes.push(mesh);
      });

      // Particles
      const ptCount = 120;
      const positions = new Float32Array(ptCount * 3);
      const initialZ = new Float32Array(ptCount);
      for (let i = 0; i < ptCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
        initialZ[i] = positions[i * 3 + 2];
      }
      const ptGeo = new THREE.BufferGeometry();
      ptGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const ptMat = new THREE.PointsMaterial({
        color: 0x1ddd78,
        size: 0.035,
        transparent: true,
        opacity: 0.25,
      });
      const points = new THREE.Points(ptGeo, ptMat);
      scene.add(points);

      // Resize
      const onResize = () => {
        const w = el!.clientWidth;
        const h = el!.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // Store refs for animation
      sceneRef.current = {
        wireCube,
        innerCube,
        dotMeshes,
        miniCubes,
        points,
        camera,
        renderer,
        scene,
      };

      // Animate
      let t = 0;
      function animate() {
        if (stopped) return;
        animId = requestAnimationFrame(animate);
        t += 0.008;

        const progress = scrollProgress;

        // Camera movement: z from 7 to 0.3 at progress 1
        if (!isMobile) {
          let targetZ = 7;
          if (progress < 0.6) {
            targetZ = 7 - (progress / 0.6) * 5.2; // 7 -> 1.8
          } else if (progress < 0.85) {
            const p = (progress - 0.6) / 0.25;
            targetZ = 1.8 - p * 1.5; // 1.8 -> 0.3
          } else {
            targetZ = 0.3;
          }
          camera.position.z += (targetZ - camera.position.z) * 0.08;
        }

        // Cube scaling
        if (!isMobile) {
          let scale = 1;
          if (progress > 0.6 && progress < 0.85) {
            const p = (progress - 0.6) / 0.25;
            scale = 1 + p * 1.8; // 1 -> 2.8
          } else if (progress >= 0.85) {
            const p = (progress - 0.85) / 0.15;
            scale = 2.8 + Math.max(0, p * 3.2); // 2.8 -> 6.0
          }
          wireCube.scale.set(scale, scale, scale);
        }

        // Rotation speeds increase with scroll
        const rotationMultiplier = 1 + progress * 3;
        wireCube.rotation.x += 0.004 * rotationMultiplier;
        wireCube.rotation.y += 0.006 * rotationMultiplier;

        innerCube.rotation.x -= 0.006 * rotationMultiplier;
        innerCube.rotation.y -= 0.004 * rotationMultiplier;
        innerCube.rotation.z += 0.003 * rotationMultiplier;

        // Sync corner dots
        dotMeshes.forEach((dot) => {
          dot.rotation.copy(wireCube.rotation);
          dot.scale.copy(wireCube.scale);
        });

        // Orbit minis
        miniData.forEach((d, i) => {
          const angle = t * d.speed + d.phase;
          miniCubes[i].position.x = Math.cos(angle) * d.radius;
          miniCubes[i].position.y = Math.sin(angle * 0.7) * 1.2;
          miniCubes[i].position.z = Math.sin(angle) * d.radius * 0.5;
          miniCubes[i].rotation.x += 0.02 * rotationMultiplier;
          miniCubes[i].rotation.y += 0.03 * rotationMultiplier;
        });

        // Particle movement toward camera
        const posAttr = ptGeo.getAttribute("position") as THREE.BufferAttribute;
        for (let i = 0; i < ptCount; i++) {
          posAttr.array[i * 3 + 2] = initialZ[i] + progress * 2;
        }
        posAttr.needsUpdate = true;
        points.rotation.y += 0.0005 * rotationMultiplier;

        // Edge opacity fades at high progress
        if (progress > 0.82) {
          const fadeProgress = Math.max(0, progress - 0.82) / 0.08;
          wireMat.opacity = 0.9 * (1 - fadeProgress);
        } else {
          wireMat.opacity = 0.9;
        }

        renderer.render(scene, camera);
      }
      animate();

      return () => {
        stopped = true;
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", onResize);
        wireMat.dispose();
        innerMat.dispose();
        ptMat.dispose();
        cubeGeo.dispose();
        wireGeo.dispose();
        innerGeo.dispose();
        innerEdge.dispose();
        dotGeo.dispose();
        ptGeo.dispose();
        renderer.dispose();
        if (el && renderer.domElement.parentNode === el) {
          el.removeChild(renderer.domElement);
        }
      };
    }

    const cleanupPromise = init();
    return () => {
      stopped = true;
      cancelAnimationFrame(animId);
      cleanupPromise.then((fn) => fn && fn());
    };
  }, [scrollProgress, isMobile]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "420px",
        position: "relative",
      }}
      aria-hidden="true"
    />
  );
}
