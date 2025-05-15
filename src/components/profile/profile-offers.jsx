import React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { formatCustomDate } from "@/lib/formatDate";
import Image from "next/image";

export default function ProfileOffers({offers}) {
  const [myOffer, setMyOffer] = useState([]);
  const { token, loading } = useAuth();

  async function init() {
    try {
      const res = await axios.get("http://localhost:3001/v1/my-offer", {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!loading && res.data?.data) {
        setMyOffer(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch offers:", error);
      setMyOffer([]);
    }
  }

  useEffect(() => {
    if (!loading) {
      init();
    }
  }, [token, loading]);
  return (
    <>
      <>
        <section className="grid grid-cols-1 gap-4">
          {offers.map((offer) => (
            <div key={offer.id_lelang}>
              <Card>
                <CardHeader>
                  <CardTitle>Penawaran Kamu</CardTitle>
                  <CardDescription>
                    Lihat penawaran yang pernah kamu lakukan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-shrink-0 w-16 h-16 mr-4 overflow-hidden rounded-md">
                        <Image
                          src={
                            offer.gambar && offer.gambar.trim() !== ""
                              ? offer.gambar
                              : "/fallback-image.png"
                          }
                          alt={offer.nama_barang || "Gambar tidak tersedia"}
                          height={500}
                          width={500}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {offer.nama_barang}
                        </h4>
                        <p className="mt-1 text-xs text-gray-500">
                          {formatCustomDate(offer.tgl_lelang)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          Rp. {offer.harga_akhir.toLocaleString("id-ID")}
                        </span>
                        <ChevronRight className="w-5 h-5 ml-2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t bg-gray-50/50 px-6 py-4"></CardFooter>
              </Card>
            </div>
          ))}
        </section>

        <Button
          variant="outline"
          className="text-orange-500  hover:bg-orange-600 hover:text-white"
        >
          Lihat Semua Penawaran
        </Button>
      </>
    </>
  );
}
