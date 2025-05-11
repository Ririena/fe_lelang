import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
export default function HeadersInsets() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger />
      <div>
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, Admin</p>
      </div>
    </header>
  );
}
