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
const ProfileEdit = () => {
  const { user } = useAuth();
  const [updateForm, setUpdateForm] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`https://be-lelang.vercel.app/update`, updateForm, {
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
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your credentials such username and password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-3 md:grid-cols-1">
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
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
              Save
            </Button>
          </CardContent>
          <CardFooter className="grid grid-cols-1 gap-2 border-t mt-4 bg-gray-50/50 px-6 py-4">
            <CardTitle>Delete Account</CardTitle>
            <CardDescription>
              Delete Your Account And Its Resources
            </CardDescription>
            <Button variant="destructive" className="max-w-[150px] w-full">
              Delete Account
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};

export default ProfileEdit;
