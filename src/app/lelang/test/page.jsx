'use client'
import Image from "next/image"
import { Clock, Heart, X } from "lucide-react"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
const TestPage = () => {
  return (
    <>
      <main>
        <h1 className="md:text-2xl text-xl font-semibold mt-12">
          Detail Lelang
        </h1>
        <section className="grid grid-cols-2 mt-6">
          <div className="w-sm bg-white rounded-lg shadow-lg py-0 ">
            <Image
              className="w-[480px] h-auto object-fit rounded-t-lg"
              src="/auction-landing.jpg"
              alt="Violet Evergarden Auction"
              width={550}
              height={280}
            />
          </div>
          <Card className="w-[580px] h-[400px] ml-4 rounded-lg shadow-lg">
            <CardContent>
              <h1 className="md:text-2xl text-xl font-semibold">
                Violet Evergardens Visual Novel, Special Edition Kyoani
                anniversary 17th
              </h1>
              <div className="flex flex-row gap-4 mt-3">
                <Badge variant="orange" className="mt-2">
                  Visual Novel
                </Badge>
                <Badge variant="orange" className="mt-2">
                  Books
                </Badge>
              </div>
              <section className="border-1 bg-[#FFF7ED] h-auto border-[#F4DEC3] rounded-none mt-8">
                <section className="flex justify-between ml-2">
                  <p className="md:text-lg text-sm">Tawaran Saat Ini</p>
                  <p>Rp. 125.000</p>
                </section>
                <section className="flex justify-between mt-2">
                  <p></p>
                  <p></p>
                </section>
              </section>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};

export default TestPage;
