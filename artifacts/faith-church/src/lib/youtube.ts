const CHANNEL_ID = "UCYdsXaXzdLvgnJL9gsBxY5g";
const CHANNEL_HANDLE = "@Faithchegypt";
const SESSION_KEY = "fc_yt_cache_v2";
const SESSION_TTL = 15 * 60 * 1000; // 15 min
const LIVE_KEY = "fc_live_cache_v1";
const LIVE_TTL = 2 * 60 * 1000; // 2 min — always check freshly for live

export interface YTVideo {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  description: string;
  url: string;
  views: string;
  type: "video" | "live" | "premiere";
}

export interface LiveStreamInfo {
  id: string;
  title: string;
  type: "live" | "premiere";
  url: string;
  thumbnail: string;
}

// ─── RSS parser ────────────────────────────────────────────────────────────────

function parseRSSXml(xml: string): YTVideo[] {
  const videos: YTVideo[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let m: RegExpExecArray | null;
  while ((m = entryRegex.exec(xml)) !== null) {
    const e = m[1];
    const id = (e.match(/<yt:videoId>(.*?)<\/yt:videoId>/) ?? [])[1] ?? "";
    if (!id) continue;
    const title = (
      e.match(/<media:title><!\[CDATA\[([\s\S]*?)\]\]><\/media:title>/) ??
      e.match(/<title>(.*?)<\/title>/) ??
      []
    )[1] ?? "";
    const published = (e.match(/<published>(.*?)<\/published>/) ?? [])[1] ?? "";
    const thumbnail =
      (e.match(/<media:thumbnail url="([^"]*)"/) ?? [])[1] ||
      `https://i3.ytimg.com/vi/${id}/hqdefault.jpg`;
    const description = (
      e.match(/<media:description><!\[CDATA\[([\s\S]*?)\]\]><\/media:description>/) ??
      e.match(/<media:description>([\s\S]*?)<\/media:description>/) ??
      []
    )[1] ?? "";
    const views = (e.match(/<media:statistics views="([^"]*)"/) ?? [])[1] ?? "0";
    const linkHref =
      (e.match(/<link rel="alternate" href="([^"]*)"/) ?? [])[1] ??
      `https://www.youtube.com/watch?v=${id}`;
    videos.push({
      id, title: title.trim(), published, thumbnail,
      description: description.trim(), url: linkHref, views, type: "video",
    });
  }
  return videos;
}

async function fetchRSS(): Promise<YTVideo[]> {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const proxies = [
    `https://corsproxy.io/?url=${encodeURIComponent(rssUrl)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`,
  ];
  for (const proxy of proxies) {
    try {
      const res = await fetch(proxy, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) continue;
      const xml = await res.text();
      const videos = parseRSSXml(xml);
      if (videos.length > 0) return videos;
    } catch {
      continue;
    }
  }
  throw new Error("All RSS proxies failed");
}

// ─── Session storage helpers ───────────────────────────────────────────────────

function readCache<T>(key: string, ttl: number): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, at } = JSON.parse(raw) as { data: T; at: number };
    if (Date.now() - at < ttl) return data;
  } catch {}
  return null;
}

function writeCache<T>(key: string, data: T) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, at: Date.now() }));
  } catch {}
}

// ─── Video list ────────────────────────────────────────────────────────────────

export async function getYouTubeVideos(): Promise<YTVideo[]> {
  const cached = readCache<YTVideo[]>(SESSION_KEY, SESSION_TTL);
  if (cached) return cached;

  // Try backend first (same-origin, fast cache hit in production)
  try {
    const res = await fetch("/api/youtube/videos", { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      const videos: YTVideo[] = (data.videos ?? []).map((v: any) => ({
        id: v.id, title: v.title, published: v.published,
        thumbnail: v.thumbnail, description: v.description,
        url: v.url, views: v.views, type: v.type ?? "video",
      }));
      if (videos.length > 0) {
        writeCache(SESSION_KEY, videos);
        return videos;
      }
    }
  } catch {}

  const videos = await fetchRSS();
  writeCache(SESSION_KEY, videos);
  return videos;
}

// ─── Live stream detection ─────────────────────────────────────────────────────
// Fetches the channel's /live page via CORS proxies.
// YouTube redirects this URL to the actual live video page when a stream is live,
// and the raw HTML contains ytInitialPlayerResponse with isLive / isUpcoming.

function decodeUnicode(s: string): string {
  return s.replace(/\\u[\dA-Fa-f]{4}/g, m =>
    String.fromCharCode(parseInt(m.slice(2), 16))
  );
}

async function fetchLivePage(): Promise<LiveStreamInfo | null> {
  const liveUrl = `https://www.youtube.com/${CHANNEL_HANDLE}/live`;
  const proxies = [
    `https://corsproxy.io/?url=${encodeURIComponent(liveUrl)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(liveUrl)}`,
  ];

  for (const proxy of proxies) {
    try {
      const res = await fetch(proxy, { signal: AbortSignal.timeout(10000) });
      if (!res.ok) continue;
      const html = await res.text();

      // Extract ytInitialPlayerResponse from inline script
      const playerMatch = html.match(/ytInitialPlayerResponse\s*=\s*(\{.+?\})\s*;/s);
      if (!playerMatch) continue;

      let playerData: any;
      try { playerData = JSON.parse(playerMatch[1]); } catch { continue; }

      const vd = playerData?.videoDetails;
      if (!vd?.videoId) continue;

      const isLive = vd.isLive === true || vd.isLiveContent === true;
      const isUpcoming = vd.isUpcoming === true;

      if (!isLive && !isUpcoming) {
        // Channel live URL loaded but no active/upcoming stream
        return null;
      }

      const title = decodeUnicode(vd.title ?? "");
      return {
        id: vd.videoId,
        title,
        type: isLive ? "live" : "premiere",
        url: `https://www.youtube.com/watch?v=${vd.videoId}`,
        thumbnail:
          `https://i3.ytimg.com/vi/${vd.videoId}/maxresdefault.jpg`,
      };
    } catch {
      continue;
    }
  }
  return null;
}

export async function getLiveStream(): Promise<LiveStreamInfo | null> {
  // Short-lived cache — refresh every 2 min so live banners appear quickly
  const cached = readCache<LiveStreamInfo | null>(LIVE_KEY, LIVE_TTL);
  if (cached !== null) return cached; // note: null is a valid cached value (no stream)

  const info = await fetchLivePage().catch(() => null);
  writeCache(LIVE_KEY, info ?? null);
  return info;
}

/** Call this to force-clear the live cache and re-check immediately */
export function invalidateLiveCache() {
  try { sessionStorage.removeItem(LIVE_KEY); } catch {}
}
