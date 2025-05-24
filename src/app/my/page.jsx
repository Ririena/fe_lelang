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
const MyPage = () => {
  const [hargaPenawaran, setHargaPenawaran] = useState(0);
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

  return (
    <>
      <main>
        <Navbar />
        <div className="container mx-auto px-4 py-8 ">
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Vintage Rolex Datejust
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
                    src="https://images.unsplash.com/photo-1601758123927-3f4b2a0e1d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
                    alt="Product Image"
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
              <Card className="border-orange-100/50 shadow-lg"></Card>
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
                        <DollarSign className="h-8 w-8 text-orange-600" />
                        <span className="text-4xl font-bold text-orange-600">
                          2,500
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>18 bidders</span>
                        </div>
                        <div className="flex items-center gap-1 text-orange-600 font-medium">
                          <Clock className="h-4 w-4" />
                          <span>12h 43m left</span>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-orange-100" />

                    {/* Reserve Price */}
                    <div className="bg-orange-50 rounded-xl p-4 text-center">
                      <p className="text-sm font-medium text-orange-800 mb-1">
                        Reserve Price
                      </p>
                      <p className="text-xl font-bold text-orange-700">
                        $3,000
                      </p>
                      <p className="text-xs text-orange-600 mt-1">
                        Reserve not yet met
                      </p>
                    </div>

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
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="text"
                            className="pl-10 h-12 border-orange-200 focus-visible:ring-orange-500 text-lg font-medium"
                            placeholder="Enter bid amount"
                          />
                        </div>
                        <Button className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg shadow-lg">
                          Place Bid
                        </Button>
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MyPage;
