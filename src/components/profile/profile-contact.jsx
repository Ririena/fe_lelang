"use client";
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const ProfileContact = ({myContact}) => {
  return (
    <>
      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Contact Mail</CardTitle>
            <CardDescription>
              See your contact mail and reply if needed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* <div className="space-y-4">
                {myContact.length === 0 ? (
                    <p className="text-gray-500">
                        You have no contact mail.
                    </p>
                ) : (
                    myContact.map((contact) => (
                        <div
                            key={contact.id}
                            className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                        >
                            <div className="ml-4 flex-1">
                                <h4 className="text-md font-semibold">{contact.title}</h4>
                                <p className="text-sm text-gray-500">
                                    {new Date(contact.created_at).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {contact.description}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div> */}
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default ProfileContact;
