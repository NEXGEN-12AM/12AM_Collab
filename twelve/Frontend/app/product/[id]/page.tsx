"use client";
import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/app/NavBar/Navbar";
import Head from "next/head";


const products = [
  { id: 1, images: ["/shop/detail1.png", "/shop/backss1.png"], name: "Mercury Long Sleeve Sweatshirt", price: "14.99$", stock: 10, type: "Sweatshirt" },
  { id: 2, images: ["/shop/front2.png", "/shop/back2.png"], name: "Black Hoodie", price: "19.99$", stock: 8, type: "Hoodie" },
  { id: 3, images: ["/shop/front3.png", "/shop/back3.png"], name: "Gray Oversized Sweatshirt", price: "24.99$", stock: 5, type: "Sweatshirt" },
  { id: 4, images: ["/shop/front4.png", "/shop/back4.png"], name: "Streetwear Hoodie", price: "29.99$", stock: 3, type: "Hoodie" },
  { id: 5, images: ["/shop/front5.png", "/shop/back5.png"], name: "Minimalist Sweatshirt", price: "34.99$", stock: 7, type: "Sweatshirt" },
];

const ProductPage = () => {

  const { id } = useParams();
  const router = useRouter();
  const product = products.find((p) => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [imageIndex, setImageIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleSlide = (direction: "left" | "right") => {
    if (direction === "left") {
      setSlideIndex((prev) => (prev === 0 ? products.length - 4 : prev - 1));
    } else {
      setSlideIndex((prev) => (prev === products.length - 4 ? 0 : prev + 1));
    }
  };

  if (!product) {
    return (
      <div className="text-center text-2xl font-bold">
        Product Not Found. <br />
        <button
          onClick={() => router.push("/shop")}
          className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this product: ${product.name} for just ${product.price}!`,
          url: window.location.href,
        });
        console.log("Page shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    
    <>
    <Head>
  <title>{product?.name || "Product"} | 12AM</title>
  <meta property="og:title" content={product?.name} />
  <meta property="og:description" content={`Buy ${product?.name} for just ${product?.price}`} />
  <meta property="og:image" content={product?.images[0]} />
</Head>
      {/* Navbar */}
      <Navbar />

      {/* Product Page Content */}
      <div className="container mx-auto px-6 py-10 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Side - Product Image with Toggle */}
          <div className="relative flex flex-col items-center bg-gray-100 pt-6 pr-5 rounded-lg shadow-md max-w-[460px] mx-auto">
            {/* Small Preview Images at the Top */}
            <div className="absolute left-[-110px] top-1/4 transform -translate-y-1/2 flex flex-col space-y-4 ">
              <button 
                onClick={() => setImageIndex(0)} 
                className={`border-2 rounded-md p-1 ${imageIndex === 0 ? "border-black" : "border-gray-300"}`}
              >
                <Image src={product.images[0]} alt="Front View" width={80} height={80} className="rounded-md" />
              </button>
              <button 
                onClick={() => setImageIndex(1)} 
                className={`border-2 rounded-md p-1 ${imageIndex === 1 ? "border-black" : "border-gray-300"}`}
              >
                <Image src={product.images[1]} alt="Back View" width={80} height={80} className="rounded-md" />
              </button>
            </div>

            {/* Main Product Image with Hover Zoom */}
            <div
              className="relative"
              ref={imageRef}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={(e) => {
                if (!imageRef.current) return;
                const { left, top, width, height } = imageRef.current.getBoundingClientRect();
                const x = ((e.clientX - left) / width) * 100;
                const y = ((e.clientY - top) / height) * 100;
                setZoomPosition({ x, y });
              }}
            >
              <Image src={product.images[imageIndex]} alt={product.name} width={380} height={450} className="rounded-lg" />

              {/* Zoom Effect */}
              {isZoomed && (
                <div
                  className="absolute w-48 h-48 border-2 border-gray-400 shadow-lg bg-white pointer-events-none"
                  style={{
                    top: `${zoomPosition.y}%`,
                    left: `${zoomPosition.x}%`,
                    transform: "translate(-50%, -50%)",
                    backgroundImage: `url(${product.images[imageIndex]})`,
                    backgroundSize: "500%",
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              )}
            </div>

            {/* Toggle Buttons - Front & Back */}
            <div className="absolute bottom-4 right-2 flex space-x-2">
              <button
                onClick={() => setImageIndex(0)}
                className={`px-4 py-1 border-2 rounded-md font-semibold transition ${
                  imageIndex === 0 ? "bg-black text-white" : "bg-white text-black border-black"
                }`}
              >
                FRONT
              </button>
              <button
                onClick={() => setImageIndex(1)}
                className={`px-4 py-1 border-2 rounded-md font-semibold transition ${
                  imageIndex === 1 ? "bg-black text-white" : "bg-white text-black border-black"
                }`}
              >
                BACK
              </button>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="flex flex-col font-kano">
  {/* Product Title + Icons */}
  <div className="flex items-center justify-between">
    <h1 className="text-4xl font-kano">{product.name}</h1>
    
    {/* Icons (Bookmark & Share) */}
    <div className="flex space-x-4">
    <button onClick={toggleBookmark}>
  <Image
    src={isBookmarked ? "/icon/mark.png" : "/icon/mark1.png"} // Change image on click
    alt="Bookmark"
    width={24}
    height={24}
  />
</button>
<button onClick={handleShare}>
  <Image
    src="/icon/share.png" // Replace with your share icon
    alt="Share"
    width={28}
    height={24}
  />
</button>
    </div>
  </div>

  {/* Line Under Name */}
  <hr className="w-full border-t border-gray-300 mt-2 mb-4" />

  <p className="text-3xl font-semibold text-gray-700">{product.price}</p>
  <p className="text-xl text-gray-500 mt-2">Type: {product.type}</p>
  <p className="text-xl text-gray-500">Stock: {product.stock} Left</p>

            {/* Size Selection */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">SIZE:</h3>
              <div className="flex space-x-4 mt-2">
                {["S", "M", "L"].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`w-14 h-10 flex items-center justify-center text-sm font-bold border-2 rounded-full transition ${
                      selectedSize === size ? "bg-black text-white" : "border-black text-black bg-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">QTY:</h3>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-4 py-2 bg-gray-300 rounded-md text-xl font-bold hover:bg-gray-400 transition"
                >
                  -
                </button>
                <span className="text-xl font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(prev => Math.min(prev + 1, product.stock))}
                  className="px-4 py-2 bg-gray-300 rounded-md text-xl font-bold hover:bg-gray-400 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-10 flex space-x-4">
              <button className="px-6 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition">
                BUY
              </button>
              <button className="px-6 py-3 bg-gray-800 text-white text-lg rounded-md hover:bg-gray-900 transition">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
        <div className="mt-16 relative">
          <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
          <div className="overflow-hidden relative">
            <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${slideIndex * 25}%)` }}>
              {products.slice(0, 6).map((item) => (
                <div key={item.id} className="w-1/4 p-4 flex-shrink-0">
                  <div className="border rounded-lg p-4 shadow-md">
                    <Image src={item.images[0]} alt={item.name} width={200} height={250} className="rounded-md" />
                    <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                    <p className="text-gray-600">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
  onClick={() => handleSlide("left")} 
  className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 p-3 bg-white border border-black rounded-full">
  <Image src="/icon/left.png" alt="Left" width={18} height={18} />
</button>

<button 
  onClick={() => handleSlide("right")} 
  className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 p-3 bg-white border border-black rounded-full">
  <Image src="/icon/right.png" alt="Right" width={18} height={18} />
</button>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
