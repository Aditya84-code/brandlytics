import { createClient } from '@supabase/supabase-js'

// Get environment variables with better error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    url: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'undefined',
    key: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'undefined'
  });
  
  // In production, show user-friendly error
  if (import.meta.env.PROD) {
    throw new Error('Application configuration error. Please contact support.');
  }
  
  // In development, show detailed error
  throw new Error(`
    Missing Supabase configuration. Please ensure these environment variables are set:
    - VITE_SUPABASE_URL: ${supabaseUrl ? '✓ Set' : '✗ Missing'}
    - VITE_SUPABASE_ANON_KEY: ${supabaseAnonKey ? '✓ Set' : '✗ Missing'}
    
    For local development:
    1. Copy .env.example to .env
    2. Fill in your Supabase project details
    
    For Netlify deployment:
    1. Go to Site settings → Environment variables
    2. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
    3. Redeploy your site
  `);
}

// Log configuration status (without exposing sensitive data)
console.log('Supabase configuration:', {
  url: `${supabaseUrl.substring(0, 30)}...`,
  keyLength: supabaseAnonKey.length,
  environment: import.meta.env.MODE
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types
export interface Profile {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface BrandAudit {
  id: string
  user_id: string
  personal_info: {
    name: string
    profession: string
    email: string
  }
  social_profiles: {
    linkedin?: string
    instagram?: string
  }
  preferences: {
    industry: string
    goals: string[]
  }
  status: 'processing' | 'completed' | 'failed'
  created_at: string
  updated_at: string
}

export interface BrandResult {
  id: string
  audit_id: string
  user_id: string
  scores: {
    overall: number
    consistency: number
    contentQuality: number
    visibility: number
    competitive: number
  }
  recommendations: Array<{
    id?: string
    category: 'consistency' | 'contentQuality' | 'visibility' | 'competitive'
    priority: 'high' | 'medium' | 'low'
    title: string
    description: string
  }>
  summary: string | null
  reviews: {
    consistency?: string
    contentQuality?: string
    visibility?: string
    competitive?: string
  }
  webhook_response: any
  created_at: string
  updated_at: string
}

export interface AICoachSession {
  id: string
  user_id: string
  audit_id: string | null
  conversation_id: string | null
  conversation_url: string | null
  conversation_name: string | null
  user_queries: string[]
  session_duration: number
  status: 'scheduled' | 'active' | 'completed' | 'cancelled'
  created_at: string
  updated_at: string
}