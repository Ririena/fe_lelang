'use client'
import { StaffSidebar } from "@/components/staff/staff-sidebar";
import UserFormDialog from "@/components/admin/users/user-form-dialog";
import UserTables from "@/components/admin/users/user-tables";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HeadersInsets from "@/components/staff/headers-inset";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Plus, UserPlus } from "lucide-react";
import React, { useState } from "react";
const StaffPageUsers = () => {
  const [trigger, setTrigger] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("");

  return (
    <>
   <SidebarProvider>
      <StaffSidebar />
      <SidebarInset>
        <HeadersInsets />
        <main className="flex-1 p-6">
          <div className="flex justify-between">
            <h1 className="text-xl font-semibold">Data Users</h1>
            <UserFormDialog
              onUserAdded={() => setTrigger((prev) => prev + 1)}
            />
          </div>
          <div className="flex gap-4 mt-6">
            <Input
              className="w-md"
              placeholder="Search Users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Pengguna</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="masyarakat">Masyarakat</SelectItem>
                <SelectItem value="petugas">Petugas</SelectItem>
                <SelectItem value="name_asc">Nama: A ke Z</SelectItem>
                <SelectItem value="name_desc">Nama: Z ke A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <UserTables 
            className="" 
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

export default StaffPageUsers;
