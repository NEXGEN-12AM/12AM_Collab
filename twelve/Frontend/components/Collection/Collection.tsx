"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  { id: 1, image: "/shop/card1.png", price: "14.99$" },
  { id: 2, image: "/shop/card1.png", price: "19.99$" },
  { id: 3, image: "/shop/card1.png", price: "24.99$" },
  { id: 4, image: "/shop/card1.png", price: "29.99$" },
  { id: 5, image: "/shop/card1.png", price: "34.99$" },
];

const Collection: React.FC = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<{ [key: number]: string }>({});
  const [bookmarked, setBookmarked] = useState<{ [key: number]: boolean }>({});
  const [cart, setCart] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  return (
    <div className="main-container w-full min-h-screen flex flex-col items-center justify-center relative">
      <h2 className="text-center font-humane text-[48px] md:text-[72px] lg:text-[86px] font-normal text-black tracking-[3.31px] my-3">
        NEW ARRIVAL
      </h2>

      <div className="relative w-full flex items-center justify-center">
        {/* Left Button */}
        <button 
          onClick={handlePrev} 
          className="absolute left-10 z-20 p-3 bg-white border border-black rounded-[20] shadow-md hover:bg-gray-100 transition"
        >
          <Image src="/icon/left.png" alt="Left" width={18} height={24} />
        </button>

        {/* Product Display */}
        <div className="relative w-full max-w-lg h-[420px] flex items-center justify-center mt-10 perspective-1000">
          <AnimatePresence>
            {products.map((product, index) => {
              const position = (index - selectedIndex + products.length) % products.length;
              let scale = 1, zIndex = 1, opacity = 0, xOffset = 0, rotation = 0, showButtons = false;

              if (position === 0) {
                scale = 1.1; zIndex = 10; opacity = 1; rotation = 0; showButtons = true;
              } else if (position === 1) {
                scale = 0.85; zIndex = 6; opacity = 0.6; xOffset = -220; rotation = -5; showButtons = true;
              } else if (position === 2) {
                scale = 0.85; zIndex = 6; opacity = 0.6; xOffset = 220; rotation = 5; showButtons = true;
              }

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                  animate={{ opacity, scale, x: xOffset, zIndex, rotateY: rotation }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                  transition={{ duration: 0.8, ease: "easeInOut", bounce: 0.3 }}
                  className="absolute flex flex-col items-center cursor-pointer"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  <div className="relative">
                    <Image src={product.image} alt="Product Image" width={320} height={380} className="rounded-lg" />

                    {/* Price Tag */}
                    <div className="absolute top-3 right-3 bg-black text-white px-3 py-1 text-lg font-bold rounded">
                      {product.price}
                    </div>

                    {/* Size Selection */}
                    {showButtons && (
                      <div className="absolute bottom-[75px] left-[20px] flex space-x-2">
                        {["S", "M", "L"].map((size) => (
                          <button
                            key={size}
                            onClick={(e) => { e.stopPropagation(); setSelectedSize((prev) => ({ ...prev, [product.id]: size })); }}
                            className={`w-12 h-10 flex items-center justify-center text-sm font-bold border-2 rounded-full transition ${
                              selectedSize[product.id] === size ? "bg-black text-white" : "border-black text-black bg-white"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Bookmark Button */}
                    {showButtons && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setBookmarked((prev) => ({ ...prev, [product.id]: !prev[product.id] })); }}
                        className="absolute bottom-[26px] left-[41px] w-6 h-6 flex items-center justify-center transition"
                      >
                        <Image src={bookmarked[product.id] ? "/icon/mark.png" : "/icon/mark1.png"} alt="Bookmark" width={35} height={35} />
                      </button>
                    )}

                    {/* Cart Button */}
                    {showButtons && (
                      <motion.button
                        onClick={(e) => { e.stopPropagation(); setCart((prevCart) => [...prevCart, product.id]); }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
                        className="absolute bottom-1 right-3 px-6 py-4 bg-green-500 text-white text-sm font-bold rounded-full transition hover:bg-green-700 flex items-center justify-center"
                      >
                        <Image src="/icon/cart1.png" alt="Cart" width={22} height={22} />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right Button */}
        <button 
          onClick={handleNext} 
          className="absolute right-10 z-20 p-3 bg-white border border-black rounded-[20] shadow-md hover:bg-gray-100 transition"
        >
          <Image src="/icon/right.png" alt="Right" width={18} height={24} />
        </button>
      </div>
    </div>
  );
};

export default Collection;
