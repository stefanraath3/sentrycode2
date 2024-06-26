import React, { useEffect, useRef } from "react";
import "./BackgroundAnimation.css";

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const devicePixelRatio = window.devicePixelRatio || 1; // Get the device pixel ratio
    const dotDensity = 0.00007; // Adjust this value as needed
    const dots = [];
    const resizeCanvas = () => {
      // Adjust the canvas size for the device pixel ratio
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.scale(devicePixelRatio, devicePixelRatio); // Scale the context to ensure crisp lines
      populateDots();
    };

    class Dot {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2;
        this.vx = Math.random() - 0.5;
        this.vy = Math.random() - 0.5;
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

    const populateDots = () => {
      const numberOfDots = Math.floor(
        dotDensity * canvas.width * canvas.height
      );
      dots.length = 0; // Clear existing dots
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const exclusionRadius = 300; // Radius around the center where no dots should be placed
      for (let i = 0; i < numberOfDots; i++) {
        let x, y, distance;
        do {
          x = Math.random() * canvas.width;
          y = Math.random() * canvas.height;
          distance = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
          );
        } while (distance < exclusionRadius);
        dots.push(new Dot(x, y));
      }
    };

    const connectDots = () => {
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

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        dot.update();
        dot.draw(context);
      });
      connectDots();
      requestAnimationFrame(animate);
    };

    // Initialize canvas and dots
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="background-animation" />;
};

export default BackgroundAnimation;
