"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
const userDatas = [
  {
    id: 1,
    username: "Sayuti Melik",
    role: "admin",
  },
  {
    id: 2,
    username: "Adlin",
    role: "petugas",
  },
  {
    id: 3,
    username: "Ariena",
    role: "masyarakat",
  },
];

export default function UserTables() {
  const [dataUser, setDataUser] = useState([]);
  const { token, loading } = useAuth();

  async function init() {
    try {
      const res = await axios.get("http://localhost:3001/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!loading) {
        console.table(res.data.data);
        setDataUser(res.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (!loading) {
      init();
    }
  }, [token, loading]);
  return (
    <>
      <main className="mt-12">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">UID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {dataUser.map((user) => {
                return (
                  <TableRow key={user.id_user}>
                    <TableCell>{user.id_user}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.role}</TableCell>
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
                            Copy user ID
                          </DropdownMenuItem>
                          <Separator />
                          <DropdownMenuItem className="cursor-pointer">
                            View User Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            Delete User Detail
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
