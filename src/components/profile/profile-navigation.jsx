"use client";
import React from "react";
import { Bell, CreditCard, Settings, User, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ProfileNavigation() {
  const currentUrl = usePathname();

  const isActive = (href) => {
    if (href === "/profile") {
      return currentUrl === "/profile" || currentUrl === "/profile/";
    }
    return currentUrl === href;
  };

  const NavLink = ({ href, Icon, children }) => {
    const active = isActive(href);

    return (
      <Link
        href={href}
        className={
          "flex items-center px-3 py-2 text-sm font-medium rounded-md " +
          (active
            ? "text-orange-600 bg-orange-50"
            : "text-gray-700 hover:bg-gray-50")
        }
      >
        <Icon className="w-4 h-4 mr-3" />
        {children}
      </Link>
    );
  };

  return (
    <nav className="space-y-1 text-left">
      <NavLink href="/profile" Icon={User}>
        Profile
      </NavLink>
      <NavLink href="/profile/contacts" Icon={Mail}>
        Contact Mail
      </NavLink>
      <NavLink href="/profile/bids" Icon={Bell}>
        My Offers
      </NavLink>

      <NavLink href="/profile/auctions" Icon={CreditCard}>
        My Auctions
      </NavLink>

      <NavLink href="/profile/settings" Icon={Settings}>
        Settings
      </NavLink>
    </nav>
  );
}
