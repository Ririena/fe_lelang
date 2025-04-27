"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";


const RegisterPage = () => {
  const router = useRouter();

  const isHaveAccount = () => {
    router.push("/login");
  };

  return (
    <>
      <main className="flex justify-center items-center h-screen   px-4 py-8">
        <div>
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
          <Card className="w-[450px] mt-8">
            <CardHeader>
              <h1 className="text-lg font-semibold">Register</h1>
              <h2 className="text-md font-extralight">
                Create Your Account to Access Your Account
              </h2>
            </CardHeader>
            <CardContent>
              <Label className="text-md font-semibold">Username</Label>
              <Input placeholder="Enter Your Username" />
              <Label className="text-md font-semibold mt-2">Password</Label>
              <Input placeholder="Enter Your Password" />
              <Label className="text-md font-semibold mt-2">
                Confirm Password
              </Label>
              <Input placeholder="Enter Your Password Again" />
           
              <Button variant="orange" className="mt-6 w-full">
                Register
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default RegisterPage;
