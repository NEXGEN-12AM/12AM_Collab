import Head from "next/head";
import Navbar from "./NavBar/Navbar";
import HeroSection from "./Hero/Hero";
import Collection from "@/components/Collection/Collection";
import Item from "@/components/Items/items";
import LoginPage from "./login/page";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>12AM | Home</title>
        <meta name="description" content="Welcome to 12AM" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {/* Main Layout Wrapper */}
      <main className="relative w-full flex flex-col items-center">
  
  {/* Remove Default Spacing */}
  <div className="w-full">
    <HeroSection />
  </div>

  {/* Content Wrapper with Proper Spacing */}
  <div className="container mx-auto px-4">
    <Collection />
    <Item />
  </div>

        
      </main>
    </>
  );
}
