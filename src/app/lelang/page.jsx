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
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
const PageLelang = () => {
  const [lelangData, setLelangData] = useState([]);
  const [profile, setProfile] = useState("");
  const { token, loading } = useAuth();
  async function init() {
    try {
      const res = await axios.get("http://localhost:3001/v2/items", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!loading) {
        console.table(res.data.data);
        setLelangData(res.data.data);
      }
    } catch (error) {
      console.error("Gagal memuat data:", error.message);
      setLelangData([]);
    }
  }

  React.useEffect(() => {
    if (!loading) {
      init();
    }
  }, [loading]);

  const products = Array(9).fill({
    title: "Visual Novel VE",
    price: "Rp 125.000",
    bids: "15 Penawaran",
    image: "/auction-landing.jpg",
  });

  const categories = [
    { name: "Semua Kategori", count: 1245 },
    { name: "Elektronik", count: 525 },
    { name: "Buku", count: 95 },
    { name: "Perhiasan", count: 34 },
    { name: "Kendaraan", count: 324 },
  ];
  return (
    <>
      <main className="mt-12">
        <section>
          <h2 className="text-xl font-bold mb-4">Lelang Unggulan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map((product, index) => (
              <div
                key={`featured-${index}`}
                className="border rounded-md overflow-hidden bg-white"
              >
                <Link href={`/product/${index}`}>
                  <div className="bg-gray-100 sm:h-48 md:h-60 overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={500}
                      height={500}
                      className=" object-cover h-[300px]"
                    />
                  </div>
                </Link>
                <div className="p-3">
                  <Link href={`/product/${index}`}>
                    <h3 className="font-medium">{product.title}</h3>
                  </Link>
                  <p className="text-xs text-gray-500">Tawaran saat ini</p>
                  <p className="text-orange-500 font-bold">{product.price}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {product.bids}
                    </span>
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-xs px-3 py-1 h-auto"
                    >
                      Tawar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          {/* Categories Sidebar */}
          <div className="border rounded-md p-4">
            <h3 className="font-bold mb-3">Kategori</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span>{category.name}</span>
                  <span className="text-gray-500">{category.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Cari Barang Lelang"
                  className="pl-8"
                />
              </div>
              <Select defaultValue="default">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Segera Berakhir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Segera Berakhir</SelectItem>
                  <SelectItem value="price-low">Harga Terendah</SelectItem>
                  <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                  <SelectItem value="newest">Terbaru</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {lelangData.map((lelang) => (
                <div
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
                      {lelang.harga_awal}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">
                        {lelang.harga_awal}
                      </span>
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-xs px-3 py-1 h-auto"
                      >
                        Tawar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PageLelang;

const FeaturedLelang = (props) => {
  return (
    <>
      <div className="w-sm bg-white rounded-lg shadow-lg py-0">
        <Image
          className="w-md h-auto object-cover rounded-t-lg"
          src="/auction-landing.jpg"
          alt="Violet Evergarden Auction"
          width={300}
          height={280}
        />
        <div className="px-4 py-3">
          <h2 className="text-xl font-semibold">{props.judul}</h2>
          <p className="text-md font-light">Tawaran Saat Ini</p>
          <p className="text-lg text-orange-500 font-medium">
            Rp.{props.harga}
          </p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-md font-light">Penawaran {props.penawaran}</p>
            <Button className="w-32" variant="orange">
              Tawar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
