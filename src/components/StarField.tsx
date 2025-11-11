import React, { useEffect, useRef } from "react";
import "./StarField.css";

type StarFieldProps = {
    count?: number;
    color?: string;
};

type Star = {
    x: number;
    y: number;
    r: number;
    vx: number;
    vy: number;
    baseR: number;
    alpha: number;
    baseVx: number;
    baseVy: number;
};

export default function StarField({ count = 90, color = "#64748b" }: StarFieldProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const starsRef = useRef<Star[]>([]);
    const mouse = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
        const canvas = canvasRef.current!;
        if (!canvas) return;

        const ctx = canvas.getContext("2d")!;
        if (!ctx) return;

        let width = canvas.clientWidth;
        let height = canvas.clientHeight;
        const dpr = Math.max(1, window.devicePixelRatio || 1);

        function resize() {
            // canvas is captured from outer scope and asserted non-null
            width = canvas.clientWidth;
            height = canvas.clientHeight;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        resize();
        window.addEventListener("resize", resize);

        // Respect prefers-reduced-motion
        const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Initialize stars
        const stars: Star[] = [];
        for (let i = 0; i < count; i++) {
            const baseR = Math.random() * 1.6 + 0.6; // subtle variety
            // tiny random drift speed
            const driftAngle = Math.random() * Math.PI * 2;
            const driftSpeed = 0.03 + Math.random() * 0.03;
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: baseR,
                baseR,
                vx: 0,
                vy: 0,
                alpha: 0.6 + Math.random() * 0.4,
                baseVx: Math.cos(driftAngle) * driftSpeed,
                baseVy: Math.sin(driftAngle) * driftSpeed,
            });
        }
        starsRef.current = stars;

        function draw() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // subtle background glow (very light)
            // draw stars
            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];

                // simple repel: if mouse is near, push star away slightly
                const dx = s.x - mouse.current.x;
                const dy = s.y - mouse.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (!reduceMotion && dist < 120) {
                    const force = (120 - dist) / 120;
                    const ang = Math.atan2(dy, dx);
                    s.vx += Math.cos(ang) * 0.12 * force;
                    s.vy += Math.sin(ang) * 0.12 * force;
                }

                // slight easing back to base
                s.vx *= 0.92;
                s.vy *= 0.92;

                // update position: continuous drift + mouse push
                s.x += s.baseVx + s.vx;
                s.y += s.baseVy + s.vy;

                // wrap
                if (s.x < -10) s.x = width + 10;
                if (s.x > width + 10) s.x = -10;
                if (s.y < -10) s.y = height + 10;
                if (s.y > height + 10) s.y = -10;

                // gentle twinkle
                s.r = s.baseR * (1 + 0.5 * Math.sin((Date.now() / 1000) * (0.6 + (i % 5) * 0.03)));

                ctx.beginPath();
                ctx.fillStyle = `rgba(${hexToRgb(color)}, ${s.alpha})`;
                ctx.arc(s.x, s.y, Math.max(0.3, s.r), 0, Math.PI * 2);
                ctx.fill();
            }

            // subtle parallax background: a light radial gradient
            ctx.globalCompositeOperation = "destination-over";
            const g = ctx.createLinearGradient(0, 0, 0, height);
            g.addColorStop(0, "rgba(255,255,255,0.7)");
            g.addColorStop(1, "rgba(255,255,255,0.95)");
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = "source-over";

            rafRef.current = requestAnimationFrame(draw);
        }

        // Start animation unless user prefers reduced motion
        if (!reduceMotion) rafRef.current = requestAnimationFrame(draw);
        else {
            // draw static once
            for (let i = 0; i < stars.length; i++) {
                const s = stars[i];
                ctx.beginPath();
                ctx.fillStyle = `rgba(${hexToRgb(color)}, ${s.alpha})`;
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function handleMove(e: MouseEvent) {
            // canvas is captured and non-null
            const rect = canvas.getBoundingClientRect();
            mouse.current.x = e.clientX - rect.left;
            mouse.current.y = e.clientY - rect.top;
        }

        function handleLeave() {
            mouse.current.x = -9999;
            mouse.current.y = -9999;
        }

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseleave", handleLeave);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseleave", handleLeave);
            window.removeEventListener("resize", resize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count, color]);

    return <canvas className="starfield-canvas" ref={canvasRef} aria-hidden />;
}

function hexToRgb(hex: string) {
    let c = hex.replace("#", "").trim();
    if (c.length === 3) c = c.split("").map((s) => s + s).join("");
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `${r}, ${g}, ${b}`;
}
