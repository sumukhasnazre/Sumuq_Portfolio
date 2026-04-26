import React, { useEffect, useRef } from 'react';

interface DataPipelineProps {
  theme: 'dark' | 'light';
}

const TECH_ITEMS = ["ETL", "ELT", "Spark", "Snowpipe", "AWS S3", "SDP", "DLT", "Python", "SQL", "Databricks", "Snowflake"];

export const DataPipeline: React.FC<DataPipelineProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const pipeOuterWidth = 44;
    const pipeInnerWidth = 36;
    
    // Path points for S-Shape: 
    // Start (Left) -> Corner 1 -> Corner 2 -> End (Right)
    const getPath = (w: number) => {
      const splitX = w * 0.65;
      const y1 = 40;
      const y2 = 160;
      return {
        segments: [
          { type: 'horizontal', x1: 0, x2: splitX, y: y1 },
          { type: 'vertical', x: splitX, y1: y1, y2: y2 },
          { type: 'horizontal', x1: splitX, x2: w, y: y2 }
        ],
        y1, y2, splitX
      };
    };

    class Particle {
      text: string;
      segment: number = 0;
      dist: number; // main axis position
      offset: number; // perpendicular axis position
      speed: number;
      offsetSpeed: number;

      constructor(text: string, startDist: number) {
        this.text = text;
        this.dist = startDist;
        this.offset = (Math.random() - 0.5) * (pipeInnerWidth - 15);
        this.speed = Math.random() * 0.8 + 1.2;
        this.offsetSpeed = (Math.random() - 0.5) * 0.6;
      }

      update(w: number) {
        const path = getPath(w);
        this.dist += this.speed;
        this.offset += this.offsetSpeed;

        const limit = (pipeInnerWidth / 2) - 10;
        if (Math.abs(this.offset) > limit) {
          this.offsetSpeed *= -1;
          this.offset = Math.sign(this.offset) * limit;
        }

        // Segment Transition Logic
        if (this.segment === 0 && this.dist > path.splitX) {
          this.segment = 1;
          this.dist = path.y1; // Now tracking Y in segment 1
        } else if (this.segment === 1 && this.dist > path.y2) {
          this.segment = 2;
          this.dist = path.splitX; // Now tracking X in segment 2
        } else if (this.segment === 2 && this.dist > w + 100) {
          this.segment = 0;
          this.dist = -100;
        }
      }

      draw(w: number) {
        if (!ctx) return;
        const path = getPath(w);
        let x = 0, y = 0;

        if (this.segment === 0) {
          x = this.dist;
          y = path.y1 + this.offset;
        } else if (this.segment === 1) {
          x = path.splitX + this.offset;
          y = this.dist;
        } else {
          x = this.dist;
          y = path.y2 + this.offset;
        }

        ctx.font = 'bold 12px monospace';
        ctx.fillStyle = theme === 'dark' ? '#60a5fa' : '#2563eb';
        ctx.shadowBlur = 8;
        ctx.shadowColor = theme === 'dark' ? 'rgba(96, 165, 250, 0.8)' : 'rgba(37, 99, 235, 0.6)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, x, y);
        ctx.shadowBlur = 0;
      }
    }

    const particles: Particle[] = [];
    const init = () => {
      particles.length = 0;
      TECH_ITEMS.forEach((item, i) => {
        particles.push(new Particle(item, i * 200 - 400));
      });
    };

    const drawPipeline = () => {
      const w = canvas.width;
      const path = getPath(w);
      const r = pipeOuterWidth / 2;

      ctx.save();
      ctx.lineWidth = 1.5;
      
      // Glass Body Gradient (Stronger for visibility)
      const pipeGradient = ctx.createLinearGradient(0, path.y1 - r, 0, path.y2 + r);
      if (theme === 'dark') {
        pipeGradient.addColorStop(0, 'rgba(51, 65, 85, 0.25)');
        pipeGradient.addColorStop(0.5, 'rgba(71, 85, 105, 0.15)');
        pipeGradient.addColorStop(1, 'rgba(51, 65, 85, 0.25)');
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      } else {
        pipeGradient.addColorStop(0, 'rgba(203, 213, 225, 0.3)');
        pipeGradient.addColorStop(0.5, 'rgba(226, 232, 240, 0.2)');
        pipeGradient.addColorStop(1, 'rgba(203, 213, 225, 0.3)');
        ctx.strokeStyle = 'rgba(37, 99, 235, 0.2)';
      }
      ctx.fillStyle = pipeGradient;

      // Draw horizontal segment 1
      ctx.fillRect(0, path.y1 - r, path.splitX + r, pipeOuterWidth);
      ctx.strokeRect(0, path.y1 - r, path.splitX + r, pipeOuterWidth);
      
      // Draw vertical segment
      ctx.fillRect(path.splitX - r, path.y1 - r, pipeOuterWidth, path.y2 - path.y1 + pipeOuterWidth);
      ctx.strokeRect(path.splitX - r, path.y1 - r, pipeOuterWidth, path.y2 - path.y1 + pipeOuterWidth);
      
      // Draw horizontal segment 2
      ctx.fillRect(path.splitX - r, path.y2 - r, w - path.splitX + r, pipeOuterWidth);
      ctx.strokeRect(path.splitX - r, path.y2 - r, w - path.splitX + r, pipeOuterWidth);
      
      // Connectors / Joints
      ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(37, 99, 235, 0.15)';
      
      // Input Cap (Left)
      ctx.fillRect(-5, path.y1 - r - 5, 15, pipeOuterWidth + 10);
      // Joint Top
      ctx.fillRect(path.splitX - r - 5, path.y1 - r - 5, pipeOuterWidth + 10, 10);
      // Joint Bottom
      ctx.fillRect(path.splitX - r - 5, path.y2 + r - 5, pipeOuterWidth + 10, 10);
      // Output Cap (Right)
      ctx.fillRect(w - 10, path.y2 - r - 5, 15, pipeOuterWidth + 10);

      // Glass Highlights (Internal shine)
      ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.moveTo(0, path.y1 - r + 8);
      ctx.lineTo(path.splitX + r - 8, path.y1 - r + 8);
      ctx.lineTo(path.splitX + r - 8, path.y2 + r - 8);
      ctx.lineTo(w, path.y2 + r - 8);
      ctx.stroke();

      ctx.restore();
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 250;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPipeline();
      particles.forEach(p => {
        p.update(canvas.width);
        p.draw(canvas.width);
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
    <div className="absolute top-[80px] left-0 w-full z-10 pointer-events-none">
      <div className="container mx-auto px-6">
        <canvas
          ref={canvasRef}
          className="w-full opacity-80"
        />
      </div>
    </div>
  );
};
