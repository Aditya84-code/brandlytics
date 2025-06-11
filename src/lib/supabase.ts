import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
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