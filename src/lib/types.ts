export type Pillar = {
  id: string;
  slug: string;
  name: string;
  label: string;
  tagline: string;
  body: string;
  href: string;
  is_home: boolean;
  sort_order: number;
};

export type Product = {
  id: string;
  slug: string;
  wordmark: string;
  category: string;
  status: string;
  tagline: string;
  description: string;
  audience: string;
  feasibility_tech: string;
  feasibility_econ: string;
  feasibility_user: string;
  accent_hue: string;
  artefact_url: string | null;
  video_url: string | null;
  cta_label: string;
  cta_href: string;
  sort_order: number;
};

export type ApproachStep = {
  id: string;
  step_number: number;
  title: string;
  description: string;
};

export type Capability = {
  id: string;
  category: string;
  label: string;
  sort_order: number;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};

export type Experience = {
  id: string;
  role: string;
  organisation: string;
  period: string;
  description: string;
  sort_order: number;
};

export type AcuityOffering = {
  id: string;
  title: string;
  description: string;
  category: string;
  sort_order: number;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  sort_order: number;
};

export type AcuitySettings = {
  id: string;
  youtube_playlist_id: string;
  youtube_channel_id: string;
  updated_at: string;
};

export type RecentVideo = {
  id: string;
  channel_id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  published_at: string;
  fetched_at: string;
};
