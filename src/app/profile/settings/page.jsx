"use client";

import { ProfileMenu } from "@/components/profile/profile-menu";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useAuthFetch } from "@/lib/fetch";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileEdit from "@/components/profile/profile-edit";
const ProfileSettingPage = () => {
  const { token, loading } = useAuth();
  const [data, setData] = useState("");
  const fetchWithAuth = useAuthFetch(token, loading);

  useEffect(() => {
    const fetchAll = async () => {
      const userData = await fetchWithAuth(`http://localhost:3001/profile`);

      if (userData) {
        setData(userData);
        console.table(userData);
      }
    };
    fetchAll();
  }, [loading, token]);
  return (
    <>
      <main className="container px-4 py-8 mx-auto">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <ProfileMenu data={data} />
          </div>
          <div className="md:col-span-9">
            <Tabs defaultValue="profile">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="grid w-full  gap-4 grid-cols-3 ">
                  <TabsTrigger value="profile">Informasi Pribadi</TabsTrigger>
                  <TabsTrigger value="password">Penawaran Saya</TabsTrigger>
                  <TabsTrigger value="appearance">
                    Lelang Dimenangkan Saya
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="profile" className="mt-0">
        <ProfileEdit/>
              </TabsContent>

              <TabsContent value="password" className="mt-0"></TabsContent>

              <TabsContent value="appearance" className="mt-0"></TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileSettingPage;
