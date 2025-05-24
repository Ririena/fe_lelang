"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ToastCard } from "@/components/ui/toast-card";
const ContactContent = () => {
  const { token, loading, user } = useAuth();
  const [contactData, setContactData] = useState([]);

  async function init() {
    try {
      const res = await axios.get(`http://localhost:3001/v1/contact`, {
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setContactData(res.data.data);
    } catch (error) {
      toast.custom(() => (
        <ToastCard
          variant="destructive"
          title="Failed to Fetch"
          description={`${error.message}`}
        />
      ));
    }
  }

  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <main>
        <Card className="mt-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Contact Response
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your contact responses and inquiries from users.
            </CardDescription>
            <Separator />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {Array.isArray(contactData) && contactData.length > 0 ? (
                contactData.map((contact, index) => (
                  <Card
                    key={index}
                    className="rounded-sm bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="ml-4 py-3">
                      <h1 className="text-orange-500 text-lg font-semibold">
                        {contact.title}
                      </h1>
                      <p className="text-base font-normal text-gray-700">
                        {contact.description}
                      </p>
                    </div>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No contact messages found.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default ContactContent;
