"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Added for navigation
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const router = useRouter(); // ✅ Use router for navigation

  const [user, setUser] = useState({
    name: "Bobby",
    address: "Teas nh, Cambodia",
  });

  const savedAddresses = [
    "Teas nh, Cambodia",
    "Phnom Penh, Cambodia",
    "Siem Reap, Cambodia",
    "Sihanoukville, Cambodia",
  ];

  const [isAddressDropdownOpen, setIsAddressDropdownOpen] = useState(false);

  const cartItems = [
    { id: 1, name: "Sky Blue Starry Hoodie", type: "Hoodie", size: "L", price: 45.85, discountPrice: 38.45, image: "/cart/blue.jpg", quantity: 1 },
    { id: 2, name: "Retro Game Console Long Sleeve", type: "Long Sleeve", size: "L", price: 22, image: "/cart/Game console.jpg", quantity: 1 },
    { id: 3, name: "Black Oversized Hoodie", type: "Hoodie", size: "M", price: 30, image: "/cart/Sharky.jpg", quantity: 1 },
    { id: 4, name: "Creamy Bear Hoodie", type: "Hoodie", size: "XL", price: 55, image: "/cart/creamy.jpg", quantity: 1 },
    { id: 5, name: "White Winter Sweater", type: "Sweater", size: "S", price: 40, image: "/cart/Bob shirt.jpg", quantity: 1 },
    { id: 6, name: "Vintage Denim Jacket", type: "Jacket", size: "L", price: 65, image: "/cart/creamy.jpg", quantity: 1 },
  ];

  const [paymentMethod, setPaymentMethod] = useState("ABA");

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.discountPrice || item.price), 0).toFixed(2);

  // ✅ Function to navigate to confirmation page (nothing else changes)
  const handleCheckout = () => {
    router.push(`/cart/confirmation?name=${user.name}&address=${user.address}&total=${totalAmount}`);
  };

  return (
    <div className="container mx-auto max-w-6xl p-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center uppercase mb-8">Shopping Bag</h1>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side: User Info & Scrollable Items */}
        <div className="space-y-6">
          {/* User Information */}
          <div className="border rounded-lg p-6 shadow-md bg-white">
            <h2 className="font-bold text-lg border-b pb-2 mb-4">General Info:</h2>

            {/* Name & Address Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">NAME</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="border border-gray-400 rounded-md px-3 py-2 w-full"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold mb-1">ADDRESS</label>
                <div
                  className="border border-gray-400 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer w-full"
                  onClick={() => setIsAddressDropdownOpen(!isAddressDropdownOpen)}
                >
                  <span>{user.address}</span>
                  <img src="/cart/down.png" alt="Expand" className="w-4 h-4 opacity-70 hover:opacity-100" />
                </div>

                {/* Address Dropdown */}
                {isAddressDropdownOpen && (
                  <div className="absolute left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1 z-10">
                    {savedAddresses.map((address, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setUser({ ...user, address });
                          setIsAddressDropdownOpen(false);
                        }}
                      >
                        {address}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable Items List */}
          <div className="border rounded-lg p-6 shadow-md bg-white h-96 overflow-y-auto">
            <h2 className="font-bold text-lg border-b pb-2 mb-4">{cartItems.length} ITEMS</h2>

            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex border-b pb-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4 rounded-lg border" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">Type: {item.type}</p>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>

                    {item.discountPrice ? (
                      <p className="text-sm text-red-500 font-bold">
                        <span className="line-through text-gray-500 mr-1">${item.price.toFixed(2)}</span>
                        ${item.discountPrice.toFixed(2)}
                      </p>
                    ) : (
                      <p className="text-sm text-red-500 font-bold">${item.price.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

                {/* Right Side: Order Summary - Updated Layout */}
                <div className="border rounded-lg p-6 shadow-md bg-white relative">
          <h2 className="font-bold text-lg pb-2 mb-4 border-b">ORDER SUMMARY</h2>

          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">PAYMENT METHOD</h3>
            <div className="flex space-x-4">
            <button 
  className={`flex items-center justify-center w-28 h-12 border-2 rounded-md ${paymentMethod === "ABA" ? "border-black bg-gray-100" : "border-gray-300"}`} 
  onClick={() => setPaymentMethod("ABA")}
>
  <img src="/aba.png" alt="ABA Pay" className="w-12 h-8" />
  <span className="ml-2">ABA</span>
</button>

<button 
  className={`flex items-center justify-center w-40 h-12 border-2 rounded-md ${paymentMethod === "CARD" ? "border-black bg-gray-100" : "border-gray-300"}`} 
  onClick={() => setPaymentMethod("CARD")}
>
  <img src="/visa.png" alt="VISA" className="w-12 h-8" />
  <img src="/mastercard.png" alt="MASTERCARD" className="w-12 h-8" />
  <span className="ml-2">CARD</span>
</button>

            </div>
          </div>

          {/* Pricing Summary - Updated to Match Reference */}
          <div className="pt-16 text-lg space-y-24">
            <p className="flex justify-between text-gray-500"><span>Merchandise:</span> <span>${cartItems.reduce((acc, item) => acc + (item.discountPrice || item.price), 0).toFixed(2)}</span></p>
            <p className="flex justify-between text-gray-500"><span>Delivery:</span> <span>FREE</span></p>
          </div>

          <div className="border-t pt-20 mt-4 text-xl font-bold flex justify-between">
            <span>ORDER TOTAL:</span>
            <span>${cartItems.reduce((acc, item) => acc + (item.discountPrice || item.price), 0).toFixed(2)}</span>
          </div>

          {/* ✅ Checkout Button (No Other Changes) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-4 py-4 bg-black text-white text-lg font-semibold rounded-lg"
            onClick={handleCheckout} // 🚀 Calls function to navigate
          >
            PROCEED TO CHECKOUT
          </motion.button>
        </div>
      </div>
    </div>
  );
}
