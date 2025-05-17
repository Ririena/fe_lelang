'use client';

import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash2, ServerCrash } from "lucide-react";

export default function PlaygroundPage() {
  return (
    <div className="p-4 space-y-4">
      {/* Success Toast */}
      <Button
        onClick={() =>
          toast.custom(() => (
            <div className="flex items-start gap-3 bg-green-50 border border-green-300 rounded-xl p-4 shadow-md w-full max-w-sm">
              <CheckCircle className="text-green-600 mt-0.5" />
              <div>
                <p className="text-green-800 font-semibold">Success</p>
                <p className="text-sm text-green-700">Action completed successfully!</p>
              </div>
            </div>
          ))
        }
      >
        Show Success Toast
      </Button>

      {/* Destructive Toast */}
      <Button
        variant="destructive"
        onClick={() =>
          toast.custom(() => (
            <div className="flex items-start gap-3 bg-red-50 border border-red-300 rounded-xl p-4 shadow-md w-full max-w-sm">
              <Trash2 className="text-red-600 mt-0.5" />
              <div>
                <p className="text-red-800 font-semibold">Deleted</p>
                <p className="text-sm text-red-700">This action cannot be undone.</p>
              </div>
            </div>
          ))
        }
      >
        Show Destructive Toast
      </Button>

      {/* Server Error Toast */}
      <Button
        onClick={() =>
          toast.custom(() => (
            <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-300 rounded-xl p-4 shadow-md w-full max-w-sm">
              <ServerCrash className="text-yellow-600 mt-0.5" />
              <div>
                <p className="text-yellow-800 font-semibold">Server Error</p>
                <p className="text-sm text-yellow-700">Please try again later.</p>
              </div>
            </div>
          ))
        }
      >
        Show Server Error Toast
      </Button>
    </div>
  );
}
