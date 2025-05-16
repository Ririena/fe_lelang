import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { useState } from "react";


const ProfileBids = ({myBids}) => {
  const [history, setHistory] = useState([]);
  return (
    <main className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Penawaran Kamu</CardTitle>
          <CardDescription>
            Lihat penawaran yang pernah anda lakukan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myBids.length === 0 ? (
              <p className="text-gray-500">
                Kamu belum pernah melakukan penawaran.
              </p>
            ) : (
              myBids.map((bid) => (
                <div
                  key={bid.id_history}
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                >
                  <Image
                    src={bid.gambar}
                    alt={bid.nama_barang}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <h4 className="text-md font-semibold">{bid.nama_barang}</h4>
                    <p className="text-sm text-gray-500">
                      Tanggal Lelang:{" "}
                      {new Date(bid.tgl_lelang).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Harga Penawaran: Rp{" "}
                      {bid.harga_penawaran.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default ProfileBids;
