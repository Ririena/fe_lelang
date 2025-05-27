"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  ArrowLeft,
  Home,
  Mail,
  LogIn,
  AlertTriangle,
} from "lucide-react";

export default function NotAuthorizePage() {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  const handleGoBack = () => {
    if (canGoBack) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-red-600" />
            </div>

            <div className="text-6xl font-bold text-gray-300 mb-2">403</div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
              You don't have permission to access this page. This could be
              because:
            </p>
            <div className="text-left mb-8 space-y-3">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  You're not signed in to your account
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  Your account doesn't have the required permissions
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  The page requires admin or staff access
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  Your session may have expired
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/sign-in" className="w-full">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>

              <div className="grid grid-cols-1 gap-3 mt-4">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full border-gray-300 hover:bg-gray-50"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                </Link>
              </div>

              <Link href="/contact">
                <Button
                  variant="ghost"
                  className="w-full text-gray-600 hover:text-gray-800"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                If you believe this is an error, please contact our support team
                for assistance.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? Visit our{" "}
            <Link
              href="/contact"
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Help Center
            </Link>{" "}
            or{" "}
            <Link
              href="/contact"
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
