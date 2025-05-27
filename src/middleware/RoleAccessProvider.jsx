"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/app/loading";

const accessRules = [
  {
    paths: ["/dashboard", "/admin"],
    allowRoles: ["admin"],
    adminLoginPath: "/admin/login",
  },
  {
    paths: ["/dashboard", "/staff"],
    allowRoles: ["petugas"],
    adminLoginPath: "/login",
  },
  {
    paths: ["/lelang", "/profile"],
    allowRoles: ["masyarakat", "admin", "petugas"],
    adminLoginPath: "/login",
  },
];

const publicPaths = ["/login", "/admin/login", "/register", "/not-authorized"];

export default function RoleAccessProvider({ children }) {
  const { user, token, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    // Check if current path is public
    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
    if (isPublicPath) return;

    // Find applicable access rule for current path
    const applicableRule = accessRules.find((rule) =>
      rule.paths.some((path) => pathname.startsWith(path))
    );

    if (applicableRule) {
      // Path requires authentication
      if (!token || !user?.role) {
        // Not authenticated - redirect to appropriate login
        const loginPath =
          pathname.startsWith("/admin") || pathname.startsWith("/petugas")
            ? "/admin/login"
            : "/login";
        router.replace(loginPath);
      } else if (!applicableRule.allowRoles.includes(user.role)) {
        // Authenticated but not authorized - redirect to not-authorized
        router.replace("/not-authorized");
      }
    } else if (!token) {
      // Path doesn't have specific rules but requires authentication
      router.replace("/login");
    }
  }, [loading, user, token, pathname, router]);

  if (
    loading ||
    (!token && !publicPaths.some((path) => pathname.startsWith(path)))
  ) {
    return <Loading />;
  }

  return children;
}
