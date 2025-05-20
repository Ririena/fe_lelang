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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DetailLelangPage = () => {
  const { id_lelang } = useParams();
  const [hargaPenawaran, setHargaPenawaran] = useState("");
  const [detailData, setDetailData] = useState("");
  const [detailDataBarang, setDetailDataBarang] = useState("");
  const { token, loading } = useAuth();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");

  async function init() {
    try {
      const res = await axios.get(
        `https://be-lelang.vercel.app/auctions/${id_lelang}`,
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
          getBarang(data.id_barang);
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
        `https://be-lelang.vercel.app/v2/items/${id_barang}`,
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
      <main className="container mx-auto p-4">
        <h1 className="text-xl font-semibold mt-12">Loading data lelang...</h1>
      </main>
    );
  }

  const handlePenawaran = async (e) => {
    e.preventDefault();

    if (!hargaPenawaran || isNaN(hargaPenawaran)) {
      return alert("Masukkan harga penawaran yang valid.");
    }

    try {
      const res = await axios.post(
        `https://be-lelang.vercel.app/auctions/${id_lelang}`,
        {
          id_lelang: detailData.id_lelang,
          id_barang: detailData.id_barang,
          harga_penawaran: parseInt(hargaPenawaran),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Penawaran Berhasil");
      setHargaPenawaran("");
      await init();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <main className="container mx-auto p-4 md:p-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-6 md:mt-12 mb-6">
        Detail Lelang
      </h1>

      <section className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-lg aspect-square rounded-lg overflow-hidden shadow-md">
            <Image
              src={detailDataBarang.gambar || "/fallback.jpg"}
              alt={detailDataBarang?.nama_barang || "Barang"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              priority
              style={{
                objectFit: "contain",
                padding: "1rem", // Add some padding around the image
              }}
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full lg:w-1/2">
          <Card className="w-full h-full rounded-lg shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
                {detailDataBarang.nama_barang}
              </h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="orange">Visual Novel</Badge>
                <Badge variant="orange">Books</Badge>
              </div>

              <section className="bg-[#FFF7ED] border border-[#F4DEC3] rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm sm:text-base md:text-lg">
                    Tawaran Saat Ini
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl text-orange-500 font-semibold">
                    Rp{" "}
                    {detailData?.harga_akhir
                      ? detailData.harga_akhir.toLocaleString("id-ID")
                      : detailDataBarang?.harga_awal?.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm sm:text-base font-medium">
                    Total Penawaran: {detailData.total_penawaran}
                  </p>
                </div>
              </section>

              <section className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm sm:text-base">Time Left</p>
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-right">
                    {timeLeft}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 text-right">
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

                <div className="mt-6 space-y-4">
                  <Input
                    className="w-full"
                    placeholder="Input Harga Penawaran"
                    onChange={(e) => setHargaPenawaran(e.target.value)}
                    value={hargaPenawaran}
                    type="number"
                  />

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="orange"
                        className="w-full py-4 text-sm sm:text-base"
                      >
                        Tawar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Apakah Anda yakin ingin menawar?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Penawaran Anda akan disimpan dan tidak dapat
                          dibatalkan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handlePenawaran}>
                          Ya, Tawar Sekarang
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <Separator className="my-6" />

                <div>
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
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Description Section */}
        <Card className="w-full">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-medium mb-4">
              Deskripsi Barang
            </h3>
            <p className="text-sm sm:text-base text-gray-700">
              {detailDataBarang.deskripsi}
            </p>
          </CardContent>
        </Card>

        {/* Bidding History Section */}
        <Card className="w-full">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-medium mb-4">
              History Penawaran
            </h3>
            <div className="space-y-3">
              {detailData.riwayat_penawaran &&
              detailData.riwayat_penawaran.length > 0 ? (
                detailData.riwayat_penawaran.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-lg flex justify-between items-center shadow-sm bg-white"
                  >
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        {item.username}
                      </p>
                 
                    </div>
                    <p className="font-semibold text-orange-500 text-sm sm:text-base">
                      Rp {item.harga_penawaran.toLocaleString("id-ID")}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm sm:text-base">
                  Belum ada penawaran.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default DetailLelangPage;
