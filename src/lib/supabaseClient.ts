import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Reads public keys from env; safe to expose in browser builds
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Don't throw at import time in Next.js, but warn for visibility
  // eslint-disable-next-line no-console
  console.warn('[supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

let browserClient: SupabaseClient | undefined

export const getSupabaseClient = (): SupabaseClient => {
  if (!browserClient) {
    browserClient = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '')
  }
  return browserClient
}

export default getSupabaseClient()
