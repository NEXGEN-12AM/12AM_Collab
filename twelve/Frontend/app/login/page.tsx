"use client"; // ✅ Ensure this runs on the client-side

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  // ✅ State for User Inputs
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  // ✅ State for Error Message
  const [error, setError] = useState("");

  // ✅ Dummy User Database (Replace with API Call)
  const users = [
    { email: "test@example.com", password: "password123" },
    { email: "admin@12am.com", password: "adminpass" },
  ];

  // ✅ Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  // ✅ Handle Manual Login Submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user exists in "database"
    const user = users.find(
      (u) => u.email === userInput.email && u.password === userInput.password
    );

    if (user) {
      // ✅ Store login session
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect to Dashboard
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Section - Black Background */}
      <div className="hidden md:flex w-2/5 bg-black text-white flex-col justify-center items-center relative">
        <div className="text-center">
          <h1 className="text-[240px] font-Humane font-bold">12</h1>
          <img src="/Login/twelve.png" alt="Twelve Twelve" className="w-[800px] max-w-[600px]" />
          <h1 className="text-[230px] font-Humane mt-2 rotate-180">AM</h1>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-3/5 flex flex-col justify-center items-center px-12">
        <img src="/Login/Logo.png" alt="12AM Logo" className="w-[180px] md:w-[200px] lg:w-[220px] mb-8" />

        <h3 className="text-lg font-normal font-bronx mb-4 tracking-wider">
          {session ? `Welcome, ${session.user?.name}!` : "SIGN IN WITH YOUR ACCOUNT"}
        </h3>

        {/* If User is Logged In, Show Profile & Sign Out */}
        {session ? (
          <div className="flex flex-col items-center">
            <Image src={session.user?.image || "/profile.png"} alt="Profile" width={80} height={80} className="rounded-full" />
            <button
              onClick={() => signOut()}
              className="w-1/2 max-w-lg py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition mt-4"
            >
              SIGN OUT
            </button>
          </div>
        ) : (
          <>
            {/* Error Message */}
            {error && <p className="text-red-500 mb-3">{error}</p>}

            {/* Login Form */}
            <form className="w-full max-w-lg" onSubmit={handleLogin}>
              <input
                type="text"
                name="email"
                value={userInput.email}
                onChange={handleChange}
                placeholder="Phone number, username, or email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-3"
              />
              <input
                type="password"
                name="password"
                value={userInput.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-8"
              />
              <button
                type="submit"
                className="w-full py-3 bg-white border-2 border-black text-black font-semibold rounded-full hover:bg-black hover:text-white transition"
              >
                LOGIN
              </button>
            </form>

            <p className="text-gray-500 text-sm mt-2 cursor-pointer">Forgot password?</p>

            {/* OR Divider */}
            <div className="flex items-center my-6 w-full max-w-lg">
              <div className="flex-grow border-t border-black"></div>
              <span className="px-3 font-bronx text-black">or</span>
              <div className="flex-grow border-t border-black"></div>
            </div>

            {/* Social Login Buttons */}
            <button
              onClick={() => signIn("google")} // ✅ Google Sign-In Function
              className="w-full max-w-md flex items-center justify-center gap-3 py-2 border-2 border-black rounded-lg shadow-md bg-white text-black font-semibold font-kano hover:bg-black hover:text-white transition-all mb-4"
            >
              <img src="/Login/google1.png" alt="Google" className="w-10 h-10" />
              <span>Continue with Google</span>
            </button>

            <button className="w-full max-w-md flex items-center justify-center gap-3 py-3 border-2 border-black rounded-lg shadow-md bg-white text-black font-semibold font-kano hover:bg-black hover:text-white transition-all">
              <img src="/Login/Facebook.png" alt="Facebook" className="w-8 h-8" />
              <span>Continue with Facebook</span>
            </button>

            {/* Sign Up Link */}
            <p className="text-gray-500 text-sm mt-5">
              Don’t have an account? <span className="text-blue-600 cursor-pointer">Sign up</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
