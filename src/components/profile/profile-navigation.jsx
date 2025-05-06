import React from "react";
import {
    Bell,
    ChevronRight,
    CreditCard,
    LogOut,
    Package,
    Settings,
    User,
  } from "lucide-react";
  import Link from "next/link";
export default function ProfileNavigation() {
  return (
    <>
      <nav className="space-y-1 text-left">
                  <Link
                    href="#"
                    className="flex items-center px-3 py-2 text-sm font-medium text-orange-600 rounded-md bg-orange-50"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profil Saya
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    <Package className="w-4 h-4 mr-3" />
                    Pesanan Saya
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    <CreditCard className="w-4 h-4 mr-3" />
                    Pembayaran
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    <Bell className="w-4 h-4 mr-3" />
                    Notifikasi
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Pengaturan
                  </Link>
                </nav>

    </>
  );
}
