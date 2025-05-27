"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { AlignJustify } from "lucide-react";
import { Button } from "../button";
import { Label } from "../label";
import { X } from "lucide-react";
import { Input } from "../input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../separator";
const Navbar = () => {
  const { token, loading } = useAuth();

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
                href="/"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/lelang"
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
                href="/contact"
                className="text-sm font-medium hover:text-orange-500 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {/* {token ? (
              <>
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:text-orange-500 transition-colors"
                  >
                    Profile
                  </Button>
                </Link>
              </>
            ) : (
              <>
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
              </>
            )} */}
            <Link href="/profile" className="hidden md:block">
              <Button
                variant="ghost"
                className="text-sm font-medium hover:text-orange-500 transition-colors cursor-pointer"
              >
                Profile
              </Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden">
                  <AlignJustify size={24} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="p-8 w-full h-full max-w-none bg-white"
              >
                <SheetHeader className="flex justify-between items-center mb-8">
                  <SheetTitle className="text-orange-500 text-3xl font-semibold">
                    Tawarin.com
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-6 text-xl font-medium">
                  <SheetClose asChild>
                    <Link href="/" className="hover:text-orange-500">
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link className="hover:text-orange-500" href="/lelang">
                      Auctions
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link className="hover:text-orange-500" href="#">
                      Categories
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link className="hover:text-orange-500" href="/profile">
                      Profiles
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link href="/contact">Contact</Link>
                  </SheetClose>
                </nav>

                {/* Auth Links */}
                {/* {!loading && (
                  <div className="mt-auto pt-8 border-t border-gray-200 flex flex-col gap-4">
                    {token ? (
                      <SheetClose asChild>
                        <Link href="/profile">
                          <a className="text-lg font-semibold text-orange-500 hover:underline">
                            Profile
                          </a>
                        </Link>
                      </SheetClose>
                    ) : (
                      <>
                        <SheetClose asChild>
                          <Link href="/login">
                            <a className="text-lg hover:text-orange-500">
                              Sign In
                            </a>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link href="/register">
                            <a className="text-lg font-semibold bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-center">
                              Register
                            </a>
                          </Link>
                        </SheetClose>
                      </>
                    )}
                  </div>
                )} */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
