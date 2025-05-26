"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { CreditCard, Shield, CheckCircle, Lock } from "lucide-react";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
const AuctionDetailUser = () => {
  const { token, loading, user } = useAuth();
  const [detailData, setDetailData] = useState("");
  const [detailDataBarang, setDetailDataBarang] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const { id_lelang } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("Dana");
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [auction, setAuction] = useState("");

  const orderSummary = {
    itemPrice: detailData.harga_akhir,
    shippingCost: 3000,
    processingFee: Math.round(detailData.harga_akhir * 0.03),
    tax: Math.round((detailData.harga_akhir + 3) * 0.08), 
    get total() {
      return this.itemPrice + this.shippingCost + this.processingFee + this.tax;
    },
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setPaymentComplete(true);
  };

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

  if (paymentComplete) {
    return (
      <div className="h-screen bg-gray-50">
        <main className="container py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">
                  Your payment has been processed successfully. You will receive
                  a confirmation email shortly.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <div className="text-sm text-gray-500 mb-1">Order Number</div>
                  <div className="font-mono text-lg">
                    #ORD-{detailData.id_lelang}-2025
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {/* <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild>
                      <Link href="/profile/purchases">View Purchase</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/auctions">Continue Shopping</Link>
                    </Button>
                  </div> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <main className="container py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-centerr gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold">Complete Your Purchase</h1>
                <p className="text-gray-600">
                  Secure checkout for your winning bid
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Congratulations! You Won This Auction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <Image
                        src={detailDataBarang.gambar || "/placeholder.svg"}
                        alt={detailDataBarang.nama_barang || "Auction Item"}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">
                          {detailDataBarang.nama_barang}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {detailDataBarang.deskripsi}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          {/* <span>Seller: {auction.seller.name}</span> */}
                          <span>•</span>
                          <span>
                            Ended:{" "}
                            {new Date(detailData.tenggat_waktu).toLocaleString(
                              "id-ID",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long", 
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className="text-lg font-bold text-orange-600">
                            Rp.{detailData.harga_akhir}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            Winning Bid
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-blue-500" />
                      Payment Method
                    </CardTitle>
                    <CardDescription>
                      Choose how you'd like to pay for this item
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="Dana" id="Dana" />
                        <Label htmlFor="Dana" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <div className="font-medium">Dana</div>
                              <div className="text-sm text-gray-500 mt-1">
                                Pay with your Dana account
                              </div>
                            </div>
                            <Image
                              src="/dana.jpg.webp"
                              height={40}
                              width={80}
                              alt="Dana"
                              className="object-contain ml-4"
                            />
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                  <CardContent>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="Gopay" id="Gopay" />
                        <Label
                          htmlFor="Gopay"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <div className="font-medium">Gopay</div>
                              <div className="text-sm text-gray-500 mt-1">
                                Pay with your Gopay account
                              </div>
                            </div>
                            <Image
                              src="/gopay.jpg"
                              height={40}
                              width={80}
                              alt="Gopay"
                              className="object-contain ml-4"
                            />
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                    <CardDescription>
                      Enter the billing address for your payment method
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="first-name">First Name</Label>
                        <Input
                          id="first-name"
                          placeholder="Ariena"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input
                          id="last-name"
                          placeholder="Kawaii"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          placeholder="nerllysu@company.com"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="Jl. Lengkong Besar No 101a"
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="Bandung City"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="zip">Kode Pos</Label>
                        <Input id="zip" placeholder="40261" className="mt-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-1">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Item Price</span>
                      <span>Rp.{detailData.harga_akhir}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>Rp.{orderSummary.shippingCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Fee</span>
                      <span>Rp.{orderSummary.processingFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>Rp.{orderSummary.tax}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>Rp.{orderSummary.total.toLocaleString()}</span>
                    </div>

                    <div className="space-y-3 pt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>Secure 256-bit SSL encryption</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Lock className="h-4 w-4 text-green-500" />
                        <span>Your payment info is protected</span>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      size="lg"
                      onClick={handlePayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing Payment...
                        </span>
                      ) : (
                        <span>
                          Complete Payment - Rp.{" "}
                          {orderSummary.total.toLocaleString()}
                        </span>
                      )}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      By completing your purchase, you agree to our{" "}
                      <Link
                        href="/terms"
                        className="text-orange-500 hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-orange-500 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AuctionDetailUser;
