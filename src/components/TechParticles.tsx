import React, { useEffect, useRef } from 'react';

interface TechParticlesProps {
  theme: 'dark' | 'light';
}

export const TechParticles: React.FC<TechParticlesProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: (Snow | Brick)[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    class Snow {
      x: number;
      y: number;
      speed: number;
      radius: number;
      wind: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * -canvas!.height;
        this.speed = Math.random() * 1.5 + 0.5;
        this.radius = Math.random() * 2.5 + 1.2;
        this.wind = (Math.random() - 0.5) * 1;
      }

      update() {
        this.y += this.speed;
        this.x += this.wind;
        if (this.y > canvas!.height) {
          this.y = -10;
          this.x = Math.random() * canvas!.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(59, 130, 246, 0.2)';
        ctx.fill();
      }
    }

    class Brick {
      x: number;
      y: number;
      w: number;
      h: number;
      speed: number;
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * -canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.w = Math.random() * 25 + 15;
        this.h = this.w * 0.6;
        this.speed = Math.random() * 1.5 + 0.5;
        this.rotation = Math.random() * Math.PI;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.x += this.speed;
        this.rotation += this.rotationSpeed;
        if (this.x > canvas!.width) {
          this.x = -this.w;
          this.y = Math.random() * canvas!.height;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = theme === 'dark' ? 'rgba(255, 100, 50, 0.12)' : 'rgba(239, 68, 68, 0.08)';
        ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 100, 50, 0.15)' : 'rgba(239, 68, 68, 0.12)';
        ctx.lineWidth = 1;
        ctx.strokeRect(-this.w / 2, -this.h / 2, this.w, this.h);
        ctx.restore();
      }
    }

    const init = () => {
      particles = [];
      const snowCount = window.innerWidth < 768 ? 20 : 50;
      const brickCount = window.innerWidth < 768 ? 10 : 25;
      for (let i = 0; i < snowCount; i++) particles.push(new Snow());
      for (let i = 0; i < brickCount; i++) particles.push(new Brick());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
