import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { formatCustomDate } from "@/lib/formatDate";
import Image from "next/image";

export default function ProfileOffers({offers}) {


  return (
    <>
      <>
        <section className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Penawaran Kamu</CardTitle>
          <CardDescription>
            Lihat penawaran yang pernah kamu lakukan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {offers.length === 0 ? (
              <p className="text-sm text-gray-500">Belum ada penawaran.</p>
            ) : (
              offers.map((offer) => (
                <div
                  key={offer.id_lelang}
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                >
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
              ))
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t bg-gray-50/50 px-6 py-4">
          <Button
            variant="outline"
            className="text-orange-500 hover:bg-orange-600 hover:text-white"
          >
            Lihat Semua Penawaran
          </Button>
        </CardFooter>
      </Card>
    </section>
      </>
    </>
  );
}
