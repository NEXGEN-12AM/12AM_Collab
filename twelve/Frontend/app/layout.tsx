"use client"; // ✅ Keep this for usePathname()

import './globals.css';
import Footer from '../components/Footer/Footer';
import Navbar from '../app/NavBar/Navbar';
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ✅ Hide Navbar on Login Page
  const showNavbar = pathname !== "/login";

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SessionProvider>  {/* ✅ Wrap everything inside SessionProvider */}
          {showNavbar && <Navbar />}
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
