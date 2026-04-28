import { useEffect, useState } from 'react';
import { supabase } from './supabase';
import type {
  Pillar,
  Product,
  ApproachStep,
  Capability,
  Faq,
  Experience,
  AcuityOffering,
  Testimonial,
  AcuitySettings,
  RecentVideo,
} from './types';

export type PortfolioData = {
  loading: boolean;
  pillars: Pillar[];
  products: Product[];
  steps: ApproachStep[];
  capabilities: Capability[];
  faqs: Faq[];
  experience: Experience[];
  acuity: AcuityOffering[];
  testimonials: Testimonial[];
  acuitySettings: AcuitySettings | null;
  recentVideos: RecentVideo[];
};

export function usePortfolioData(): PortfolioData {
  const [state, setState] = useState<PortfolioData>({
    loading: true,
    pillars: [],
    products: [],
    steps: [],
    capabilities: [],
    faqs: [],
    experience: [],
    acuity: [],
    testimonials: [],
    acuitySettings: null,
    recentVideos: [],
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [
        pillars,
        products,
        steps,
        capabilities,
        faqs,
        experience,
        acuity,
        testimonials,
        acuitySettings,
        recentVideos,
      ] = await Promise.all([
        supabase.from('pillars').select('*').order('sort_order'),
        supabase.from('products').select('*').order('sort_order'),
        supabase.from('approach_steps').select('*').order('step_number'),
        supabase.from('capabilities').select('*').order('sort_order'),
        supabase.from('faqs').select('*').order('sort_order'),
        supabase.from('experience').select('*').order('sort_order'),
        supabase.from('acuity_offerings').select('*').order('sort_order'),
        supabase.from('testimonials').select('*').order('sort_order'),
        supabase.from('acuity_settings').select('*').limit(1).maybeSingle(),
        supabase.from('recent_videos').select('*').order('published_at', { ascending: false }).limit(6),
      ]);

      if (cancelled) return;
      setState({
        loading: false,
        pillars: (pillars.data ?? []) as Pillar[],
        products: (products.data ?? []) as Product[],
        steps: (steps.data ?? []) as ApproachStep[],
        capabilities: (capabilities.data ?? []) as Capability[],
        faqs: (faqs.data ?? []) as Faq[],
        experience: (experience.data ?? []) as Experience[],
        acuity: (acuity.data ?? []) as AcuityOffering[],
        testimonials: (testimonials.data ?? []) as Testimonial[],
        acuitySettings: (acuitySettings.data ?? null) as AcuitySettings | null,
        recentVideos: (recentVideos.data ?? []) as RecentVideo[],
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
