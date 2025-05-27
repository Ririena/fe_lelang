"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ToastCard } from "@/components/ui/toast-card";

const ContactContent = () => {
  const { token } = useAuth();
  const [contactData, setContactData] = useState([]);

  async function init() {
    try {
      const res = await axios.get(`https://be-lelang.vercel.app/v1/contact`, {
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${token}`,
        },
      });
      setContactData(res.data.data);
    } catch (error) {
      toast.custom(() => (
        <ToastCard
          variant="destructive"
          title="Failed to Fetch"
          description={error.message || "Unknown error"}
        />
      ));
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <main className=" max-w-5xl ">
      <Card className="mt-4 border border-gray-200 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-orange-600">
            Contact Responses
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1">
            Manage your contact responses and inquiries from users.
          </CardDescription>
          <Separator className="mt-4" />
        </CardHeader>
        <CardContent className="mt-6">
          {Array.isArray(contactData) && contactData.length > 0 ? (
            <div className="grid grid-cols-1  gap-6">
              {contactData.map((contact, idx) => (
                <div
                  key={idx}
                  className="border border-gray-300 p-4 rounded-md"
                >
                  <h2 className="text-xl font-semibold text-orange-500 mb-2">
                    Title: {contact.title}
                  </h2>
                  <Separator className="my-2" />
                  <p className="text-gray-700 leading-relaxed">
                    Description: {contact.description}
                  </p>
                  <Separator className="mt-2" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic">
              No contact messages found.
            </p>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default ContactContent;
