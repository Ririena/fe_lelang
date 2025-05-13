import { supabase } from "./supabase";

export const uploadImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("barang").upload(fileName, file);
  if (error) throw error;
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
 return `${SUPABASE_URL}/storage/v1/object/public/barang/${fileName}`;
}