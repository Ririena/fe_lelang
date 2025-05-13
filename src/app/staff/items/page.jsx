"use client";
import { useState } from "react";
import { StaffSidebar } from "@/components/staff/staff-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import HeadersInsets from "@/components/staff/headers-inset";
import { Input } from "@/components/ui/input";
import ItemTables from "@/components/admin/items/item-tables";
import ItemFormDialog from "@/components/admin/items/item-form-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const StaffPageItems = () => {
  const [trigger, setTrigger] = useState(0);
  const [searchQuery, setSearchQuery] = useState();
  const [filterBy, setFilterBy] = useState("");

  return (
    <>
       <SidebarProvider>
            <StaffSidebar />
            <SidebarInset>
              <HeadersInsets />
              <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl font-semibold">Items Data</h1>
                  <ItemFormDialog
                    onItemAdded={() => setTrigger((prev) => prev + 1)}
                  />
                </div>
                <div className="flex gap-4 mb-4">
                  <Input
                    placeholder="Search Barang"
                    className="w-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Items</SelectItem>
                      <SelectItem value="price_asc">Price: Low to High</SelectItem>
                      <SelectItem value="price_desc">Price: High to Low</SelectItem>
                      <SelectItem value="name_asc">Name: A to Z</SelectItem>
                      <SelectItem value="name_desc">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <ItemTables
                  trigger={trigger}
                  searchQuery={searchQuery}
                  filterBy={filterBy}
                />
              </main>
            </SidebarInset>
          </SidebarProvider>
    </>
  );
};

export default StaffPageItems;
