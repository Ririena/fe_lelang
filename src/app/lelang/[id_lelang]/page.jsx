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
const DetailLelangPage = () => {
  const { id_lelang } = useParams();
  const [detailData, setDetailData] = useState("");
  const [detailDataBarang, setDetailDataBarang] = useState("");
  const { token, loading } = useAuth();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
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
      setDetailData(data);
      console.table(data);

      if (data.id_barang) {
        getBarang(data.id_barang); // Ensure id_barang exists before calling getBarang
      } else {
        console.error("id_barang is undefined or missing");
      }
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    setIsPageLoading(false);
  }
}

async function getBarang(id_barang) {
  if (!id_barang) {
    console.error("id_barang is invalid");
    return;
  }

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

  function getTimeRemaining(deadline) {
    const total = new Date(deadline).getTime() - new Date().getTime();

    if (total <= 0) return "Waktu habis";

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    let result = "";

    if (days > 0) result += `${days} hari `;
    if (hours > 0) result += `${hours} jam `;
    if (minutes > 0) result += `${minutes} menit`;
    if (days === 0 && hours === 0 && minutes === 0) result = `${seconds} detik`;

    return `Berakhir dalam ${result.trim()}`;
  }

  useEffect(() => {
    const updateTimer = () => {
      if (!detailData?.tenggat_waktu) {
        setTimeLeft("");
        return;
      }

      const remaining = getTimeRemaining(detailData.tenggat_waktu);
      setTimeLeft(remaining);
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [detailData]);

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
          <div className="max-w-lg w-full max-h-lvh h-full bg-white rounded-lg shadow-lg">
            <Image
              className="w-full h-full object-cover rounded-t-lg"
              src={
                detailDataBarang.gambar
                  ? `${detailDataBarang.gambar}`
                  : "/path/to/fallback-image.jpg"
              }
              alt={
                detailDataBarang ? detailDataBarang.nama_barang : "Loading..."
              }
              width={550}
              height={500}
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
                      Rp{" "}
                      {detailData?.harga_akhir
                        ? detailData.harga_akhir.toLocaleString("id-ID")
                        : detailDataBarang?.harga_awal?.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex justify-between mt-3">
                  <p className="md:text-lg text-base font-medium">Total Penawaran: {detailData.total_penawaran}</p>
                  <p className="md:text-lg text-sm font-light">
                  </p>
                </div>
              </section>
              <section className="mt-3">
                <div className="flex justify-between">
                  <p>Time Left</p>
                  <p className="font-semibold text-2xl">{timeLeft}</p>
                </div>
                <div className="flex justify-between">
                  <div></div>
                  <p className="md:text-lg text-sm font-light text-gray-500">
                    {detailData?.tenggat_waktu
                      ? `Penawaran berakhir pada ${new Date(
                          detailData.tenggat_waktu
                        ).toLocaleDateString("id-ID", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}`
                      : "Tanggal penutupan tidak tersedia"}
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
