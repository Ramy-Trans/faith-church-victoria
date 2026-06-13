import { Router } from "express";

const router = Router();

const CHANNEL_ID = "UCYdsXaXzdLvgnJL9gsBxY5g";
const UPLOADS_PLAYLIST_ID = "UUYdsXaXzdLvgnJL9gsBxY5g";
const MAX_VIDEOS = 100;
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes
const MAX_RETRIES = 3;

interface YoutubeVideo {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  description: string;
  url: string;
  views: string;
  type: "video" | "live" | "premiere";
  liveBroadcastContent?: string;
}

let cache: { data: YoutubeVideo[]; at: number } | null = null;
let fetchInProgress = false;

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function withRetry<T>(fn: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        await sleep(500 * attempt);
      }
    }
  }
  throw lastError;
}

async function fetchAllVideosFromAPI(apiKey: string): Promise<YoutubeVideo[]> {
  const videoIds: string[] = [];
  let pageToken: string | undefined;

  while (videoIds.length < MAX_VIDEOS) {
    const params = new URLSearchParams({
      key: apiKey,
      playlistId: UPLOADS_PLAYLIST_ID,
      part: "snippet",
      maxResults: "50",
    });
    if (pageToken) params.set("pageToken", pageToken);

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?${params}`,
      { headers: { Accept: "application/json" } }
    );

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`YouTube playlistItems failed: ${res.status} — ${errText}`);
    }

    const data = await res.json();
    const items: any[] = data.items ?? [];

    for (const item of items) {
      const id = item.snippet?.resourceId?.videoId;
      if (id) videoIds.push(id);
    }

    pageToken = data.nextPageToken;
    if (!pageToken || videoIds.length >= MAX_VIDEOS) break;
  }

  if (videoIds.length === 0) return [];

  const videos: YoutubeVideo[] = [];
  const BATCH = 50;

  for (let i = 0; i < videoIds.length; i += BATCH) {
    const batch = videoIds.slice(i, i + BATCH).join(",");
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${batch}&part=snippet,statistics,liveStreamingDetails`,
      { headers: { Accept: "application/json" } }
    );

    if (!statsRes.ok) continue;
    const statsData = await statsRes.json();

    for (const v of statsData.items ?? []) {
      const snippet = v.snippet ?? {};
      const liveContent = snippet.liveBroadcastContent ?? "none";

      let type: "video" | "live" | "premiere" = "video";
      if (liveContent === "live") type = "live";
      else if (liveContent === "upcoming") type = "premiere";

      const thumbnail =
        snippet.thumbnails?.maxres?.url ||
        snippet.thumbnails?.high?.url ||
        snippet.thumbnails?.medium?.url ||
        `https://i3.ytimg.com/vi/${v.id}/hqdefault.jpg`;

      videos.push({
        id: v.id,
        title: (snippet.title ?? "").trim(),
        published: snippet.publishedAt ?? "",
        thumbnail,
        description: (snippet.description ?? "").trim(),
        url: `https://www.youtube.com/watch?v=${v.id}`,
        views: v.statistics?.viewCount ?? "0",
        type,
        liveBroadcastContent: liveContent,
      });
    }
  }

  return videos;
}

function parseRSS(xml: string): YoutubeVideo[] {
  const videos: YoutubeVideo[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];
    const videoId = (entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/) ?? [])[1] ?? "";
    const title = (entry.match(/<media:title><!\[CDATA\[([\s\S]*?)\]\]><\/media:title>/) ?? entry.match(/<title>(.*?)<\/title>/) ?? [])[1] ?? "";
    const published = (entry.match(/<published>(.*?)<\/published>/) ?? [])[1] ?? "";
    const thumbnail = (entry.match(/<media:thumbnail url="([^"]*)"/) ?? [])[1] ?? "";
    const description = (entry.match(/<media:description><!\[CDATA\[([\s\S]*?)\]\]><\/media:description>/) ?? entry.match(/<media:description>([\s\S]*?)<\/media:description>/) ?? [])[1] ?? "";
    const views = (entry.match(/<media:statistics views="([^"]*)"/) ?? [])[1] ?? "0";
    const linkHref = (entry.match(/<link rel="alternate" href="([^"]*)"/) ?? [])[1] ?? `https://www.youtube.com/watch?v=${videoId}`;
    if (videoId) {
      videos.push({
        id: videoId, title: title.trim(), published,
        thumbnail: thumbnail || `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        description: description.trim(), url: linkHref, views, type: "video",
      });
    }
  }
  return videos;
}

async function fetchVideos(): Promise<YoutubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (apiKey) {
    return withRetry(() => fetchAllVideosFromAPI(apiKey));
  }
  const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  return withRetry(async () => {
    const response = await fetch(RSS_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; FaithChurchBot/1.0)" },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`YouTube RSS fetch failed: ${response.status}`);
    const xml = await response.text();
    const videos = parseRSS(xml);
    if (videos.length === 0) throw new Error("RSS returned no videos");
    return videos;
  });
}

export async function warmCache() {
  if (cache || fetchInProgress) return;
  fetchInProgress = true;
  try {
    const videos = await fetchVideos();
    cache = { data: videos, at: Date.now() };
    console.log(`[youtube] Cache warmed with ${videos.length} videos`);
  } catch (err) {
    console.warn("[youtube] Startup cache warm failed:", err instanceof Error ? err.message : err);
  } finally {
    fetchInProgress = false;
  }
}

// ─── Live stream detection (server-side, no CORS issues) ──────────────────────

interface LiveInfo {
  id: string;
  title: string;
  type: "live" | "premiere";
  url: string;
  thumbnail: string;
}

let liveCache: { data: LiveInfo | null; at: number } | null = null;
const LIVE_CACHE_TTL = 90 * 1000; // 90 seconds

async function detectLive(): Promise<LiveInfo | null> {
  const url = `https://www.youtube.com/channel/${CHANNEL_ID}/live`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) return null;
  const html = await res.text();

  const isLive = html.includes('"isLive":true');
  const isUpcoming = html.includes('"isUpcoming":true');
  if (!isLive && !isUpcoming) return null;

  // Find videoId closest to the "isLive":true marker
  const liveIdx = html.indexOf('"isLive":true');
  const searchZone = liveIdx > 0
    ? html.slice(Math.max(0, liveIdx - 800), liveIdx + 200)
    : html;
  const idMatch = searchZone.match(/"videoId":"([A-Za-z0-9_-]{11})"/);
  if (!idMatch) return null;
  const videoId = idMatch[1];

  // Title from <title> tag (most reliable — page has already resolved to the video)
  let title = "";
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (titleMatch) title = titleMatch[1].replace(/\s*-\s*YouTube\s*$/, "").trim();

  console.log(`[youtube] Live detected: ${videoId} — ${title}`);
  return {
    id: videoId,
    title: title || (isLive ? "بث مباشر" : "عرض أول"),
    type: isLive ? "live" : "premiere",
    url: `https://www.youtube.com/watch?v=${videoId}`,
    thumbnail: `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  };
}

router.get("/youtube/live", async (req, res) => {
  if (liveCache && Date.now() - liveCache.at < LIVE_CACHE_TTL) {
    return res.json({ live: !!liveCache.data, ...(liveCache.data ?? {}) });
  }
  try {
    const info = await detectLive();
    liveCache = { data: info, at: Date.now() };
    return res.json({ live: !!info, ...(info ?? {}) });
  } catch (err) {
    console.error("[youtube] Live detect error:", err instanceof Error ? err.message : err);
    if (liveCache) return res.json({ live: !!liveCache.data, ...(liveCache.data ?? {}) });
    return res.json({ live: false });
  }
});

router.get("/youtube/videos", async (req, res) => {
  if (cache && Date.now() - cache.at < CACHE_TTL) {
    return res.json({ videos: cache.data, cached: true, total: cache.data.length });
  }

  if (fetchInProgress && cache) {
    return res.json({ videos: cache.data, cached: true, stale: true, total: cache.data.length });
  }

  fetchInProgress = true;
  try {
    const videos = await fetchVideos();
    cache = { data: videos, at: Date.now() };
    return res.json({ videos, cached: false, total: videos.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[youtube] Fetch error:", message);
    if (cache) {
      return res.json({ videos: cache.data, cached: true, stale: true, total: cache.data.length });
    }
    return res.json({ videos: [], error: message, total: 0 });
  } finally {
    fetchInProgress = false;
  }
});

export default router;
