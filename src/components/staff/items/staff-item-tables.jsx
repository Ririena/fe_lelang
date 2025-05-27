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

export function StaffItemTables({ trigger }) {
  const [dataItem, setDataItem] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { token, loading } = useAuth();

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://be-lelang.vercel.app/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res) {
        setDataItem((prev) => prev.filter((item) => item.id_item !== id));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  async function init() {
    try {
      const res = await axios.get("https://be-lelang.vercel.app/items", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!loading) {
        setDataItem(res.data.data);
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
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {dataItem.map((item) => {
                return (
                  <TableRow key={item.id_item}>
                    <TableCell>{item.id_item}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>Rp {item.price.toLocaleString()}</TableCell>
                    <TableCell>{item.status}</TableCell>
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
                            Edit Item
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={(e) => {
                              e.preventDefault();
                              setSelectedItem(item.id_item);
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
                  Are you sure you want to delete this item?
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
                    handleDelete(selectedItem);
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