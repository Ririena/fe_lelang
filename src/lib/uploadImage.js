import { supabase } from "./supabase";

export const uploadImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("barang").upload(fileName, file);
  if (error) throw error;
  return `https://tivxoxflmcvopbcvrkgl.supabase.co/storage/v1/object/public/barang/${fileName}`;
};
