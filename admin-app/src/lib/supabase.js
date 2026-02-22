import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wmoyucrnajydgwxpwauy.supabase.co";
const supabaseKey = "sb_publishable_DAV4kc-2gemTzwzrk4O4OA_E5RYAh8O";

export const supabase = createClient(supabaseUrl, supabaseKey);