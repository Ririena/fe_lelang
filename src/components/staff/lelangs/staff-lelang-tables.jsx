"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export function StaffLelangTables({ trigger }) {
  const [dataLelang, setDataLelang] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLelang, setSelectedLelang] = useState(null);
  const { token, loading } = useAuth();

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/lelangs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res) {
        setDataLelang((prev) => prev.filter((lelang) => lelang.id_lelang !== id));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  async function init() {
    try {
      const res = await axios.get("http://localhost:3001/lelangs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!loading) {
        setDataLelang(res.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (!loading) {
      init();
    }
  }, [token, loading, trigger]);

  return (
    <>
      <main className="mt-12">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Start Price</TableHead>
                <TableHead>Current Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {dataLelang.map((lelang) => {
                return (
                  <TableRow key={lelang.id_lelang}>
                    <TableCell>{lelang.id_lelang}</TableCell>
                    <TableCell>{lelang.item_name}</TableCell>
                    <TableCell>Rp {lelang.start_price.toLocaleString()}</TableCell>
                    <TableCell>Rp {lelang.current_price.toLocaleString()}</TableCell>
                    <TableCell>{lelang.status}</TableCell>
                    <TableCell>{new Date(lelang.start_date).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(lelang.end_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <span className="sr-only">Open menu</span>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <Separator />
                          <DropdownMenuItem className="cursor-pointer">
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            Edit Auction
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault();
                              setSelectedLelang(lelang.id_lelang);
                              setOpenDialog(true);
                            }}
                            className="cursor-pointer"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this auction?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpenDialog(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleDelete(selectedLelang);
                    setOpenDialog(false);
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
    </>
  );
} 