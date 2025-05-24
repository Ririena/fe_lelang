"use client";

import Navbar from "@/components/ui/navigations/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Eye } from "lucide-react";
import {
  Clock,
  DollarSign,
  Tag,
  Users,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
  Heart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useParams } from "next/navigation";
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
const MyPage = () => {
  const [hargaPenawaran, setHargaPenawaran] = useState(0);
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
        `http://localhost:3001/auctions/${id_lelang}`,
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
    <>
      <main>
        <Navbar />
        <div className="container mx-auto px-4 py-8 ">
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {detailDataBarang.nama_barang}
                </h1>
                <p className="text-lg text-muted-foreground">
                  1985 • Reference 16233 • Luxury Collection
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-orange-200 hover:bg-orange-50"
                >
                  <Eye className="h-4 w-4" />
                  <span>234 views</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-orange-200 hover:bg-orange-50"
                >
                  <Heart className="h-4 w-4" />
                  <span>Save</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            <div className="xl:col-span-2 space-y-8">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg border border-orange-100/50"></div>
                <div className="aspect-square relative">
                  <img
                    src={detailDataBarang.gambar || "/fallback.jpg"}
                    alt={detailDataBarang?.nama_barang || "Barang"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                  <div className="absolute top-6 right-6">
                    <Badge className="bg-orange-600 text-white hover:bg-orange-700 shadow-md">
                      Active Auction
                    </Badge>
                  </div>
                </div>
              </div>
              <Card className="border-orange-100/50 shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-medium mb-4">
                    Item Description
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    {detailDataBarang.deskripsi ||
                      "Deskripsi barang tidak tersedia."}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-8">
              <Card className="border-orange-200/50 shadow-xl bg-gradient-to-br from-white to-orange-50/30">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Current Bid Section */}
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        Current Bid
                      </p>
                      <div className="flex items-center justify-center">
                        <span className="text-4xl font-bold text-orange-600">
                          Rp{" "}
                          {detailData?.harga_akhir
                            ? detailData.harga_akhir.toLocaleString("id-ID")
                            : detailDataBarang?.harga_awal?.toLocaleString(
                                "id-ID"
                              )}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{detailData.total_penawaran}</span>
                        </div>
                        <div className="flex items-center gap-1 text-orange-600 font-medium">
                          <Clock className="h-4 w-4" />
                          <span>
                            {/* {" "}
                            {detailData?.tenggat_waktu
                              ? `Ended at ${new Date(
                                  detailData.tenggat_waktu
                                ).toLocaleDateString("id-ID", {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}`
                              : "Tanggal penutupan tidak tersedia"} */}
                            {timeLeft}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-orange-100" />

                    {/* Reserve Price */}

                    {/* Bid Form */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="font-semibold text-gray-900">
                          Place Your Bid
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Min. increment: $50
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="relative">
                          <Input
                            placeholder="Enter bid amount"
                            type="number"
                            className="pl-10 h-12 border-orange-200 focus-visible:ring-orange-500 text-lg font-medium"
                            value={hargaPenawaran}
                            onChange={(e) => setHargaPenawaran(e.target.value)}
                          />

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button className="mt-4 w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg shadow-lg">
                                Place Bid
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure you want to place this bid?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  By placing this bid, you agree to the terms
                                  and conditions of the auction. Please ensure
                                  that
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handlePenawaran}
                                  className="bg-orange-600 hover:bg-orange-700 text-white"
                                >
                                  Yes, Place The Bid
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200/50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">
                      Seller Information
                    </h3>
                    <Badge
                      variant="outline"
                      className="text-orange-600 border-orange-200 bg-orange-50"
                    >
                      Verified Seller
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" />
                      <AvatarFallback className="bg-orange-100 text-orange-800 font-semibold">
                        LW
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Luxury Watches Inc.
                      </p>
                      <div className="flex items-center gap-1">
                        <div className="flex text-orange-500">
                          <Star className="fill-orange-500 h-3 w-3" />
                        </div>
                        <span className="text-xs text-muted-foreground ml-1">
                          (128 reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    Contact Seller
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-orange-200/50 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Recent Bids
                  </h3>
                  {detailData.riwayat_penawaran &&
                  detailData.riwayat_penawaran.length > 0 ? (
                    detailData.riwayat_penawaran.map((item, index) => (
                      <>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3" key={index}>
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs bg-orange-100 text-orange-800">
                                {item.username
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">
                                {item.username}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {/* {bid.time} */}
                              </p>
                            </div>
                            <Badge className="bg-orange-100 text-orange-600 text-xs">
                              Test
                            </Badge>
                            <p className="font-bold text-orange-700">
                              {item.harga_penawaran.toLocaleString("id-ID")}
                            </p>
                            {/* {bid.isHighest && (
                              <Badge className="bg-orange-600 text-white text-[10px] h-5">
                                Highest
                              </Badge>
                            )} */}
                          </div>
                        </div>
                      </>
                    ))
                  ) : (
                    <>
                      <p className="text-gray-500 text-sm sm:text-base">
                        Belum ada penawaran.
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MyPage;
