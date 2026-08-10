"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  seed: number;
}

export default function SwufeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    const mouse = { x: -9999, y: -9999 };

    function buildTargets() {
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.round(width));
      off.height = Math.max(1, Math.round(height));
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.clearRect(0, 0, off.width, off.height);
      octx.fillStyle = "#ffffff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.font = `900 ${Math.max(44, Math.floor(off.height * 0.34))}px Arial, sans-serif`;
      octx.fillText("SWUFE", off.width / 2, off.height / 2);

      const img = octx.getImageData(0, 0, off.width, off.height);
      const step = 4;
      const targets: Array<{ x: number; y: number }> = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (img.data[(y * off.width + x) * 4 + 3] > 128) {
            targets.push({ x, y });
          }
        }
      }
      const cap = 1500;
      const picked =
        targets.length > cap
          ? Array.from({ length: cap }, (_, i) => targets[Math.floor((i * targets.length) / cap)])
          : targets;
      particles = picked.map((target) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        tx: target.x,
        ty: target.y,
        seed: Math.random() * 1000
      }));
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildTargets();
    }

    function step(t: number) {
      ctx.clearRect(0, 0, width, height);
      const time = t / 1000;
      for (const particle of particles) {
        if (reduce) {
          particle.x = particle.tx;
          particle.y = particle.ty;
        } else {
          const flowX =
            Math.sin(particle.y * 0.004 + time * 0.55 + particle.seed * 0.01) * 0.55;
          const flowY =
            Math.cos(particle.x * 0.004 + time * 0.45 + particle.seed * 0.01) * 0.55;
          particle.x += (particle.tx - particle.x) * 0.025 + flowX;
          particle.y += (particle.ty - particle.y) * 0.025 + flowY;

          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 8100) {
            const dist = Math.sqrt(dist2) || 1;
            const force = ((90 - dist) / 90) * 1.6;
            particle.x += (dx / dist) * force;
            particle.y += (dy / dist) * force;
          }
        }
        ctx.fillStyle = "rgba(26, 26, 26, 0.26)";
        ctx.fillRect(particle.x, particle.y, 2, 2);
      }
      if (!reduce) {
        raf = requestAnimationFrame(step);
      }
    }

    resize();

    const onResize = () => resize();
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize", onResize);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    if (reduce) {
      step(0);
    } else {
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <section className="swufe-field" aria-hidden="true">
      <canvas ref={canvasRef} />
    </section>
  );
}
