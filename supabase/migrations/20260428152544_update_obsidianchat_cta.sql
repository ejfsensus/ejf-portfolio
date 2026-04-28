/*
  # Update ObsidianChat CTA

  1. Data updates
    - Change the ObsidianChat product card CTA label from
      "Read the brief" to "Visit beta.obsidianai.chat" and point
      the link at https://beta.obsidianai.chat.
  2. Security
    - No schema or RLS changes.
*/

UPDATE products
SET
  cta_label = 'Visit beta.obsidianai.chat',
  cta_href  = 'https://beta.obsidianai.chat'
WHERE slug = 'obsidianchat';
