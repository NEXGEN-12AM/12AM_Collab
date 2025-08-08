"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; 

export default function Nav() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState(null); // Change to user object if logged in

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <div className="main-container fixed top-0 left-0 w-full h-[56px] z-[50]">
      {/* Black Section */}
      <div className="absolute top-0 left-0 w-full h-[30px] bg-black"></div>
      <div className="main-container w-[185.045px] h-[82.995px] bg-[url(https://static.codia.ai/image/2025-03-03/e0db1a94-9580-4d4c-a132-15357d2be074.svg)] bg-cover bg-no-repeat relative mx-auto my-[-14]">
        {/* Transparent Section */}
        <div className="absolute top-0 left-0 w-full h-[20px] bg-transparent"></div>
      </div>

      {/* Left Menu Icon (Opens Sidebar) */}
      <div 
        className="w-[56px] h-[56px] bg-[#000] rounded-[38.22px] absolute top-[3px] left-[16px] flex justify-center items-center z-[9] cursor-pointer"
        onClick={() => setIsMenuOpen(true)}
      >
        <img 
          src="/menu.png" 
          alt="Menu Icon" 
          className="w-[32px] h-[32px] object-cover relative z-10"
        />
      </div>

      {/* Right Profile Icon */}
      <div className="w-[56px] h-[56px] absolute top-[4px] right-[16px] z-[11] flex justify-center items-center">
        <img
          src="/profile.png"
          alt="Profile Icon"
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setIsProfileOpen(true)}
        />
      </div>


      {/* Center Logo */}
      <Image 
        src="/logo.png"
        alt="12AM Logo"
        width={120} 
        height={40} 
        className="absolute left-1/2 transform -translate-x-1/2 top-[5px] ml-1 z-[12]"
      />
    {/* Profile Popup */}
    {isProfileOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
          <div 
            className="w-[460px] h-[300px] bg-cover bg-center shadow-lg rounded-lg p-6 relative flex flex-col"
            style={{ backgroundImage: "url('/icon/pfcard.png')" }}
            ref={profileRef}
          >
            {/* Close Button */}
            <div className="absolute top-2 right-4">
              <button onClick={() => setIsProfileOpen(false)} className="text-white text-2xl">&times;</button>
            </div>

            {/* If user has an account, show profile details */}
            {user ? (
              <div className="flex flex-col items-center">
                <div className="border-2 border-gray-500 p-1 rounded-lg">
                  <Image src="/profile-image.png" alt="Profile" width={100} height={120} className="rounded-md" />
                </div>
                <div className="mt-4 text-black text-lg font-bold">
                  <p>NAME: <span className="font-normal">AH BEK</span></p>
                  <p>TELE: <span className="font-normal">012 333 444</span></p>
                  <p>GENDER: <span className="font-normal">MALE</span></p>
                </div>

                {/* Buttons */}
                <div className="flex justify-center pt-6 space-x-6">
                  <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                    EDIT
                  </button>
                  <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    LOG OUT
                  </button>
                </div>
              </div>
            ) : (
              /* If user is not logged in, show sign-in options */
              <div className="flex flex-col items-center text-black mt-12">
                <h2 className="text-2xl font-bold">Welcome!</h2>
                <p className="mt-2 text-lg">Sign in to your account</p>

                {/* Buttons */}
                <div className="mt-6 flex space-x-4">
                  <Link href="/login">
                    <button className="px-6 py-2 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700 transition">
                      SIGN IN
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="px-6 py-2 bg-gray-800 text-white text-lg rounded-md hover:bg-gray-900 transition">
                      REGISTER
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Burger Menu (Sidebar) */}
      <div ref={menuRef} className={`fixed top-0 left-0 h-full w-[260px] bg-black text-white transition-transform transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} z-[100] shadow-lg`}>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-normal tracking-[2px] ">TE HENGLAY</h2>
            <button onClick={() => setIsMenuOpen(false)} className="text-white text-2xl">&times;</button>
          </div>
          <p className="text-xl text-gray-400">010328281</p>
        </div>
        <hr className="border-gray-700" />

        <div className="p-6 font-kano">
          <h3 className="text-md font-kano font-bold mb-10">MY ACCOUNT</h3>
          <ul className="space-y-10">
  {[
    { name: "ADDRESS", href: "/address" },
    { name: "YOUR ORDER", href: "/orders" },
    { name: "WISH LIST", href: "/wishlist" },
    { name: "HISTORY", href: "/history" },
  ].map((item, index) => (
    <li key={index} className="relative group">
      <Link 
        href={item.href} 
        className="block hover:text-gray-300 text-lg font-bold tracking-widest relative overflow-hidden"
      >
        {item.name}

        {/* Glitch Effect */}
        <span className="absolute top-0 left-0 w-full h-full text-gray-300 opacity-0 group-hover:opacity-100 group-hover:animate-glitch">
          {item.name}
        </span>
      </Link>
    </li>
  ))}
</ul>
        </div>

        <hr className="border-gray-700" />

        <div className="p-6">
          <h3 className="text-md font-bold mb-4">SETTING</h3>
          <button className="w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700">
            LOGOUT
          </button>
          
        </div>
        <div className="mt-16 flex justify-center">
    <Image 
      src="/twelve11.png"  // ✅ Change this to your actual image path
      alt="Additional Image"
      width={150}  // ✅ Adjust size as needed
      height={100} 
      className="rounded-md"
    />
  </div>
      </div>

      {/* Navigation Container */}
      <div className="font-bronx w-full h-[40px] flex justify-center items-center absolute top-7 left-0">
        <div className="w-full max-w-6xl flex justify-between items-center px-4">
          
          {/* Left Links */}
          <div className="flex space-x-32">
            <Link href="/" passHref>
              <span className="text-[22.75px] font-normal text-black cursor-pointer relative group">
                HOME
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
            <Link href="/" passHref>
              <span className="text-[22.75px] font-normal text-black cursor-pointer relative group">
                SHOP
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          </div>
          
          {/* Right Links */}
          <div className="flex space-x-32">
            <span className="text-[22.75px] font-normal text-black cursor-pointer relative group">
              CONTACT
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </span>

            <Link href="/cart">
              <span className="text-[22.75px] font-normal text-black cursor-pointer relative group">
                CART
                <span className="absolute bottom-0 left-0 w-0 h-0.5 mt-4 bg-black transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
