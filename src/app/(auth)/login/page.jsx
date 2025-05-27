"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ToastCard } from "@/components/ui/toast-card";

const LoginPage = () => {
  const router = useRouter();
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/", { scroll: false });
    }
  }, [user, loading]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loadingLocal) return;
    setLoadingLocal(true);

    try {
      const res = await axios.post(
        "http://localhost:3001/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      await login(res.data.token);
      toast.custom(() => (
        <ToastCard
          variant="success"
          title="Login Berhasil"
          description="Akan dialihkan ke halaman utama"
        />
      ));

      setTimeout(() => {
        router.replace("/", { scroll: false });
      }, 2000);
    } catch (error) {
      toast.custom(() => (
        <ToastCard
          variant="error"
          title="Login Gagal"
          description={
            error.response?.data?.message || "Terjadi kesalahan server"
          }
        />
      ));
    } finally {
      setLoadingLocal(false);
    }
  };

  const isDontHaveAccount = () => {
    router.replace("/register", { scroll: false });
  };

  return (
    <main className="flex justify-center items-center h-screen px-4 py-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        <div className="mx-auto text-center">
          <h1 className="text-3xl text-orange-500 font-semibold">
            Tawarin.com
          </h1>
          <h2 className="text-2xl text-black font-semibold">
            Login to your account
          </h2>
          <p className="text-lg font-light">
            Or{" "}
            <span
              className="text-orange-400 hover:text-orange-600 hover:cursor-pointer"
              onClick={isDontHaveAccount}
            >
              don't have an account?
            </span>
          </p>
        </div>
        <Card className="mt-8">
          <CardHeader>
            <h1 className="text-lg font-semibold">Login</h1>
            <h2 className="text-md font-extralight">
              Enter your credentials to access your account
            </h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <Label className="text-md font-semibold">Username</Label>
              <Input
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Your Username"
                icon={<User size={18} />}
                value={username}
                required
              />
              <div className="flex justify-between mt-2">
                <Label className="text-md font-semibold">Password</Label>
                <p className="text-orange-500 font-thin text-md cursor-pointer select-none">
                  Forgot Your Password?
                </p>
              </div>
              <Input
                placeholder="Enter Your Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                icon={<Eye size={18} />}
                value={password}
                required
              />
              <Button
                type="submit"
                variant="orange"
                className="mt-6 w-full"
                disabled={loadingLocal}
              >
                {loadingLocal ? "Processing..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default LoginPage;
