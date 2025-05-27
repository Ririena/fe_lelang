"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ToastCard } from "../ui/toast-card";
import axios from "axios";
import { Button } from "../ui/button";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const FeaturedAuctions = () => {
  const [featuredAuctions, setFeaturedAuctions] = useState([]);
  const { loading, token } = useAuth();

  useEffect(() => {
    if (!loading && token) {
      axios
        .get("https://be-lelang.vercel.app/auctions/featured", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setFeaturedAuctions(res.data.data);
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.error ||
            error.message ||
            "Terjadi kesalahan saat mengambil data.";
          toast.custom(() => (
            <ToastCard
              title="Gagal Mengambil Data"
              description={`Terjadi kesalahan ketika mengambil data: ${errorMessage}`}
              variant="destructive"
            />
          ));
        });
    }
  }, [loading, token]);

  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {loading ? (
          <p className="text-center col-span-3 text-gray-400">Memuat data...</p>
        ) : featuredAuctions.length === 0 ? (
          <p className="text-center col-span-3 text-gray-500">
            Tidak ada lelang unggulan.
          </p>
        ) : (
          featuredAuctions.map((fa) => (
            <div
              key={fa.id_lelang}
              className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="w-full h-[300px] relative">
                <Image
                  src={fa.gambar}
                  alt={fa.nama_barang}
                  fill
                  className="object-fit"
                />
              </div>
              <div className="px-4 py-3">
                <h2 className="text-xl font-semibold">{fa.nama_barang}</h2>
                <p className="text-md font-light">Tawaran Saat Ini</p>
                <p className="text-lg text-orange-500 font-medium">
                  Rp. 125.000
                </p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-md font-light">
                    {fa.jumlah_penawaran} Penawaran
                  </p>
                  <Button className="w-32" variant="orange">
                    Tawar
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default FeaturedAuctions;
