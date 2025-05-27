"use client";
import { useState, useEffect } from "react";
import LelangTable from "@/components/admin/lelangs/lelang-tables";
import LelangFormDialog from "@/components/admin/lelangs/lelang-form-dialog";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import HeadersInsets from "@/components/admin/headers-inset";
import { Input } from "@/components/ui/input";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

import axios from "axios";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BreadCrumbUrl } from "@/components/ui/navigations/bread-crumb-url";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
const AdminLelangPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { id_lelang } = useParams();
  const [detailData, setDetailData] = useState("");
  const [detailDataBarang, setDetailDataBarang] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);
  const { token, loading } = useAuth();
  const handleLelangAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

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

  const generatePDF = async () => {
    const element = document.getElementById("lelang-detail-pdf");
    if (!element) {
      console.error("Element tidak ditemukan");
      return;
    }

    element.classList.add("pdf-export");
    element.style.maxHeight = "297mm"; 
    element.style.overflow = "hidden";

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = { width: canvas.width, height: canvas.height };
      const scaleX = pdfWidth / imgProps.width;
      const scaleY = pdfHeight / imgProps.height;
      const scale = Math.min(scaleX, scaleY);

      const imgWidthScaled = imgProps.width * scale;
      const imgHeightScaled = imgProps.height * scale;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidthScaled, imgHeightScaled);
      pdf.save(`Auction_Report_${detailData?.id_lelang || "data"}.pdf`);
    } catch (error) {
      console.error("Error generate PDF:", error);
    } finally {
      element.classList.remove("pdf-export");
      element.style.maxHeight = "";
      element.style.overflow = "";
    }
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <HeadersInsets />
        <main className="flex-1 p-6" id="lelang-detail-pdf">
          <BreadCrumbUrl />
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold mt-4">Data History Bids</h1>
          </div>
          <Card className="mt-4 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Detail Lelang</h2>
              {detailData ? (
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>
                    <strong>ID Lelang:</strong> {detailData.id_lelang}
                  </li>
                  <li>
                    <strong>Status:</strong> {detailData.status}
                  </li>
                  <li>
                    <strong>Tanggal Dibuka:</strong> {detailData.tanggal_dibuka}
                  </li>
                  <li>
                    <strong>Tenggat Waktu:</strong> {detailData.tenggat_waktu}
                  </li>
                  <li>
                    <strong>ID Barang:</strong> {detailData.id_barang}
                  </li>
                  <li>
                    <strong>ID Pemenang:</strong>{" "}
                    {detailData.id_pemenang || "-"}
                  </li>
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">Memuat detail lelang...</p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Detail Barang</h2>
              {detailDataBarang ? (
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>
                    <strong>Nama Barang:</strong> {detailDataBarang.nama_barang}
                  </li>
                  <li>
                    <strong>Deskripsi:</strong> {detailDataBarang.deskripsi}
                  </li>
                  <li>
                    <strong>Harga Awal:</strong> Rp{detailDataBarang.harga_awal}
                  </li>

                  {detailDataBarang.gambar && (
                    <li className="mt-3">
                      <p className="font-semibold mb-1">Gambar Barang:</p>
                      <img
                        src={`${detailDataBarang.gambar}`}
                        alt={detailDataBarang.nama_barang}
                        className="w-64 h-auto rounded-md border shadow"
                      />
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">Memuat detail barang...</p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Riwayat Penawaran</h2>
              <div className="border rounded-md overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">No</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>Nominal</TableHead>
                      <TableHead>Waktu</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {detailData.riwayat_penawaran &&
                    detailData.riwayat_penawaran.length > 0 ? (
                      detailData.riwayat_penawaran.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {index + 1}
                          </TableCell>
                          <TableCell>{item.username || "-"}</TableCell>
                          <TableCell>
                            Rp{item.harga_penawaran?.toLocaleString()}
                          </TableCell>
                          <TableCell>{item.waktu || "-"}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center py-4 text-gray-500"
                        >
                          Tidak ada riwayat penawaran
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            <Button onClick={generatePDF} className="mb-6">
              Download Laporan PDF
            </Button>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLelangPage;
