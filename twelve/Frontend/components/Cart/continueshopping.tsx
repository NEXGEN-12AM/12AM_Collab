"use client"; // Ensure Next.js Client Component

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ContinueShoppingButton = () => {
  const router = useRouter(); // ✅ Router for navigation

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push("/")} // ✅ Navigates to Home Page
      className="px-8 py-3 border border-gray-600 text-gray-800 text-lg rounded-lg hover:bg-gray-200 transition"
    >
      CONTINUE SHOPPING
    </motion.button>
  );
};

export default ContinueShoppingButton;
