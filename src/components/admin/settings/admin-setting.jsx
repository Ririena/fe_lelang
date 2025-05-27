"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Globe,
  Mail,
  Shield,
  Users,
  CreditCard,
  Truck,
  SettingsIcon,
  Save,
  RotateCcw,
  Key,
  Database,
  User,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import { toast } from "sonner";
import { ToastCard } from "@/components/ui/toast-card";
const AdminSetting = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [saveStatus, setSaveStatus] = useState("idle");
  const { loading, token, user } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    notificationsEnabled: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.custom(() => (
        <ToastCard
          title="Error"
          description="Passwords do not match."
          variant="destructive"
        />
      ));
      return;
    }
    try {
      const res = await axios.put(
        "https://be-lelang.vercel.app/update",
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setSaveStatus("saved");
        toast.custom(() => (
          <ToastCard
            title="Settings Saved"
            description="Your settings have been saved successfully."
            variant="success"
          />
        ));
        setTimeout(() => setSaveStatus("idle"), 2000);
      }
    } catch (error) {
      toast.custom(() => (
        <ToastCard
          title="Error"
          description="Failed to update settings."
          variant="destructive"
        />
      ));
      return;
    }
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2000);
  };

  const handleReset = () => {
    console.log("Resetting settings...");
  };
  return (
    <>
      <main>
        <div className="space-y-6">
          <div className="flex items-center justify-between"></div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 gap-4">
              <TabsTrigger
                value="account"
                className="flex items-center justify-center"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account Management</span>
              </TabsTrigger>
              <TabsTrigger
                value="general"
                className="flex items-center justify-center"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">General</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Account Settings
                  </CardTitle>
                  <CardDescription>
                    Manage your account settings and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <Label htmlFor="username" className="block">
                      Username
                    </Label>
                    <Input
                      type="text"
                      id="username"
                      placeholder="Enter your username"
                      name="username"
                      onChange={handleInputChange}
                      value={formData.username}
                    />

                    <Label htmlFor="password" className="block">
                      Password
                    </Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      onChange={handleInputChange}
                      value={formData.password}
                    />
                    <Label htmlFor="confirm-password" className="block">
                      Confirm Password
                    </Label>
                    <Input
                      type="password"
                      id="confirm-password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      onChange={handleInputChange}
                      value={formData.confirmPassword}
                    />
                    <Button
                      className="w-full"
                      variant="orange"
                      disabled={loading}
                      type="submit"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {"Save Changes" ? "Save Changes" : "Saving..."}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
};

export default AdminSetting;
