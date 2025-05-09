"use client";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
const DetailLelangPage = () => {
  const { id_lelang } = useParams();
  const [detailData, setDetailData] = useState("");
  const [detailDataBarang, setDetailDataBarang] = useState("");
  const { token, loading } = useAuth();
  const [isPageLoading, setIsPageLoading] = useState(true);

  async function init() {
    try {
      const res = await axios.get(
        `http://localhost:3001/auctions/${id_lelang}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res) {
        console.error(res);
        return;
      }

      if (!loading) {
        const data = res.data.data;
        setDetailData(res.data.data);
        console.table(data);

        getBarang(data.id_barang);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsPageLoading(false);
    }
  }

  async function getBarang(id_barang) {
    try {
      const res = await axios.get(
        `http://localhost:3001/v2/items/${id_barang}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!loading) {
        console.table(res.data.data);
        setDetailDataBarang(res.data.data);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsPageLoading(false);
    }
  }

  useEffect(() => {
    if (!loading && token) {
      init();
    }
  }, [token, loading]);

  if (isPageLoading || loading) {
    return (
      <main className="p-4">
        <h1 className="text-xl font-semibold mt-12">Loading data lelang...</h1>
      </main>
    );
  }

  return (
    <>
      <main className="p-4">
        <h1 className="md:text-2xl text-xl font-semibold mt-12">
          Detail Lelang
        </h1>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 items-start">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg">
            <Image
              className="w-full h-auto object-cover rounded-t-lg"
              src={
                detailDataBarang.gambar
                  ? `${detailDataBarang.gambar}`
                  : "/path/to/fallback-image.jpg"
              }
              alt="Violet Evergarden Auction"
              width={550}
              height={300}
            />
          </div>

          <Card className=" w-full h-auto rounded-lg shadow-lg">
            <CardContent>
              <h1 className="md:text-2xl text-xl font-semibold">
                {detailDataBarang.nama_barang}
              </h1>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="orange" className="mt-2">
                  Visual Novel
                </Badge>
                <Badge variant="orange" className="mt-2">
                  Books
                </Badge>
              </div>
              <section className="bg-[#FFF7ED] border border-[#F4DEC3] rounded mt-8 p-4">
                <div className="flex justify-between">
                  <p className="md:text-lg text-sm">Tawaran Saat Ini</p>
                  <p className="md:text-2xl text-xl text-orange-400 font-semibold">
                    {detailData.harga_akhir}
                  </p>
                </div>
                <div className="flex justify-between mt-3">
                  <p className="md:text-lg text-sm font-light">15 Penawaran</p>
                  <p className="md:text-lg text-sm font-light">
                    Penawaran Pertama
                  </p>
                </div>
              </section>
              <section className="mt-3">
                <div className="flex justify-between">
                  <p>Time Left</p>
                  <p className="font-semibold text-2xl">1h 23j 15m</p>
                </div>
                <div className="flex justify-between">
                  <div></div>
                  <p className="md:text-lg text-sm font-light text-gray-500">
                    Penawaran Berakhir pada tanggal 24 April
                  </p>
                </div>

                <Input className="mt-4" placeholder="Input Harga Penawaran" />

                <Button variant="orange" className="text-md mt-4 w-full py-5">
                  Tawar
                </Button>
                <Separator className="mt-8 border-1 border-black" />

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">
                    Informasi Petugas
                  </h3>
                  <div className="flex items-center gap-3 p-3 border rounded-lg bg-white shadow-sm">
                    <div className="relative">
                      {/* <Image
                        src={"/asd.png" || "/placeholder.svg"}
                        alt={`Avatar`}
                        width={48}
                        height={48}
                        className="rounded-full object-cover border-2 border-primary/20"
                      /> */}
                    </div>
                    <div>
                      <h1 className="font-medium">YangYuelin</h1>
                      <p className="text-sm text-muted-foreground">
                        Auction Officer
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start mt-16">
          <Card className="max-w-lg w-full">
            <div className="ml-4">
              <h3 className="md:text-lg text-sm font-normal">
                Deskripsi Barang
              </h3>
              <p className="font-thin md:text-lg text-base">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
                nam perspiciatis eaque delectus rem deserunt iste, explicabo
                temporibus tempore omnis.
              </p>
            </div>
          </Card>
          <Card className="max-w-lg w-full">
            <div className="ml-4">
              <h3 className="md:text-lg text-sm font-normal">
                Deskripsi Barang
              </h3>
            </div>
          </Card>
        </section>
      </main>
    </>
  );
};

export default DetailLelangPage;
