'use client'
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, allowRoles = [] }) {
  const { user, token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token || !user) {
      router.push("/login");
    } else if (!allowRoles.includes(user.role)) {
      router.push("/not-authorized");
    }
  }, [token, user, router, allowRoles]);

  return children;
}
