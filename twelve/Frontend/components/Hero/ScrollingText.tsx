"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const ScrollingText = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        x: "-100%", // Moves left completely
        duration: 15, // Adjust speed (Higher = Slower)
        ease: "linear",
        repeat: -1, // Infinite loop
        modifiers: {
          x: (x) => `${parseFloat(x) % 100}%`, // Ensures seamless looping
        },
      });
    }
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-black">
      <div ref={textRef} className="relative flex w-max whitespace-nowrap">
        <Image
          src="/twelve1.png"
          alt="Twelve Twelve Twelve"
          width={1920}
          height={80}
          className="relative"
        />
        {/* Duplicate Image for Seamless Loop */}
        <Image
          src="/twelve1.png"
          alt="Twelve Twelve Twelve"
          width={1920}
          height={80}
          className="relative"
        />
        <Image
          src="/twelve1.png"
          alt="Twelve Twelve Twelve"
          width={1920}
          height={80}
          className="relative"
        />
      </div>
    </div>
  );
};

export default ScrollingText;
