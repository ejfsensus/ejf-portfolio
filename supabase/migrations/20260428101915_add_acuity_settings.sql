/*
  # Add acuity_settings table for featured YouTube playlist

  1. New Tables
    - `acuity_settings`
      - `id` (uuid, primary key) — single config row
      - `youtube_playlist_id` (text) — featured Acuity webinar playlist ID
      - `updated_at` (timestamptz) — last update timestamp
  2. Security
    - Enable RLS
    - Add a public read policy so the marketing site can render the playlist for any visitor
  3. Seed
    - Insert one row with the current Acuity playlist ID
*/

CREATE TABLE IF NOT EXISTS acuity_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  youtube_playlist_id text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE acuity_settings ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'acuity_settings'
      AND policyname = 'Public can read acuity settings'
  ) THEN
    CREATE POLICY "Public can read acuity settings"
      ON acuity_settings FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END $$;

INSERT INTO acuity_settings (youtube_playlist_id)
SELECT 'PLSr67G-JzYlC30ErDOxAqq5LjQiiXtstW'
WHERE NOT EXISTS (SELECT 1 FROM acuity_settings);
