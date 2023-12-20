// src/BackgroundAnimation.js
import React, { useEffect, useRef } from "react";
import "./BackgroundAnimation.css";

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId;

    // Dot properties
    class Dot {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
      }

      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }

      update() {
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        this.x += this.vx;
        this.y += this.vy;
      }
    }

    // Create dots
    const dots = [];
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      dots.push(new Dot(x, y));
    }

    // Connect dots with lines
    const connectDots = (dots) => {
      for (let i = 0; i < dots.length; i++) {
        for (let j = i; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            context.beginPath();
            context.strokeStyle = "#ffffff";
            context.lineWidth = 0.5;
            context.moveTo(dots[i].x, dots[i].y);
            context.lineTo(dots[j].x, dots[j].y);
            context.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        dot.update();
        dot.draw(context);
      });
      connectDots(dots);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Handle resizing
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // Cleanup function
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="background-animation" />;
};

export default BackgroundAnimation;
