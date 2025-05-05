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
              {userDatas.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
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
                          <DropdownMenuItem className="cursor-pointer">Copy user ID</DropdownMenuItem>
                          <Separator />
                          <DropdownMenuItem className="cursor-pointer">View User Detail</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">Edit User</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">Delete User Detail</DropdownMenuItem>
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
