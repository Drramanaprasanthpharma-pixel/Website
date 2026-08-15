const SUPABASE_URL = "https://zgphixxavlifdvlvmrbf.supabase.co";
const SUPABASE_KEY = "sb_publishable_ncFJfHuFFuPRJpO5tBbh6w_7Oq9HsG8";

window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
