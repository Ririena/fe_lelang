"use client";
import {
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { ToastCard } from "../ui/toast-card";

const ProfileEdit = () => {
  const { user, token } = useAuth();
  const [updateForm, setUpdateForm] = useState({
    username: "",
    password: "",
    password_confirmation: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && user.username) {
      setUpdateForm((prev) => ({
        ...prev,
        username: user.username,
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (updateForm.password.length < 8) {
      toast.custom(() => (
        <ToastCard
          title="Update Failed"
          variant="destructive"
          description="Password must be at least 8 characters long."
        />
      ));
      setIsLoading(false);
      return;
    }

    if (updateForm.password !== updateForm.password_confirmation) {
      toast.custom(() => (
        <ToastCard
          title="Update Failed"
          variant="destructive"
          description="Password and confirmation do not match."
        />
      ));
      setIsLoading(false);
      return;
    }

    const { password_confirmation, ...dataToSend } = updateForm;
    try {
      const res = await axios.put(`http://localhost:3001/update`, dataToSend, {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.custom(() => (
        <ToastCard
          title="Update Success"
          variant="success"
          description="Profile updated successfully."
        />
      ));
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
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
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your credentials such as username and password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3 md:grid-cols-1">
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-gray-700"
              >
                Nama Lengkap
              </Label>
              <Input
                id="fullName"
                name="username"
                type="text"
                value={updateForm.username}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={updateForm.password}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password_confirmation"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password
              </Label>
              <Input
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={updateForm.password_confirmation || ""}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </CardContent>
        <CardFooter className="grid grid-cols-1 gap-2 border-t mt-4 bg-gray-50/50 px-6 py-4">
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Delete Your Account And Its Resources
          </CardDescription>
          <Button
            variant="destructive"
            className="max-w-[150px] w-full"
            disabled={isLoading}
          >
            Delete Account
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProfileEdit;
