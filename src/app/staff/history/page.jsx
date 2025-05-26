"use client";
import HeadersInsets from "@/components/admin/headers-inset";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useMemo} from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import HistoryTablePage from "@/components/history/history-tables";
import { useState } from "react";
import { StaffSidebar } from "@/components/staff/staff-sidebar";
const StaffHistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  return (
    <>
      <SidebarProvider>
        <StaffSidebar />
        <SidebarInset>
          <HeadersInsets />
          <main className="flex-1 p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-xl font-semibold">History Data</h1>
            </div>
            <div className="flex gap-4 mb-4">
              <Input
                placeholder="Search History"
                className="w-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort Options</SelectLabel>
                    <SelectItem value="all">All History</SelectItem>
                    <SelectItem value="date_asc">
                      Date: Oldest to Newest
                    </SelectItem>
                    <SelectItem value="date_desc">
                      Date: Newest to Oldest
                    </SelectItem>
                    <SelectItem value="price_high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="price_low">
                      Price: Low to High
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <HistoryTablePage searchQuery={searchQuery} filter={filter} />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default StaffHistoryPage;
