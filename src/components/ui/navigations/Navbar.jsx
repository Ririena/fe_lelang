import React from "react";
import Link from "next/link";
import { Button } from "../button";
const Navbar = () => {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto px-4  flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="font-bold text-2xl text-orange-500">Tawarin</div>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="#"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Auctions
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Categories
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="#"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/register">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Register
            </Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
