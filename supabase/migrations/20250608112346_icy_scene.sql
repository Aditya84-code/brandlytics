/*
  # Create brand results table

  1. New Tables
    - `brand_results`
      - `id` (uuid, primary key)
      - `audit_id` (uuid, references brand_audits)
      - `user_id` (uuid, references profiles)
      - `scores` (jsonb) - stores overall, consistency, content quality, visibility, competitive scores
      - `recommendations` (jsonb) - stores array of recommendations
      - `summary` (text) - stores analysis summary
      - `reviews` (jsonb) - stores detailed reviews for each category
      - `webhook_response` (jsonb) - stores complete webhook response
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `brand_results` table
    - Add policies for authenticated users to access their own results
*/

-- Create brand_results table
CREATE TABLE IF NOT EXISTS brand_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id uuid REFERENCES brand_audits(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  scores jsonb NOT NULL DEFAULT '{}',
  recommendations jsonb NOT NULL DEFAULT '[]',
  summary text,
  reviews jsonb NOT NULL DEFAULT '{}',
  webhook_response jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE brand_results ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own results"
  ON brand_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own results"
  ON brand_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own results"
  ON brand_results
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own results"
  ON brand_results
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER handle_brand_results_updated_at
  BEFORE UPDATE ON brand_results
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS brand_results_audit_id_idx ON brand_results(audit_id);
CREATE INDEX IF NOT EXISTS brand_results_user_id_idx ON brand_results(user_id);
CREATE INDEX IF NOT EXISTS brand_results_created_at_idx ON brand_results(created_at DESC);

-- Create unique constraint to ensure one result per audit
CREATE UNIQUE INDEX IF NOT EXISTS brand_results_audit_id_unique ON brand_results(audit_id);