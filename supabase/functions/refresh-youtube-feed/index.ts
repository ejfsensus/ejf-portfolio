import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

function pickBetween(source: string, open: string, close: string, from = 0): { value: string; end: number } | null {
  const start = source.indexOf(open, from);
  if (start === -1) return null;
  const valueStart = start + open.length;
  const end = source.indexOf(close, valueStart);
  if (end === -1) return null;
  return { value: source.slice(valueStart, end), end: end + close.length };
}

function decodeXml(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

type Entry = {
  id: string;
  channel_id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  published_at: string;
};

function parseEntries(xml: string): Entry[] {
  const entries: Entry[] = [];
  let cursor = 0;
  while (true) {
    const block = pickBetween(xml, "<entry>", "</entry>", cursor);
    if (!block) break;
    cursor = block.end;
    const chunk = block.value;

    const videoId = pickBetween(chunk, "<yt:videoId>", "</yt:videoId>")?.value?.trim();
    const channelId = pickBetween(chunk, "<yt:channelId>", "</yt:channelId>")?.value?.trim();
    const title = decodeXml(pickBetween(chunk, "<title>", "</title>")?.value?.trim() ?? "");
    const published = pickBetween(chunk, "<published>", "</published>")?.value?.trim();
    const description = decodeXml(
      pickBetween(chunk, "<media:description>", "</media:description>")?.value?.trim() ?? ""
    );

    if (!videoId || !channelId || !published) continue;

    entries.push({
      id: videoId,
      channel_id: channelId,
      title,
      description,
      thumbnail_url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      published_at: published,
    });
  }
  return entries;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let channelId: string | null = null;
    const url = new URL(req.url);
    channelId = url.searchParams.get("channel_id");

    if (!channelId) {
      const { data } = await supabase
        .from("acuity_settings")
        .select("youtube_channel_id")
        .limit(1)
        .maybeSingle();
      channelId = data?.youtube_channel_id ?? null;
    }

    if (!channelId) {
      return new Response(
        JSON.stringify({ error: "No channel_id configured" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const feedResp = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { headers: { "User-Agent": "Mozilla/5.0 (compatible; AcuityBot/1.0)" } }
    );

    if (!feedResp.ok) {
      return new Response(
        JSON.stringify({ error: `Feed fetch failed: ${feedResp.status}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const xml = await feedResp.text();
    const entries = parseEntries(xml);

    if (entries.length === 0) {
      return new Response(
        JSON.stringify({ inserted: 0, message: "No entries in feed" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const rows = entries.map((e) => ({ ...e, fetched_at: new Date().toISOString() }));
    const { error: upsertError } = await supabase
      .from("recent_videos")
      .upsert(rows, { onConflict: "id" });

    if (upsertError) {
      return new Response(
        JSON.stringify({ error: upsertError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ count: rows.length, channel_id: channelId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
