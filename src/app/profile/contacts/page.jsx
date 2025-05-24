"use client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import ProfileOffers from "@/components/profile/profile-offers";
import { ProfileMenu } from "@/components/profile/profile-menu";
import ProfileEdit from "@/components/profile/profile-edit";
import ProfileBids from "@/components/profile/profile-bids";

const ProfileSettingsPage = () => {
  const [data, setData] = useState("");
  const [offers, setOffers] = useState([]);
  const [myBids, setMyBids] = useState([]);

  const { token, loading } = useAuth();

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

  return (
    <main className="container px-4 py-6 mx-auto max-w-7xl">
      <div className="grid gap-6 md:grid-cols-12">
        {/* Profile Menu */}
        <div className="col-span-12">
          <ProfileMenu data={data} />
        </div>

        {/* Tabs Content */}
        <div className="col-span-12">

        </div>
      </div>
    </main>
  );
};

export default ProfileSettingsPage;
