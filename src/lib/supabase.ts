import { createClient } from '@supabase/supabase-js'

// Provide fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Log environment variables status (without exposing actual values)
console.log('Supabase config:', {
  hasUrl: !!import.meta.env.VITE_SUPABASE_URL,
  hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
  urlLength: supabaseUrl.length,
  keyLength: supabaseAnonKey.length
});

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Missing Supabase environment variables. Some features may not work properly.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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