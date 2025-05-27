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

const ProfileOffersPage = () => {
  const [data, setData] = useState("");
  const [offers, setOffers] = useState([]);
  const [myBids, setMyBids] = useState([]);

  const { token, loading } = useAuth();

  const fetchDataUser = async () => {
    try {
      const res = await axios.get("https://be-lelang.vercel.app/profile", {
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
      const res = await axios.get("https://be-lelang.vercel.app/v1/my-offer", {
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

  const fetchBids = async () => {
    try {
      const res = await axios.get("https://be-lelang.vercel.app/v1/my-bids", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!loading && res.data?.data) {
        setMyBids(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch bids:", error);
    }
  };

  useEffect(() => {
    if (!loading && token) {
      fetchDataUser();
      fetchOffers();
      fetchBids();
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
          <ProfileOffers offers={offers} />
        </div>
      </div>
    </main>
  );
};

export default ProfileOffersPage;
