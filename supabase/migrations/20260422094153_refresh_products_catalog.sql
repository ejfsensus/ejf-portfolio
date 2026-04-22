/*
  # Refresh products catalog

  1. Data updates
    - Remove legacy product rows that no longer represent the active lineup
      (Orbit and Mophi.us).
    - Upsert the six new product definitions in canonical order:
      ObsidianChat, .studio by OpusAI, ObsidianAI, Spark by Sensus Labs,
      Orbi, myBluum.
    - `artefact_url` stores a slug-based key used by the frontend image map.
  2. Security
    - Table RLS policies are unchanged.
*/

DELETE FROM products WHERE slug IN ('orbit', 'mophius');

INSERT INTO products (
  slug, wordmark, category, status, tagline, description, audience,
  feasibility_tech, feasibility_econ, feasibility_user,
  accent_hue, artefact_url, cta_label, cta_href, sort_order
) VALUES
(
  'obsidianchat',
  'ObsidianChat',
  'Applied AI',
  'Active service',
  'AI conversations designed for real work.',
  'A practical AI chat product built to turn advanced models into something people can actually use day to day — for research, drafting, ideation, structured thinking, and task execution. Designed as a flexible service layer rather than a generic chatbot, ObsidianChat reflects a product approach focused on usability, extensibility, and grounded output quality offered on a custom cloud instance for data control and sovereignty.',
  'Teams and individuals who need a reliable, everyday AI workspace with data sovereignty and extensible workflows.',
  'Multi-model chat foundation with support for vision, structured prompting, retrieval, and configurable workflow logic.',
  'Fast to deploy and easy to adapt, creating immediate value without the cost of building a bespoke system for every use case.',
  'Familiar and intuitive on the surface, but shaped to produce more useful, reliable, and context-aware outputs.',
  '#3FB8B0',
  'obsidianchat',
  'Read the brief',
  '#',
  1
),
(
  'studio',
  '.studio by OpusAI',
  'Business AI',
  'Active service',
  'AI power for your business — all in one portal.',
  'A modular AI business suite designed to help smaller organisations access the real benefits of AI without unnecessary complexity. .studio brings together practical tools for content, communications, operations, media, and internal support in a single custom cloud environment, showing how multiple AI capabilities can be unified into one commercially viable product ecosystem.',
  'Small and mid-sized organisations that want enterprise-grade AI outcomes through one accessible subscription.',
  'Curated stack of models, tool flows, and modular suites spanning brand content, internal assistants, business operations, and multimedia generation.',
  'Subscription-based structure designed to offer broad AI capability at a cost far below traditional software and consulting combinations.',
  'Built for accessibility: one portal, one login, and a user experience shaped around outcomes rather than technical overhead.',
  '#2F8F6E',
  'studio',
  'Visit studio.opusai.uk',
  'https://studio.opusai.uk',
  2
),
(
  'obsidianai',
  'ObsidianAI',
  'Applied AI',
  'Product proposal',
  'Private AI infrastructure for serious deployment.',
  'A platform concept for organisations that need more than surface-level AI access: stronger control, clearer governance, domain-specific performance, and infrastructure they can trust. ObsidianAI is designed as an AI operating layer for regulated, high-trust, or knowledge-intensive environments where deployment quality matters as much as model capability.',
  'Regulated, high-trust and knowledge-intensive organisations that need governed AI infrastructure rather than off-the-shelf tooling.',
  'Domain-tuned model routing, knowledge integration, configurable deployment options, and compliance-aware oversight architecture.',
  'Intended to reduce tool sprawl and fragmented vendor costs by consolidating AI capability into a coherent operating system.',
  'Supports teams that need AI to be useful, manageable, and answerable to operational and compliance requirements.',
  '#2B2A63',
  'obsidianai',
  'Read the brief',
  '#',
  3
),
(
  'spark',
  'Spark by Sensus Labs',
  'Autonomous systems',
  'R&D',
  'Agentic systems designed to move from intent to action.',
  'An experimental development track exploring semi-autonomous and autonomous task execution through ''computer use agents'' in a virtual linux instance. Spark is focused on the next layer beyond chat — systems that can use tools, navigate interfaces, complete bounded workflows, and make AI feel operational rather than purely conversational.',
  'Forward-looking teams interested in how controlled autonomy can reshape operational workflows.',
  'Designed around agent orchestration, computer-use patterns, task chaining, tool invocation, and auditable execution flows in a virtual linux machine.',
  'Explores how practical autonomy can reduce repetitive work and increase output without requiring enterprise-scale implementation budgets.',
  'Structured around controlled autonomy, with clear task boundaries, observable behaviour, and human oversight built into the loop.',
  '#D97A4A',
  'spark',
  'View the concept',
  '#',
  4
),
(
  'orbi',
  'Orbi',
  'Personal AI',
  'In design',
  'Your private AI sidekick, always quietly useful.',
  'A personal AI product concept designed around ambient assistance rather than interruption. Orbi is imagined as a voice-first, privacy-first companion that helps with planning, organisation, memory, and everyday coordination across devices. The emphasis is on making advanced AI feel calm, intuitive, and genuinely supportive in daily life.',
  'Individuals who want a calm, private, voice-first assistant woven through their day without extraction or noise.',
  'Cross-device assistant architecture with voice interaction, contextual task support, memory systems, and privacy-led sync design.',
  'Consumer-facing subscription model designed around premium usefulness rather than ad-driven extraction or unnecessary hardware dependency.',
  'Built to feel effortless: always available when needed, quiet when not, and centred on personal trust by default.',
  '#6B7FD7',
  'orbi',
  'Read the brief',
  '#',
  5
),
(
  'mybluum',
  'myBluum',
  'Wellness AI',
  'In design',
  'The digital wellness space that puts you first.',
  'A private wellbeing product concept combining reflective journaling, emotionally aware interaction, and gentle AI guidance into a more supportive digital environment. myBluum is designed to show how AI can be used in a way that feels humane, calming, and personally useful — not manipulative, addictive, or overbearing.',
  'People seeking a private, humane digital space for reflection, journaling and gentle AI-guided wellbeing support.',
  'Structured journaling, adaptive prompts, optional voice-based reflection, and privacy-first emotional insight workflows.',
  'Premium model with carefully chosen paid tiers and optional specialist integrations, designed around trust rather than mass extraction.',
  'Built from the principle that tools for mental wellbeing should support the person, not commodify their emotional state.',
  '#E08BA2',
  'mybluum',
  'Read the brief',
  '#',
  6
)
ON CONFLICT (slug) DO UPDATE SET
  wordmark = EXCLUDED.wordmark,
  category = EXCLUDED.category,
  status = EXCLUDED.status,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  audience = EXCLUDED.audience,
  feasibility_tech = EXCLUDED.feasibility_tech,
  feasibility_econ = EXCLUDED.feasibility_econ,
  feasibility_user = EXCLUDED.feasibility_user,
  accent_hue = EXCLUDED.accent_hue,
  artefact_url = EXCLUDED.artefact_url,
  cta_label = EXCLUDED.cta_label,
  cta_href = EXCLUDED.cta_href,
  sort_order = EXCLUDED.sort_order;
