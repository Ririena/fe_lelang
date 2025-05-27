import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProfileNavigation from "./profile-navigation";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
export const ProfileMenu = ({ data }) => {
  const router = useRouter();

  const {logout} = useAuth();

  const handleLogout = () => {
  logout(); 
  router.push('/login');
};

  return (
    <>
      <Card>
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24 border-4 border-orange-100">
              <AvatarImage src="/placeholder.svg" alt="Ariena Kimi" />
              <AvatarFallback className="text-xl bg-orange-500 text-white">
                AK
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-xl font-bold">
              {data.user ? data.user.username : "Loading"}
            </h2>
            <p className="text-sm text-gray-500">
              {data.user ? data.user.role : "Loading.."}
            </p>
            <div className="px-3 py-1 mt-2 text-xs font-medium text-orange-700 bg-orange-100 rounded-full">
              24 Transaksi
            </div>
            <p className="mt-3 text-xs text-gray-600">
              Seorang Web Programmer Asli
              <br />
              Langsung yang telah membuka toko ini
            </p>
          </div>

          <Separator className="my-4" />
          <ProfileNavigation />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full mt-6 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Keluar dari akun?</AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah kamu yakin ingin keluar? Kamu harus login kembali untuk
                  mengakses akunmu.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700 hover:cursor-pointer" onClick={handleLogout}>
                  Ya, Keluar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </>
  );
};
