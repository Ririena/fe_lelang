"use client";

import { SidebarInset } from "@/components/ui/sidebar";
import { HeadersInsets } from "@/components/staff/headers-inset";
import { Button } from "@/components/ui/button";
import { StaffItemTables } from "./staff-item-tables";
import { useState } from "react";
import { AddItemDialog } from "./add-item-dialog";

export function StaffItemsContent() {
  const [openDialog, setOpenDialog] = useState(false);
  const [trigger, setTrigger] = useState(0);

  return (
    <SidebarInset>
      <HeadersInsets />
      <main className="mt-12">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-semibold text-3xl">Items Management</h1>
            <p className="text-lg font-light">Manage your auction items</p>
          </div>
          <Button variant="orange" onClick={() => setOpenDialog(true)}>
            Add Item
          </Button>
        </div>
        <StaffItemTables trigger={trigger} />
        <AddItemDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          onItemAdded={() => setTrigger((prev) => prev + 1)}
        />
      </main>
    </SidebarInset>
  );
} 