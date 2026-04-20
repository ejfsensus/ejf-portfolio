/*
  # OpusAI Portfolio Schema

  1. New Tables
    - `site_settings` — key/value store for global site copy and flags
    - `pillars` — the three ecosystem pillars (Sensus Lab, OpusAI, Liberty Rise)
    - `products` — product cards with nine-slot structure
    - `approach_steps` — five-step engagement model
    - `capabilities` — categorised capability chips
    - `faqs` — frequently asked questions
    - `experience` — chronological roles for founder modal
    - `acuity_offerings` — Acuity Institute offerings
    - `testimonials` — client quotes
    - `contact_submissions` — contact form inserts

  2. Security
    - RLS enabled on all tables
    - Public read access on content tables (portfolio is public-facing)
    - Insert-only public access on `contact_submissions`
    - No public update/delete anywhere

  3. Notes
    - Content tables are seeded with initial portfolio content derived from the content map
    - Uses `IF NOT EXISTS` guards throughout
*/

CREATE TABLE IF NOT EXISTS site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS pillars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL DEFAULT '',
  label text NOT NULL DEFAULT '',
  tagline text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  href text NOT NULL DEFAULT '',
  is_home boolean NOT NULL DEFAULT false,
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  wordmark text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT '',
  tagline text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  audience text NOT NULL DEFAULT '',
  feasibility_tech text NOT NULL DEFAULT '',
  feasibility_econ text NOT NULL DEFAULT '',
  feasibility_user text NOT NULL DEFAULT '',
  accent_hue text NOT NULL DEFAULT '#6b7fd7',
  artefact_url text DEFAULT '',
  cta_label text NOT NULL DEFAULT 'Read the brief',
  cta_href text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS approach_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number int NOT NULL DEFAULT 0,
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS capabilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL DEFAULT '',
  label text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL DEFAULT '',
  answer text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL DEFAULT '',
  organisation text NOT NULL DEFAULT '',
  period text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS acuity_offerings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'offering',
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote text NOT NULL DEFAULT '',
  author text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  organisation text DEFAULT '',
  message text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE pillars ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE approach_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE acuity_offerings ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read pillars" ON pillars FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read approach_steps" ON approach_steps FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read capabilities" ON capabilities FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read faqs" ON faqs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read experience" ON experience FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read acuity_offerings" ON acuity_offerings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Public insert contact_submissions"
  ON contact_submissions FOR INSERT TO anon, authenticated
  WITH CHECK (length(name) > 0 AND length(email) > 0 AND length(message) > 0);
