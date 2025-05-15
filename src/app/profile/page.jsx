"use client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import ProfileOffers from "@/components/profile/profile-offers";
import { ProfileMenu } from "@/components/profile/profile-menu";
import ProfileEdit from "@/components/profile/profile-edit";
const ProfilePage = () => {
  const [data, setData] = useState("");
  const [offers, setOffers] = useState([]);

  const { token, loading, user } = useAuth();
  useEffect(() => {
    if (!loading && token) {
      fetchOffers();
    }
  }, [loading, token]);
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
  const fetchOffers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/v1/my-offer", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!loading && res.data?.data) {
        setOffers(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch offers:", error);
      setOffers([]);
    }
  };

  useEffect(() => {
    if (!loading && token) {
      fetchDataUser();
    }
  }, [loading, token]);

  return (
    <>
      <main className="container px-4 py-8 mx-auto">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <ProfileMenu data={data} />
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
                  <ProfileEdit />
                </Card>
              </TabsContent>

              <TabsContent value="offers" className="mt-0">
                <ProfileOffers offers={offers} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
