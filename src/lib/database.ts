import { supabase } from './supabase';
import type { BrandAudit, BrandResult, AICoachSession } from './supabase';
import type { FormData, WebhookResponse } from '@/types';

// Brand Audit functions
export const createBrandAudit = async (
  userId: string,
  formData: FormData
): Promise<BrandAudit> => {
  const { data, error } = await supabase
    .from('brand_audits')
    .insert({
      user_id: userId,
      personal_info: formData.personalInfo,
      social_profiles: formData.socialProfiles,
      preferences: formData.preferences,
      status: 'processing'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateBrandAuditStatus = async (
  auditId: string,
  status: 'processing' | 'completed' | 'failed'
): Promise<void> => {
  const { error } = await supabase
    .from('brand_audits')
    .update({ status })
    .eq('id', auditId);

  if (error) throw error;
};

export const getBrandAudits = async (userId: string): Promise<BrandAudit[]> => {
  const { data, error } = await supabase
    .from('brand_audits')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getBrandAudit = async (auditId: string): Promise<BrandAudit | null> => {
  const { data, error } = await supabase
    .from('brand_audits')
    .select('*')
    .eq('id', auditId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

// Brand Result functions
export const createBrandResult = async (
  auditId: string,
  userId: string,
  webhookResponse: WebhookResponse
): Promise<BrandResult> => {
  const { data, error } = await supabase
    .from('brand_results')
    .insert({
      audit_id: auditId,
      user_id: userId,
      scores: webhookResponse.scores,
      recommendations: webhookResponse.recommendations,
      summary: webhookResponse.summary,
      reviews: webhookResponse.reviews,
      webhook_response: webhookResponse
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getBrandResult = async (auditId: string): Promise<BrandResult | null> => {
  const { data, error } = await supabase
    .from('brand_results')
    .select('*')
    .eq('audit_id', auditId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const getBrandResults = async (userId: string): Promise<BrandResult[]> => {
  const { data, error } = await supabase
    .from('brand_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

// AI Coach Session functions
export const createAICoachSession = async (
  userId: string,
  auditId: string,
  conversationData: {
    conversation_id: string;
    conversation_url: string;
    conversation_name: string;
  },
  userQueries: string[]
): Promise<AICoachSession> => {
  const { data, error } = await supabase
    .from('ai_coach_sessions')
    .insert({
      user_id: userId,
      audit_id: auditId,
      conversation_id: conversationData.conversation_id,
      conversation_url: conversationData.conversation_url,
      conversation_name: conversationData.conversation_name,
      user_queries: userQueries,
      status: 'scheduled'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateAICoachSession = async (
  sessionId: string,
  updates: Partial<AICoachSession>
): Promise<void> => {
  const { error } = await supabase
    .from('ai_coach_sessions')
    .update(updates)
    .eq('id', sessionId);

  if (error) throw error;
};

export const getAICoachSessions = async (userId: string): Promise<AICoachSession[]> => {
  const { data, error } = await supabase
    .from('ai_coach_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getAICoachSession = async (conversationId: string): Promise<AICoachSession | null> => {
  const { data, error } = await supabase
    .from('ai_coach_sessions')
    .select('*')
    .eq('conversation_id', conversationId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};