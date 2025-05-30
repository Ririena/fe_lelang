"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

const PageLelang = () => {
  const [lelangData, setLelangData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortFilter, setSortFilter] = useState("default");
  const [categoriesData, setCategoriesData] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { token, loading } = useAuth();

  async function init() {
    try {
      const res = await axios.get("http://localhost:3001/auctions", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res.data);
      if (!loading) {
        setLelangData(res.data.data);
      }
    } catch (error) {
      console.error("Gagal memuat data:", error.message);
      setLelangData([]);
    }
  }

  async function getCategory() {
    try {
      const res = await axios.get("http://localhost:3001/v2/categories", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.table(res.data);
      console.log(res.data);
      setCategoriesData(res.data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error.message);
    }
  }

  useEffect(() => {
    if (!loading) {
      init();
      getCategory();
    }
  }, [loading]);

  const filteredData = lelangData
    .filter((item) => {
      const matchesSearch = item.nama_barang
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        !selectedCategory ||
        item.id_kategori === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortFilter) {
        case "price-low":
          return a.harga_akhir - b.harga_akhir;
        case "price-high":
          return b.harga_akhir - a.harga_akhir;
        case "most-bids":
          return b.jumlah_penawaran - a.jumlah_penawaran;
        case "least-bids":
          return a.jumlah_penawaran - b.jumlah_penawaran;
        case "default":
        default:
          return (
            new Date(b.tanggal_post || 0).getTime() -
            new Date(a.tanggal_post || 0).getTime()
          );
      }
    });

  return (
    <>
      <main className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          {/* Categories Sidebar */}

               <div className="block md:hidden">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Cari Barang Lelang"
                    className="pl-8"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>

          <div className="hidden md:block border rounded-md p-4">
            <h3 className="font-bold mb-3">Kategori</h3>
            <ul className="space-y-2">
              <li
                className={`cursor-pointer text-sm ${
                  selectedCategory === null ? "font-semibold" : ""
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                Semua Kategori
              </li>
              {categoriesData.map((category) => (
                <li
                  key={category.id_kategori}
                  className={`cursor-pointer text-sm ${
                    selectedCategory === category.id_kategori
                      ? "font-semibold text-orange-500"
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id_kategori)}
                >
                  {category.nama_kategori}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1 ">
                <div className="hidden md:block">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Cari Barang Lelang"
                    className="pl-8"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                <div className="block md:hidden">
                  <Select
                    onValueChange={(value) => setSelectedCategory(value)}
                    value={selectedCategory ?? ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      {categoriesData.map((category) => (
                        <SelectItem
                          key={category.id_kategori}
                          value={category.id_kategori}
                        >
                          {category.nama_kategori}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Select
                value={sortFilter}
                onValueChange={(value) => setSortFilter(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Segera Berakhir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Terbaru</SelectItem>
                  <SelectItem value="price-low">Harga Terendah</SelectItem>
                  <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                  <SelectItem value="most-bids">Penawaran Terbanyak</SelectItem>
                  <SelectItem value="least-bids">
                    Penawaran Tersedikit
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {filteredData.map((lelang, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  key={`${lelang.id_barang}`}
                  className="border rounded-md overflow-hidden bg-white"
                >
                  <Link href={`/lelang/${lelang.id_lelang}`}>
                    <div className="bg-gray-100 w-full h-40 sm:h-48 md:h-60 overflow-hidden">
                      <Image
                        src={lelang.gambar || "/placeholder.svg"}
                        alt={lelang.nama_barang}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="p-3">
                    <Link href={`/lelang/${lelang.id_lelang}`}>
                      <h3 className="font-medium">{lelang.nama_barang}</h3>
                    </Link>
                    <p className="text-xs text-gray-500">Tawaran saat ini</p>
                    <p className="text-orange-500 font-bold">
                      Rp.{lelang.harga_akhir.toLocaleString("id-ID")}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">
                        {lelang.jumlah_penawaran} Penawaran
                      </span>
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-xs px-3 py-1 h-auto"
                      >
                        Tawar
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageLelang;
