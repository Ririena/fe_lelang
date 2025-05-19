import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Navbar from "@/components/ui/navigations/Navbar";
import Image from "next/image";
import { Clock, TrendingUp, Award } from "lucide-react";
import Footer from "@/components/ui/navigations/Footer";
import FeaturedAuctions from "@/components/_index/FeaturedAuctions";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="w-full bg-[#FF7D20] text-white px-4 py-8">
        <div className="container mx-auto">
          <div className="mx-auto  px-6 flex flex-col md:flex-row justify-between items-center min-h-[50vh]">
            <div className="flex-1 flex flex-col justify-center items-start py-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Tawarin.com
              </h1>
              <p className="text-lg font-medium md:text-xl max-w-lg mb-1">
                Tempat Lelang Online, Cepat & Transparan
              </p>
              <p className="font-extralight text-md md:text-lg max-w-lg mb-6">
                Beli barang unik favoritmu lewat sistem lelang modern yang aman,
                mudah dan menguntungkan. Mulai tawarin sekarang
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-white text-orange-500 font-semibold rounded-lg hover:bg-gray-100 transition">
                  Mulai Lelang
                </button>
                <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-orange-500 transition">
                  Pelajari Lebih Lanjut
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold md:text-3xl max-w-lg mb-1">
          Lelang Unggulan
        </h1>
        <section>
          <FeaturedAuctions/>
        </section>
        <div className="mb-20"></div>
      </section>
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className=" mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Cara Kerja Tawarin.com
            </h2>
            <p className="text-gray-600 max-w-2xl ">
              Proses lelang yang mudah dan transparan untuk semua pengguna
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FFF1E7] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-[#FF7D20]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Daftar & Jelajahi</h3>
              <p className="text-gray-600">
                Buat akun dan jelajahi berbagai barang lelang menarik dari
                seluruh Indonesia
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FFF1E7] rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-[#FF7D20]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Buat Penawaran</h3>
              <p className="text-gray-600">
                Ajukan tawaran Anda dan pantau status lelang secara real-time
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FFF1E7] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#FF7D20]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Menangkan Lelang</h3>
              <p className="text-gray-600">
                Jika tawaran Anda tertinggi, Anda akan memenangkan barang dan
                dapat melakukan pembayaran
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 container mx-auto px-4">
        <div className="bg-[#FF7D20] rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Siap Memulai Lelang?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Bergabunglah dengan ribuan pengguna Tawarin.com dan temukan barang
            unik atau jual barang Anda dengan harga terbaik
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-[#FF7D20] hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
              Daftar Sekarang
            </Button>
            <Button
              variant="outline"
              className="border-white text-black  hover:text-[#FF7D20] px-8 py-6 text-lg font-semibold"
            >
              Jelajahi Lelang
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
