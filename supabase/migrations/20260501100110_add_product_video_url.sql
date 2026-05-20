/*
  # Add video_url to products

  1. Schema changes
    - Adds optional `video_url` (text) column to `products` for a product tile video embed.
  2. Data
    - Populates `video_url` for ObsidianChat, ObsidianAI, and Spark by Sensus Labs.
  3. Security
    - No RLS changes; existing policies cover the new column.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE products ADD COLUMN video_url text;
  END IF;
END $$;

UPDATE products SET video_url = 'https://www.youtube.com/watch?v=1aUvX_e-S_o' WHERE slug = 'obsidianchat';
UPDATE products SET video_url = 'https://www.youtube.com/watch?v=VxxNhrYAtcA' WHERE slug = 'obsidianai';
UPDATE products SET video_url = 'https://www.youtube.com/watch?v=AOUFUFDS3Fc' WHERE slug = 'spark';
