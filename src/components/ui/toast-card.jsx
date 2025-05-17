import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, AlertOctagon } from "lucide-react";

const variantStyles = {
  success: "bg-green-50 border-green-300 text-green-800",
  error: "bg-yellow-50 border-yellow-300 text-yellow-800",
  destructive: "bg-red-50 border-red-300 text-red-800",
};

const variantIcons = {
  success: <CheckCircle className="text-green-600" />,
  error: <AlertTriangle className="text-yellow-600" />,
  destructive: <AlertOctagon className="text-red-600" />,
};

export function ToastCard({ variant = "success", title, description }) {
  const icon = variantIcons[variant];

  return (
    <div
      className={cn(
        "fixed top-5 left-1/2 transform -translate-x-1/2 z-50",
        "max-w-[calc(100%-2rem)] w-full sm:w-auto"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border rounded-xl p-4 shadow-md bg-white sm:w-[400px] box-border",
          variantStyles[variant]
        )}
      >
        <div className="mt-0.5">{icon}</div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}