import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "Yhttps://wmoyucrnajydgwxpwauy.supabase.co"
const supabaseKey = "Ysb_publishable_DAV4kc-2gemTzwzrk4O4OA_E5RYAh8O"

export const supabase =
  createClient(supabaseUrl, supabaseKey)