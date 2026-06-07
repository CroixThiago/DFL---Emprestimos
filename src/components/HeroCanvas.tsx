import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Sizing function to match parent height/width exactly
    const handleResize = () => {
      const parent = canvas.parentElement;
      width = canvas.width = parent ? parent.offsetWidth : window.innerWidth;
      // Guarantee a fallback height that corresponds to the hero min-height if the parent layout reports 0
      height = canvas.height = parent && parent.offsetHeight > 100 ? parent.offsetHeight : window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Giant Glowing Orbs Definition
    interface GlowingOrb {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color1: string; // Inner gradient color
      color2: string; // Outer gradient color
    }

    // Drifting magical starry particles
    interface StarParticle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
      pulseSpeed: number;
      angle: number;
    }

    const orbs: GlowingOrb[] = [
      {
        x: window.innerWidth * 0.25,
        y: window.innerHeight * 0.3,
        vx: 0.25,
        vy: -0.15,
        radius: Math.min(window.innerWidth, window.innerHeight) * 0.45,
        color1: "rgba(232, 198, 112, 0.15)", // DFL Gold
        color2: "rgba(232, 198, 112, 0)"
      },
      {
        x: window.innerWidth * 0.75,
        y: window.innerHeight * 0.45,
        vx: -0.2,
        vy: 0.25,
        radius: Math.min(window.innerWidth, window.innerHeight) * 0.55,
        color1: "rgba(107, 74, 158, 0.25)", // Royal brand purple
        color2: "rgba(107, 74, 158, 0)"
      },
      {
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.75,
        vx: 0.15,
        vy: -0.2,
        radius: Math.min(window.innerWidth, window.innerHeight) * 0.52,
        color1: "rgba(76, 42, 122, 0.22)", // Deep Royal accent
        color2: "rgba(76, 42, 122, 0)"
      },
      {
        x: window.innerWidth * 0.1,
        y: window.innerHeight * 0.8,
        vx: -0.18,
        vy: -0.18,
        radius: Math.min(window.innerWidth, window.innerHeight) * 0.4,
        color1: "rgba(232, 198, 112, 0.12)", // Gold accent
        color2: "rgba(232, 198, 112, 0)"
      }
    ];

    // Prepare dozens of micro stars drifting slowly upwards
    const starsCount = 45;
    const stars: StarParticle[] = [];
    for (let i = 0; i < starsCount; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2.2 + 0.6,
        speedY: -(Math.random() * 0.25 + 0.08), // Gentle upward drift
        opacity: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        angle: Math.random() * Math.PI * 2
      });
    }

    let waveOffset = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Giant Floating Ambient Orbs
      orbs.forEach((orb) => {
        // Move orb smoothly
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce gently inside canvas boundaries with margin padding
        const pad = orb.radius * 0.5;
        if (orb.x < -pad || orb.x > width + pad) orb.vx *= -1;
        if (orb.y < -pad || orb.y > height + pad) orb.vy *= -1;

        // Draw radial gradient orb
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        grad.addColorStop(0, orb.color1);
        grad.addColorStop(0.5, orb.color1); // Boost the core visual color
        grad.addColorStop(1, orb.color2);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Elegant Flowing Waves (running in looping wave form)
      waveOffset += 0.005; // Gentle wave oscillation speed
      const drawWave = (
        amplitude: number,
        frequency: number,
        offsetY: number,
        color: string,
        lineWidth: number
      ) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        for (let x = 0; x <= width; x += 5) {
          const y =
            offsetY +
            Math.sin(x * frequency + waveOffset) * amplitude +
            Math.cos(x * (frequency * 0.4) - waveOffset * 0.8) * (amplitude * 0.4);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      };

      // Waves flowing across the section backdrops
      drawWave(30, 0.002, height * 0.45, "rgba(232, 198, 112, 0.16)", 2); // Gold wave
      drawWave(45, 0.0015, height * 0.55, "rgba(107, 74, 158, 0.25)", 3); // Royal purple wave
      drawWave(25, 0.003, height * 0.65, "rgba(232, 198, 112, 0.12)", 1.5); // Thin gold wave
      drawWave(50, 0.001, height * 0.70, "rgba(107, 74, 158, 0.2)", 3); // Large wave

      // 3. Draw Starry drifting elements
      stars.forEach((star) => {
        // Move star upward
        star.y += star.speedY;
        if (star.y < -10) {
          star.y = height + 10;
          star.x = Math.random() * width;
        }

        // Pulse opacity smoothly
        star.angle += star.pulseSpeed;
        const currentOpacity = star.opacity * (0.4 + Math.sin(star.angle) * 0.6);

        // Draw star
        ctx.fillStyle = `rgba(232, 198, 112, ${currentOpacity * 1.2})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Optional micro gleam flare
        if (star.size > 2.0 && currentOpacity > 0.6) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${currentOpacity * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - 4, star.y);
          ctx.lineTo(star.x + 4, star.y);
          ctx.moveTo(star.x, star.y - 4);
          ctx.lineTo(star.x, star.y + 4);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-x-0 inset-y-0 w-full h-full pointer-events-none opacity-90 z-0"
    />
  );
}
