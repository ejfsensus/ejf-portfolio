/*
  # Seed OpusAI Portfolio Content

  Seeds initial content into all content tables for the public-facing portfolio.
  Uses ON CONFLICT DO NOTHING for slug-keyed tables so reseeds are safe.
  For pure-data tables without unique slugs, inserts only occur when the table is empty.
*/

INSERT INTO site_settings (key, value) VALUES
  ('brand', '{"name":"OpusAI","tagline":"Human-first AI, built with intent.","eyebrow":"OPUSAI \u00b7 AI CONSULTING, DESIGN & DEPLOYMENT","positioning":"OpusAI is the applied arm of a technology house working toward a fairer, more verifiable future of knowledge. We design, build and deploy AI that businesses and people can actually trust."}'),
  ('contact', '{"email":"ethan@sensusinvista.ltd","location":"Southport, United Kingdom","linkedin":"https://linkedin.com/in/ethanjamesfarrell","company":"Sensus InVista Ltd","companyNumber":"16491089","address":"Bridge Grove, Southport, PR8 5AA"}'),
  ('status', '{"availability":"Accepting new clients","cycle":"Discovery calls free, delivery in 6\u201316 weeks"}')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

INSERT INTO pillars (slug, name, label, tagline, body, href, is_home, sort_order) VALUES
  ('sensus-lab', 'Sensus Lab', 'Experimental development',
    'The R&D pillar.',
    'A playground for applied AI where design, research, and engineering converge. Sensus Lab stress-tests ideas, refines what works, and crafts prototypes for more intuitive, inclusive futures. Outputs aren''t just proofs of concept — they''re proofs of purpose.',
    'https://sensuslab.uk', false, 1),
  ('opusai', 'OpusAI', 'Applied solutions & orchestration',
    'The commercial pillar. You are here.',
    'OpusAI turns lab research into real tools for real organisations across four service themes: Design & Build, Automate & Scale, Customisation & Deployments, and Training & Support.',
    'https://opusai.uk', true, 2),
  ('liberty-rise', 'Liberty Rise', 'Social impact & policy advocacy',
    'The humanitarian pillar.',
    'Liberty Rise exists to ensure technological progress uplifts the marginalised rather than deepening inequity — through policy engagement, community empowerment, digital self-advocacy, and representation. Equity before efficiency.',
    '#', false, 3)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (slug, wordmark, category, status, tagline, description, audience, feasibility_tech, feasibility_econ, feasibility_user, accent_hue, cta_label, cta_href, sort_order) VALUES
  ('obsidianai', 'ObsidianAI', 'Applied AI', 'In build',
    'Your AI operating system for serious work.',
    'A deployment platform that brings together foundation models, custom tooling, and intelligent oversight so organisations can build, scale, and trust what they deploy. Domain-tuned by default, augmented with real-time web exposure, and compliance-centric for regulated environments.',
    'Mid-market and enterprise teams that need production-grade AI without surrendering data sovereignty.',
    'Foundation models selected and fine-tuned by domain; BYOD (Bring-Your-Own-Data) architecture.',
    'Licence + deployment fees; reduces tool sprawl and consultancy costs.',
    'Deploy in minutes; manage centrally; answerable to IT and compliance teams.',
    '#2B2A63', 'Read the brief', '#', 1),
  ('studio', '.studio', 'Applied AI', 'Early access',
    'AI power for your business — all in one portal.',
    'A single web-based workspace that unites customer interactions (website, WhatsApp), the Social Suite, the Elements Suite (multimedia + product photography), the Growth Suite (operations & strategy), and the Comms Suite (brand messaging). No hardware, no tab-hopping.',
    'Small businesses and independent operators who want enterprise-grade AI tooling without the enterprise price tag.',
    'Curated, best-in-class models wrapped in a single web interface.',
    'Subscription-based; replaces multiple point-tools at a fraction of combined cost.',
    'One login, one portal, one learning curve.',
    '#3FB8B0', 'Request early access', '#', 2),
  ('orbi', 'Orbi', 'Personal AI', 'In design',
    'Your private AI sidekick, always quietly useful.',
    'A personal assistant that works across phone, desktop and web — sorting files, planning a night out, nudging the next small task — while keeping personal data private by default.',
    'Individuals who want an AI that helps them live, not an AI that sells them something.',
    'On-device-first architecture with optional encrypted sync.',
    'Consumer subscription; optional premium tier for pro productivity.',
    'Privacy as a feature, not a disclaimer.',
    '#D97A4A', 'Read the brief', '#', 3),
  ('orbit', 'Orbit', 'Team AI', 'In design',
    'A secure AI co-worker for modern teams.',
    'Plugs into the tools a team already uses, surfaces answers buried in files and chats, and converts busywork into button-clicks — all under IT''s watchful eye.',
    'SMEs and mid-market teams that want ChatGPT-grade help without shadow-IT risk.',
    'Connector-based architecture over existing SaaS stack; no rip-and-replace.',
    'Per-seat pricing aligned to measurable time-savings.',
    'Designed for governance: every answer traceable to its source.',
    '#5B8DEF', 'Read the brief', '#', 4),
  ('mybluum', 'myBluum', 'Wellness AI', 'In design',
    'The digital wellness space that puts you first.',
    'A private place to log feelings, explore concerns surfaced from journal entries through structured reflection, sync wearable data, and — in future — connect with trusted professionals when appropriate.',
    'People who want to understand themselves better without handing their data to a social network.',
    'Journaling + wearable integrations + LLM-assisted reflection behind strong privacy controls.',
    'Freemium, with paid tiers for clinical-adjacent integrations.',
    'Built on the principle that mental wellbeing tools should never commodify the user.',
    '#E08BA2', 'Read the brief', '#', 5),
  ('mophius', 'Mophi.us', 'Experimental', 'Roadmap 2026',
    'Where ideas become reality.',
    'A personal experimental playground that unifies the Sensus products into a self-building interface — the surface where InVista''s knowledge layer one day meets everyday use.',
    'Internal platform; a proving ground for future spin-out candidates.',
    'Modular composition over a shared identity + knowledge layer.',
    'Internal platform; future spin-out candidates.',
    'One evolving interface, unique to every user.',
    '#8A6FD1', 'Read the brief', '#', 6)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO approach_steps (step_number, title, description)
SELECT * FROM (VALUES
  (1, 'Discover', 'A stress-free discovery call; embed with team, data, users.'),
  (2, 'Frame', 'Ambiguity becomes a crisp thesis anchored to the Three E''s.'),
  (3, 'Prototype', 'Build the experience in code with real models (Sensus Lab).'),
  (4, 'Deploy', 'Ship with compliance in mind; customise for the context.'),
  (5, 'Enable', 'Training, support, and iteration; the handoff is a beginning.')
) AS v(step_number, title, description)
WHERE NOT EXISTS (SELECT 1 FROM approach_steps);

INSERT INTO capabilities (category, label, sort_order)
SELECT * FROM (VALUES
  ('Strategy & delivery', 'Strategic planning', 1),
  ('Strategy & delivery', 'Process improvement', 2),
  ('Strategy & delivery', 'Operational mapping', 3),
  ('Strategy & delivery', 'Tool selection', 4),
  ('Strategy & delivery', 'Project management', 5),
  ('Strategy & delivery', 'Reporting & analysis', 6),
  ('Operations & finance', 'Administrative operations', 7),
  ('Operations & finance', 'CRM (Salesforce, HubSpot)', 8),
  ('Operations & finance', 'ERP (Unit4)', 9),
  ('Operations & finance', 'Budgeting & procurement', 10),
  ('Operations & finance', 'Compliance', 11),
  ('Technology', 'Web & domain management', 12),
  ('Technology', 'DNS / hosting / CMS', 13),
  ('Technology', 'Automation & APIs', 14),
  ('Technology', 'AI-integrated workflows', 15),
  ('People & communication', 'Training design & delivery', 16),
  ('People & communication', 'Inclusion & accessibility', 17),
  ('People & communication', 'Consultative selling', 18),
  ('People & communication', 'Executive presentation', 19),
  ('Events & engagement', 'Full event lifecycle', 20),
  ('Events & engagement', 'Bespoke booking systems', 21),
  ('Events & engagement', 'Risk & safety', 22)
) AS v(category, label, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM capabilities);

INSERT INTO faqs (question, answer, sort_order)
SELECT * FROM (VALUES
  ('What kind of AI work do you take on?', 'Applied AI across design, build, automation, bespoke deployments, and training.', 1),
  ('Is this a solo operation or a team?', 'Ethan leads, with trusted specialist collaborators per engagement. No overhead inflation.', 2),
  ('How do you price?', 'Tailored to scope and organisation size, in keeping with the equitable-access principle. Discovery calls are free.', 3),
  ('Do you build production systems, or just strategy?', 'Both. Sensus Lab prototypes; OpusAI productionises.', 4),
  ('How do you handle sensitive data?', 'Compliance-centric by default. Data sovereignty, NDAs, and encrypted workflows are standard.', 5),
  ('What is a typical engagement length?', 'Discovery in weeks, delivery in 6–16 weeks, partnerships ongoing.', 6),
  ('How does Sensus InVista relate to the work I''d be paying for?', 'It''s the long arc. Your project benefits from the same research ethos, but you''re buying a concrete outcome today.', 7)
) AS v(question, answer, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM faqs);

INSERT INTO experience (role, organisation, period, description, sort_order)
SELECT * FROM (VALUES
  ('Administrative Research Officer', 'University of Central Lancashire, Preston', 'Sep 2017 – Mar 2025',
    'Research Facilitation & Delivery Unit · Applied Health Research Hub · Faculty of Health and Wellbeing. Operational, digital and strategic support across a dynamic portfolio of research and engagement projects, including the Lancashire Institute for Global Health and Wellbeing (LIFE) and the UK Healthy Universities Network.', 1),
  ('Business Development Manager', 'Vasco Carbon, Southport', 'Late 2014 – 2017',
    'Client development, partnership building, and identifying commercial opportunities. Personally developed and delivered a new market proposition end-to-end — branding, operations, logistics and procurement.', 2),
  ('Business Rates Reduction Advisor', 'Rates UK Limited', '2013 – 2014',
    'Advising SMEs on rate assessments and appeal processes.', 3),
  ('Sales Advisor → Store Manager', 'Telefónica UK (O2 Retail)', '2008 – 2013',
    'Five-year progression through customer-facing and managerial roles, leading teams, managing store operations, and driving customer-service standards.', 4)
) AS v(role, organisation, period, description, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM experience);

INSERT INTO acuity_offerings (title, description, category, sort_order)
SELECT * FROM (VALUES
  ('The Library', 'Information as a pathway to individual enlightenment, shaped to improve lives, communities and society.', 'offering', 1),
  ('Philosophy', 'Written reflections on discernment, foresight, lucidity, and sagacity — the constellation of trust.', 'offering', 2),
  ('Webinars', 'Live and recorded sessions exploring spirituality concepts alongside practical integration.', 'offering', 3),
  ('Testimony', 'Personal recordings and reflections documenting the journey, for those who find meaning in walking alongside it.', 'offering', 4),
  ('Instruments of Clarity', 'The Archive, The Lens, and Taking Action — tools that translate reflection into protection and practice.', 'offering', 5),
  ('Reflection', 'A daily practice of stillness. Note what arrived, what left, what remains honest.', 'process', 1),
  ('Discernment', 'Hold ideas up to the light. Separate the borrowed from the earned, the loud from the true.', 'process', 2),
  ('Integration', 'Translate insight into gesture. Small acts, repeated, are the architecture of a changed life.', 'process', 3),
  ('Return', 'Begin again, softer. Wisdom is not a destination; it is a way of walking back.', 'process', 4)
) AS v(title, description, category, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM acuity_offerings);

INSERT INTO testimonials (quote, author, role, sort_order)
SELECT * FROM (VALUES
  ('Ethan brings a rare combination of operational clarity and ethical instinct. The work is measured, and it lasts.', 'Research lead', 'Applied health programme', 1),
  ('Calm, methodical, pragmatic. Exactly the temperament you want on a live deployment.', 'Founder', 'SME platform client', 2)
) AS v(quote, author, role, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM testimonials);
