import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Navbar from "@/components/ui/navigations/Navbar";
import Image from "next/image";
import { Clock, TrendingUp, Award } from "lucide-react";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          <div className="w-auto max-w-sm bg-white rounded-lg shadow-lg py-0">
            <Image
              className="w-sm h-auto object-cover rounded-t-lg"
              src="/auction-landing.jpg"
              alt="Violet Evergarden Auction"
              width={500}
              height={280}
            />
            <div className="px-4 py-3">
              <h2 className="text-xl font-semibold">Violet Evergarden</h2>
              <p className="text-md font-light">Tawaran Saat Ini</p>
              <p className="text-lg text-orange-500 font-medium">Rp. 125.000</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-md font-light">15 Penawaran</p>
                <Button className="w-32" variant="orange">
                  Tawar
                </Button>
              </div>
            </div>
          </div>
          <div className="w-auto max-w-sm bg-white rounded-lg shadow-lg py-0">
            <Image
              className="w-sm h-auto object-cover rounded-t-lg"
              src="/auction-landing.jpg"
              alt="Violet Evergarden Auction"
              width={500}
              height={280}
            />
            <div className="px-4 py-3">
              <h2 className="text-xl font-semibold">Violet Evergarden</h2>
              <p className="text-md font-light">Tawaran Saat Ini</p>
              <p className="text-lg text-orange-500 font-medium">Rp. 125.000</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-md font-light">15 Penawaran</p>
                <Button className="w-32" variant="orange">
                  Tawar
                </Button>
              </div>
            </div>
          </div>
          <div className="w-auto max-w-sm bg-white rounded-lg shadow-lg py-0">
            <Image
              className="w-sm h-auto object-cover rounded-t-lg"
              src="/auction-landing.jpg"
              alt="Violet Evergarden Auction"
              width={500}
              height={280}
            />
            <div className="px-4 py-3">
              <h2 className="text-xl font-semibold">Violet Evergarden</h2>
              <p className="text-md font-light">Tawaran Saat Ini</p>
              <p className="text-lg text-orange-500 font-medium">Rp. 125.000</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-md font-light">15 Penawaran</p>
                <Button className="w-32" variant="orange">
                  Tawar
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-20"></div>

      </section>
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className=" mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Cara Kerja Tawarin.com</h2>
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
                Buat akun dan jelajahi berbagai barang lelang menarik dari seluruh Indonesia
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FFF1E7] rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-[#FF7D20]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Buat Penawaran</h3>
              <p className="text-gray-600">Ajukan tawaran Anda dan pantau status lelang secara real-time</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-[#FFF1E7] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#FF7D20]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Menangkan Lelang</h3>
              <p className="text-gray-600">
                Jika tawaran Anda tertinggi, Anda akan memenangkan barang dan dapat melakukan pembayaran
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 container mx-auto px-4">
        <div className="bg-[#FF7D20] rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Siap Memulai Lelang?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Bergabunglah dengan ribuan pengguna Tawarin.com dan temukan barang unik atau jual barang Anda dengan harga
            terbaik
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
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4">Tawarin.com</h3>
              <p className="text-gray-400 mb-4">Platform lelang online terpercaya di Indonesia</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Layanan</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cara Kerja
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Lelang Barang
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Jual Barang
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Verifikasi Akun
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Pembayaran
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Perusahaan</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Karir
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Syarat & Ketentuan
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">📍</span>
                  <span className="text-gray-400">Jl. Lelang No. 123, Jakarta Selatan, Indonesia</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">📞</span>
                  <span className="text-gray-400">+62 21 1234 5678</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-400 mr-2">✉️</span>
                  <span className="text-gray-400">info@tawarin.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} Tawarin.com. Hak Cipta Dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
