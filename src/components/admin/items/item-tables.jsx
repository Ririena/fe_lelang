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

const itemList = [
  {
    id: 1,
    nama_barang: "VIOLET VN",
    harga_awal: 150000,
    deskripsi: "Lorem Ipsum Dolor Sit Amet",
  },
  {
    id: 2,
    nama_barang: "VIOLET TS",
    harga_awal: 120000,
    deskripsi: "Loremi Dolor Sit Amet",
  },
];

export default function ItemTables() {
  return (
    <>
      <main className="mt-12">
        <div className="rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Barang</TableHead>
                <TableHead>Nama Barang</TableHead>
                <TableHead>Harga Awal</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {itemList.map((data) => {
                return (
                  <>
                    <TableRow key={data.id}>
                      <TableCell>{data.id}</TableCell>
                      <TableCell>{data.nama_barang}</TableCell>
                      <TableCell>{data.harga_awal}</TableCell>
                      <TableCell>{data.deskripsi}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <MoreHorizontal className="size-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <Separator />
                            <DropdownMenuItem>Copy Item ID</DropdownMenuItem>
                            <Separator />
                            <DropdownMenuItem className="cursor-pointer">
                              Lihat Detail Barang
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              Edit Barang
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer text-red-600">
                              Delete Barang
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </main>
    </>
  );
}
