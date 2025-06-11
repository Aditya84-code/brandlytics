/*
  # Create AI coach sessions table

  1. New Tables
    - `ai_coach_sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `audit_id` (uuid, references brand_audits)
      - `conversation_id` (text) - Tavus conversation ID
      - `conversation_url` (text) - Tavus conversation URL
      - `conversation_name` (text)
      - `user_queries` (jsonb) - stores user questions
      - `session_duration` (integer) - duration in seconds
      - `status` (text) - scheduled, active, completed, cancelled
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `ai_coach_sessions` table
    - Add policies for authenticated users to manage their own sessions
*/

-- Create ai_coach_sessions table
CREATE TABLE IF NOT EXISTS ai_coach_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  audit_id uuid REFERENCES brand_audits(id) ON DELETE CASCADE,
  conversation_id text UNIQUE,
  conversation_url text,
  conversation_name text,
  user_queries jsonb NOT NULL DEFAULT '[]',
  session_duration integer DEFAULT 0,
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'active', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ai_coach_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own sessions"
  ON ai_coach_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
  ON ai_coach_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
  ON ai_coach_sessions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions"
  ON ai_coach_sessions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER handle_ai_coach_sessions_updated_at
  BEFORE UPDATE ON ai_coach_sessions
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS ai_coach_sessions_user_id_idx ON ai_coach_sessions(user_id);
CREATE INDEX IF NOT EXISTS ai_coach_sessions_audit_id_idx ON ai_coach_sessions(audit_id);
CREATE INDEX IF NOT EXISTS ai_coach_sessions_conversation_id_idx ON ai_coach_sessions(conversation_id);
CREATE INDEX IF NOT EXISTS ai_coach_sessions_status_idx ON ai_coach_sessions(status);
CREATE INDEX IF NOT EXISTS ai_coach_sessions_created_at_idx ON ai_coach_sessions(created_at DESC);