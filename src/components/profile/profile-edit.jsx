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
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Pengaturan Akun</CardTitle>
          <CardDescription>Atur preferensi akun anda</CardDescription>
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
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
            Simpan Perubahan
          </Button>
        </CardFooter>
      </form>
    </>
  );
};

export default ProfileEdit;
