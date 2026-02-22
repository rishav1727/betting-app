import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wmoyucrnajydgwxpwauy.supabase.co";
const supabaseKey = "YOUR_ANON_PUBLIC_KEYsb_publishable_DAV4kc-2gemTzwzrk4O4OA_E5RYAh8O"; // from project settings

export const supabase = createClient(supabaseUrl, supabaseKey);