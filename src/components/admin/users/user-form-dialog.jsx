"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const UserFormDialog = ({ onUserAdded }) => {
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
    password_confirmation: "",
    role: "",
  });

  const { token } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (value) => {
    setUserForm((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://be-lelang.vercel.app/add-users", userForm, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      });
      toast.success("User registered successfully!");
      setUserForm({ username: "", password: "", password_confirmation: "", role: "" });
      if (onUserAdded) {
        onUserAdded();
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="orange">Register New User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Register User</DialogTitle>
        <DialogDescription>Fill the form to register a new user.</DialogDescription>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={userForm.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={userForm.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div>
            <Label htmlFor="password_confirmation">Confirm Password</Label>
            <Input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={userForm.password_confirmation}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>
          <div>
            <Label htmlFor="role" className="mb-2">Role</Label>
            <Select onValueChange={handleRoleChange} value={userForm.role} className="w-full">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="petugas">Petugas</SelectItem>
                  <SelectItem value="masyarakat">Masyarakat</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" variant="orange">Register User</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;
