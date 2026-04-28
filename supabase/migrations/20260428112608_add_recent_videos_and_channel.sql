/*
  # Recent YouTube videos cache + channel reference

  1. Schema changes
    - `acuity_settings`: add `youtube_channel_id` (text) so the channel handle is stored alongside the playlist.
    - New table `recent_videos` cached from the YouTube RSS feed:
      - `id` (text, primary key) — YouTube video ID
      - `channel_id` (text) — owning channel
      - `title` (text)
      - `description` (text)
      - `thumbnail_url` (text)
      - `published_at` (timestamptz)
      - `fetched_at` (timestamptz, defaults to now())
  2. Security
    - Enable RLS on `recent_videos`
    - Add public read policy so the marketing site can render the grid
  3. Seed
    - Populate `youtube_channel_id` for @EthanJamesFarrell_uk
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'acuity_settings' AND column_name = 'youtube_channel_id'
  ) THEN
    ALTER TABLE acuity_settings ADD COLUMN youtube_channel_id text NOT NULL DEFAULT '';
  END IF;
END $$;

UPDATE acuity_settings
SET youtube_channel_id = 'UCD4hWetMI3AqXoH727pFNQA'
WHERE youtube_channel_id = '' OR youtube_channel_id IS NULL;

CREATE TABLE IF NOT EXISTS recent_videos (
  id text PRIMARY KEY,
  channel_id text NOT NULL,
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  thumbnail_url text NOT NULL DEFAULT '',
  published_at timestamptz NOT NULL DEFAULT now(),
  fetched_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS recent_videos_published_at_idx
  ON recent_videos (published_at DESC);

ALTER TABLE recent_videos ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'recent_videos'
      AND policyname = 'Public can read recent videos'
  ) THEN
    CREATE POLICY "Public can read recent videos"
      ON recent_videos FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;
END $$;
