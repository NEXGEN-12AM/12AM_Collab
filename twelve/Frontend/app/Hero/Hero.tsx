"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Sparkle from "@/components/sparkle";
import ScrollingText from "@/components/Hero/ScrollingText";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation (TWELVE AM)
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power2.out" }
      );
  
      // Button animation
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.5)", delay: 0.5 }
      );
  
      // Model image animation
      gsap.fromTo(
        modelRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 0.8 }
      );
  
      // Scroll-trigger animation for Hero Section
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    });
  
    return () => ctx.revert(); // Cleanup GSAP animations on unmount
  }, []);

  return (
    <div ref={heroRef} className="relative w-full min-h-screen flex flex-col justify-between">
      
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Image
          src="/wall.png"
          alt="Background"
          layout="fill"
          style={{ objectFit: "cover" }} 
          quality={100}
          priority
        />
      </div>
      <Sparkle/>
      {/* Hero Content */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 pt-6 lg:pt-32">
        
        {/* Left Side - Text Content */}
        <div ref={textRef} className="text-left w-full lg:w-1/2 mt-[-40px]">
  <div className="flex items-center space-x-4">
    <h1 className="text-[clamp(120px,20vw,480px)] font-humane leading-none ml-0 sm:ml-4">
      TWELVE
    </h1>
    <span 
      className="text-[clamp(120px,20vw,480px)] font-humane leading-none text-white"
      style={{
        WebkitTextStroke: "4px black",
        textShadow: "-4px -4px 0 black, 4px -4px 0 black, -4px 4px 0 black, 4px 4px 0 black",
      }}
    >
      AM
    </span>
  </div>
          <p className="text-[clamp(14px,2vw,24px)] font-medium mt-[-4] ml-4 sm:ml-12 leading-tight">
            TWELVE AM WHERE, TODAY MEET TOMORROW <br /> 
            <span className="font-bold">15% ON EVERY ITEM</span>
          </p>

          {/* Shop Now Button with GSAP Animation */}
          <motion.button
            ref={buttonRef}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 mb-12 px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-2xl font-bronx text-white rounded-full transition bg-cover bg-center text-right pr-6 sm:pr-8 transform duration-300 ease-in-out hover:scale-105"
            style={{
              backgroundImage: "url('/Button.png')",
              minWidth: "230px",
              minHeight: "80px",
            }}
          >
            SHOP NOW
          </motion.button>
        </div>

        {/* Right Side - Model Image with GSAP */}
        <div 
  ref={modelRef} 
  className="relative w-full flex justify-center lg:justify-end mt-0 lg:mt-4"
>
  <Image
    src="/hero.png" 
    alt="12AM Model"
    width={700} // Default width for large screens
    height={900} // Default height for large screens
    layout="intrinsic"
    className="drop-shadow-lg max-w-[90%] md:max-w-[60%] lg:max-w-[45%] xl:max-w-[40%] 2xl:max-w-[35%] h-auto"
  />
</div>

      </div>
      <ScrollingText/>
      </div>
    
  );
};

export default Hero;
