"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
  ArrowDown,
  ArrowUp,
  Box,
  CarTaxiFront,
  DollarSign,
  ShoppingBasket,
  Users,
} from "lucide-react";
import axios from "axios";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useEffect, useState } from "react";
export function DashboardContent({ listHistory }) {
  const [countMasyrakat, setCountMasyarakat] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(listHistory.length / itemsPerPage);
  const paginatedHistory = listHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  async function getCount() {
    try {
      const resUser = await axios.get(
        "http://localhost:3001/v1/user/masyarakat",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setCountMasyarakat(resUser.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getCount();
  }, []);

  return (
    <SidebarInset>
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <div>
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, Admin</p>
        </div>
      </header>
      <main className="flex-1 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total User</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{countMasyrakat ? countMasyrakat.count : "Loading..."} User
                Active
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +10.5%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Petugas
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12 Staff Active</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +10.5%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Box />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+87</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500 flex items-center">
                  <ArrowUp className="mr-1 h-3 w-3" />
                  +3.2%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Auction
              </CardTitle>
              <ShoppingBasket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+61</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-rose-500 flex items-center">
                  <ArrowDown className="mr-1 h-3 w-3" />
                  -2.5%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                There were 482 transactions in the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] rounded-md border border-dashed flex items-center justify-center text-muted-foreground">
                Chart placeholder
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Latest orders from your customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.isArray(paginatedHistory) &&
                  paginatedHistory.map((history) => (
                    <div
                      key={history.id_history}
                      className="flex items-center gap-4"
                    >
                      <div className="h-10 w-10 rounded-full bg-muted">
                        {history.id_history}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {history.nama_barang}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Customer: {history.username}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <PaginationItem key={idx}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === idx + 1}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(idx + 1);
                        }}
                      >
                        {idx + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          setCurrentPage(currentPage + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>
        </div>
      </main>
    </SidebarInset>
  );
}
