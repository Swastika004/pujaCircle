import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

/**
 * Public Supabase Client
 * Initialized with Anon key for user-facing auth operations.
 */
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Privileged Supabase Admin Client
 * Initialized with Service Role key for elevated backend operations
 * (e.g., verifying user IDs, managing identities, and administrative triggers).
 */
export const supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
