"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, User } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const RegisterPage = () => {
  const router = useRouter();
  
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    password_confirmation: "",
  });

  const handlechange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "https://belelang.vercel.app/register",
      registerForm,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.error) {
      console.error(res.error);
    } else {
      router.push("/login");
    }

    toast("Register Berhasil, Silahkan Login", {
      position: "top-center"
    })
  };

  const isHaveAccount = () => {
    router.push("/login");
  };

  return (
    <>
      <main className="flex justify-center items-center h-screen px-4 py-8">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
          <div className="mx-auto text-center">
            <h1 className="text-3xl text-orange-500 font-semibold">
              Tawarin.com
            </h1>
            <h2 className="text-2xl text-black font-semibold">
              Register in to your account
            </h2>
            <p className="text-lg font-light">
              Or{" "}
              <span
                className="text-orange-400 hover:text-orange-600 hover:cursor-pointer"
                onClick={isHaveAccount}
              >
                already have an account?
              </span>
            </p>
          </div>
          <Card className="mt-8">
            <CardHeader>
              <h1 className="text-lg font-semibold">Register</h1>
              <h2 className="text-md font-extralight">
                Create Your Account to Access Your Account
              </h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Label className="text-md font-semibold">Username</Label>
                <Input
                  name="username"
                  onChange={handlechange}
                  placeholder="Enter Your Username"
                  icon={<User size={18} />}
                />
                <Label className="text-md font-semibold mt-2">Password</Label>
                <Input
                  placeholder="Enter Your Password"
                  name="password"
                  onChange={handlechange}
                  icon={<Eye size={18} />}
                />
                <Label className="text-md font-semibold mt-2">
                  Confirm Password
                </Label>
                <Input
                name="password_confirmation"
                onChange={handlechange}
                  placeholder="Enter Your Password Again"
                  icon={<Eye size={18} />}
                />

                <Button type="submit" variant="orange" className="mt-6 w-full">
                  Register
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default RegisterPage;
