"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export function AddLelangDialog({ open, onOpenChange, onLelangAdded }) {
  const [formData, setFormData] = useState({
    item_id: "",
    start_price: "",
    start_date: "",
    end_date: "",
  });
  const [items, setItems] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:3001/items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(res.data.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (open) {
      fetchItems();
    }
  }, [open, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3001/lelangs",
        {
          item_id: parseInt(formData.item_id),
          start_price: parseInt(formData.start_price),
          start_date: formData.start_date,
          end_date: formData.end_date,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        onLelangAdded();
        onOpenChange(false);
        setFormData({
          item_id: "",
          start_price: "",
          start_date: "",
          end_date: "",
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Auction</DialogTitle>
          <DialogDescription>
            Create a new auction for an item.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="item" className="text-right">
                Item
              </Label>
              <Select
                value={formData.item_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, item_id: value })
                }
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select item" />
                </SelectTrigger>
                <SelectContent>
                  {items.map((item) => (
                    <SelectItem key={item.id_item} value={item.id_item.toString()}>
                      {item.name} - Rp {item.price.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start_price" className="text-right">
                Start Price
              </Label>
              <Input
                id="start_price"
                type="number"
                value={formData.start_price}
                onChange={(e) =>
                  setFormData({ ...formData, start_price: e.target.value })
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start_date" className="text-right">
                Start Date
              </Label>
              <Input
                id="start_date"
                type="datetime-local"
                value={formData.start_date}
                onChange={(e) =>
                  setFormData({ ...formData, start_date: e.target.value })
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end_date" className="text-right">
                End Date
              </Label>
              <Input
                id="end_date"
                type="datetime-local"
                value={formData.end_date}
                onChange={(e) =>
                  setFormData({ ...formData, end_date: e.target.value })
                }
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Auction</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 