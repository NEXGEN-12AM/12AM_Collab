"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Particles = () => {
  const particlesRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    particlesRef.current.forEach((particle, index) => {
      if (!particle) return;

      gsap.to(particle, {
        x: `random(-50, 50)`, // Small left-right movement
        y: `random(-50, 50)`, // Small up-down movement
        scale: `random(0.8, 1.2)`, // Slight size variation
        opacity: `random(0.3, 0.8)`, // Random opacity
        duration: 6 + Math.random() * 4, // Smooth slow movement (6-10s)
        repeat: -1, // Infinite loop
        yoyo: true, // Moves back and forth
        ease: "sine.inOut", // Smooth easing
        delay: Math.random() * 3, // Staggered start
      });
    });
  }, []);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className="absolute bg-black rounded-full"
          style={{
            width: `${Math.random() * 6 + 3}px`, // Random size (3-9px)
            height: `${Math.random() * 6 + 3}px`,
            left: `${Math.random() * 100}vw`, // Random X position
            top: `${Math.random() * 100}vh`, // Random Y position
            opacity: 0.5, // Semi-transparent
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
