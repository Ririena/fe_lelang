"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { HeadersInsets } from "@/components/staff/headers-inset";
import { Button } from "@/components/ui/button";
import { StaffLelangTables } from "./staff-lelang-tables";
import { useState } from "react";
import { AddLelangDialog } from "./add-lelang-dialog";

export function StaffLelangContent() {
  const [openDialog, setOpenDialog] = useState(false);
  const [trigger, setTrigger] = useState(0);

  return (
    <SidebarInset>
      <HeadersInsets />
      <main className="mt-12">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-3xl">Auction Management</h1>
            <p className="text-lg font-light">Manage your auctions</p>
          </div>
          <Button variant="orange" onClick={() => setOpenDialog(true)}>
            Add Auction
          </Button>
        </div>
        <StaffLelangTables trigger={trigger} />
        <AddLelangDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          onLelangAdded={() => setTrigger((prev) => prev + 1)}
        />
      </main>
    </SidebarInset>
  );
} 