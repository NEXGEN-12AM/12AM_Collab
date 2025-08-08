"use client"; // Ensure this is at the top

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cart from "@/components/Cart/CartItem"; // Ensure correct path

export default function CartPage() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 1000); // Animation lasts 1.2s

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Animation Effect */}
      <AnimatePresence>
        {showAnimation && (
          <>
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-full bg-black z-50"
            />
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "100%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }}
              className="absolute top-0 left-0 w-full h-full bg-white z-40"
            />
          </>
        )}
      </AnimatePresence>

      {/* Cart Page Content */}
      {!showAnimation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto p-6"
        >
          <Cart />
        </motion.div>
      )}
    </div>
  );
}
