/*
  # Create brand audits table

  1. New Tables
    - `brand_audits`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `personal_info` (jsonb) - stores name, profession, email
      - `social_profiles` (jsonb) - stores LinkedIn, Instagram URLs
      - `preferences` (jsonb) - stores industry, goals
      - `status` (text) - processing, completed, failed
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `brand_audits` table
    - Add policies for authenticated users to manage their own audits
*/

-- Create brand_audits table
CREATE TABLE IF NOT EXISTS brand_audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  personal_info jsonb NOT NULL DEFAULT '{}',
  social_profiles jsonb NOT NULL DEFAULT '{}',
  preferences jsonb NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE brand_audits ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own audits"
  ON brand_audits
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own audits"
  ON brand_audits
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own audits"
  ON brand_audits
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own audits"
  ON brand_audits
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER handle_brand_audits_updated_at
  BEFORE UPDATE ON brand_audits
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS brand_audits_user_id_idx ON brand_audits(user_id);
CREATE INDEX IF NOT EXISTS brand_audits_status_idx ON brand_audits(status);
CREATE INDEX IF NOT EXISTS brand_audits_created_at_idx ON brand_audits(created_at DESC);