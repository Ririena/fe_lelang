"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const LoginPage = () => {
    const router = useRouter();

    const isDontHaveAccount = () => {
        router.push("/register");
        return;
    }
  return (
    <>
      <main className="flex justify-center items-center h-screen   px-4 py-8">
        <div>
          <div className="mx-auto text-center">
            <h1 className="text-3xl text-orange-500 font-semibold">
              Tawarin.com
            </h1>
            <h2 className="text-2xl text-black font-semibold">
              Login in to your account
            </h2>
            <p className="text-lg font-light">
              Or{" "}
              <span className="text-orange-400 hover:text-orange-600 hover:cursor-pointer" onClick={isDontHaveAccount}>
                don't have an account?
              </span>
            </p>
          </div>
          <Card className="w-[450px] mt-8">
            <CardHeader>
              <h1 className="text-lg font-semibold">Register</h1>
              <h2 className="text-md font-extralight">
                Enter your credentials to access your accounts
              </h2>
            </CardHeader>
            <CardContent>
              <Label className="text-md font-semibold">Username</Label>
              <Input placeholder="Enter Your Username" />
              <div className="flex justify-between mt-2">
                <Label className="text-md font-semibold ">Password</Label>
                <p className="text-orange-500 font-thin text-md">
                  Forgot Your Password
                </p>
              </div>
              <Input
                placeholder="Enter Your Password"
                type="password"
                name="password"
              />
        

              <Button variant="orange" className="mt-6 w-full">
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
