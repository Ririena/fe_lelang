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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function UserTables({
  onUserAdded,
  trigger,
  searchQuery,
  filterBy,
}) {
  const [dataUser, setDataUser] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { token, loading, user } = useAuth();

  // Filter and sort users based on search query and filter selection
  const filteredUsers = useMemo(() => {
    let filtered = [...dataUser];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((user) => {
        // Add null checks for each property
        const username = user?.username?.toLowerCase() || "";
        const id = user?.id_user?.toString() || "";
        const role = user?.role?.toLowerCase() || "";

        return (
          username.includes(query) || id.includes(query) || role.includes(query)
        );
      });
    }

    // Apply role filter and sorting
    switch (filterBy) {
      case "admin":
        filtered = filtered.filter(
          (user) => user?.role?.toLowerCase() === "admin"
        );
        break;
      case "masyarakat":
        filtered = filtered.filter(
          (user) => user?.role?.toLowerCase() === "masyarakat"
        );
        break;
      case "petugas":
        filtered = filtered.filter(
          (user) => user?.role?.toLowerCase() === "petugas"
        );
        break;
      case "name_asc":
        filtered.sort((a, b) => {
          const nameA = a?.username?.toLowerCase() || "";
          const nameB = b?.username?.toLowerCase() || "";
          return nameA.localeCompare(nameB);
        });
        break;
      case "name_desc":
        filtered.sort((a, b) => {
          const nameA = a?.username?.toLowerCase() || "";
          const nameB = b?.username?.toLowerCase() || "";
          return nameB.localeCompare(nameA);
        });
        break;
      default:
        // No filtering for 'all'
        break;
    }

    return filtered;
  }, [dataUser, searchQuery, filterBy]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3001/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res) {
        setDataUser((prev) => prev.filter((user) => user.id_user !== id));
      }
    } catch (error) {
      console.error(error.message);
    }
  };

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
  }, [token, loading, trigger]);

  useEffect(() => {
    if (onUserAdded) {
      init();
    }
  }, [onUserAdded]);

  if (!dataUser.length) {
    return <div>Loading...</div>;
  }

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
              {filteredUsers.map((userItem) => {
                // userItem adalah data user di baris tabel

                // Tentukan apakah user login berhak delete userItem
                const canDelete = (() => {
                  if (!user || !user.role) return false;

                  const roleLogin = user.role.toLowerCase();
                  const roleTarget = userItem.role.toLowerCase();

                  if (roleLogin === "admin") {
                    // admin bisa delete petugas dan masyarakat saja
                    return (
                      roleTarget === "petugas" || roleTarget === "masyarakat"
                    );
                  } else if (roleLogin === "petugas") {
                    // petugas hanya bisa delete masyarakat
                    return roleTarget === "masyarakat";
                  } else {
                    // masyarakat tidak bisa delete siapa pun
                    return false;
                  }
                })();

                return (
                  <TableRow key={userItem.id_user}>
                    <TableCell>{userItem.id_user}</TableCell>
                    <TableCell>{userItem.username}</TableCell>
                    <TableCell className="capitalize">
                      {userItem.role}
                    </TableCell>
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
                          {/* Tampilkan Delete hanya jika bisa delete */}
                          {canDelete && (
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.preventDefault();
                                setSelectedUser(userItem.id_user);
                                setOpenDialog(true);
                              }}
                              className="cursor-pointer"
                            >
                              Delete
                            </DropdownMenuItem>
                          )}
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
                  Apakah Anda yakin ingin mendelete nya?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Aksi Anda saat ini bisa dibatalkan kalau anda mau.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpenDialog(false)}>
                  Batal
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleDelete(selectedUser);
                    setOpenDialog(false);
                  }}
                >
                  Ya, Hapus
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </main>
    </>
  );
}
