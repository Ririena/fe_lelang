import React from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export default function ProfileOffers() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Penawaran Kamu</CardTitle>
          <CardDescription>
            Lihat penawaran yang pernah kamu lakukan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex-shrink-0 w-16 h-16 mr-4 overflow-hidden rounded-md">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Product"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  Violet Evergarden Visual Novel: Special Edition Kyoani
                  anniversary 17th
                </h4>
                <p className="mt-1 text-xs text-gray-500">
                  April 15, 2023 pukul 14:40 Siang
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900">
                  Rp. 180.000
                </span>
                <ChevronRight className="w-5 h-5 ml-2 text-gray-400" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t bg-gray-50/50 px-6 py-4">
          <Button
            variant="outline"
            className="text-orange-500  hover:bg-orange-600 hover:text-white"
          >
            Lihat Semua Penawaran
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
