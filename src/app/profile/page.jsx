"use client";
import {
  Bell,
  ChevronRight,
  CreditCard,
  LogOut,
  Package,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import ProfileNavigation from "@/components/profile/profile-navigation";
import ProfileOffers from "@/components/profile/profile-offers";
const ProfilePage = () => {
  const [data, setData] = useState("");
  const [updateForm, setUpdateForm] = useState({
    username: "",
    password: "",
  });
  const { token, loading, user} = useAuth();
  const fetchDataUser = async () => {
    try {
      const res = await axios.get("http://localhost:3001/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!loading) {
        setData(res.data);
        console.table(res.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (!loading && token) {
      fetchDataUser();
    }
  }, [loading, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://localhost:3001/update`, updateForm, {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Update Berhasil");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setUpdateForm((prev) => ({
      ...prev,
      [name]: name === "gambar" ? files[0] : value,
    }));
  };

  return (
    <>
      <main className="container px-4 py-8 mx-auto">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
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

                <Button
                  variant="outline"
                  className="w-full mt-6 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Keluar
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9">
            <Tabs defaultValue="profile">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="profile">Informasi Pribadi</TabsTrigger>
                  <TabsTrigger value="offers">Penawaran Saya</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="profile" className="mt-0">
                <Card>
                  <form onSubmit={handleSubmit}>
                    <CardHeader>
                      <CardTitle>Pengaturan Akun</CardTitle>
                      <CardDescription>
                        Atur preferensi akun anda
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="fullName"
                            className="text-sm font-medium text-gray-700"
                          >
                            Nama Lengkap
                          </label>
                          <Input
                            id="fullName"
                            name="username"
                            placeholder={user ? user.username : "Loading..."}
                            type="text"
                            value={updateForm.username}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <Input
                            id="password"
                            type="password"
                            name="password"
                            value={updateForm.password}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t mt-4 bg-gray-50/50 px-6 py-4">
                      <Button variant="outline">Batal</Button>
                      <Button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        Simpan Perubahan
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>

              <TabsContent value="offers" className="mt-0">
                <ProfileOffers />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
