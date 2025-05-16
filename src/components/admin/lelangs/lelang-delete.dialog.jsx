"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/context/AuthContext";

const LelangDeleteDialog = ({ open, onOpenChange, idLelang, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {token} = useAuth()

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:3001/auctions/${idLelang}`, {
        headers: {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
        }
      });
      setLoading(false);
      onDeleteSuccess(); 
      onOpenChange(false); 
    } catch (err) {
      setLoading(false);
      setError("Gagal menghapus data.");
      console.error(err);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Yakin ingin menghapus barang ini?</AlertDialogTitle>
        </AlertDialogHeader>
        {error && <div className="text-red-600 px-6">{error}</div>}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600"
            disabled={loading}
          >
            {loading ? "Menghapus..." : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LelangDeleteDialog;
