import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://tivxoxflmcvopbcvrkgl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpdnhveGZsbWN2b3BiY3Zya2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNjE5MzMsImV4cCI6MjA1ODYzNzkzM30.g1_UH_tAazmLCUuYfyQqSyvnsmPEJto59CFBgKSx1tU"
);
