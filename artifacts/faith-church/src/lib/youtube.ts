const CHANNEL_ID = "UCYdsXaXzdLvgnJL9gsBxY5g";
const CHANNEL_HANDLE = "Faithchegypt";
const SESSION_KEY = "fc_yt_cache_v2";
const SESSION_TTL = 15 * 60 * 1000; // 15 min
const LIVE_KEY = "fc_live_cache_v1";
const LIVE_TTL = 2 * 60 * 1000; // 2 min

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
      e.match(/<title>(.*?)<\/title>/) ?? []
    )[1] ?? "";
    const published = (e.match(/<published>(.*?)<\/published>/) ?? [])[1] ?? "";
    const thumbnail =
      (e.match(/<media:thumbnail url="([^"]*)"/) ?? [])[1] ||
      `https://i3.ytimg.com/vi/${id}/hqdefault.jpg`;
    const description = (
      e.match(/<media:description><!\[CDATA\[([\s\S]*?)\]\]><\/media:description>/) ??
      e.match(/<media:description>([\s\S]*?)<\/media:description>/) ?? []
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
    } catch { continue; }
  }
  throw new Error("All RSS proxies failed");
}

// ─── Cache helpers ─────────────────────────────────────────────────────────────

function readCache<T>(key: string, ttl: number): { found: true; data: T } | { found: false } {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return { found: false };
    const { data, at } = JSON.parse(raw) as { data: T; at: number };
    if (Date.now() - at < ttl) return { found: true, data };
  } catch {}
  return { found: false };
}

function writeCache<T>(key: string, data: T) {
  try { sessionStorage.setItem(key, JSON.stringify({ data, at: Date.now() })); } catch {}
}

// ─── Video list ────────────────────────────────────────────────────────────────

export async function getYouTubeVideos(): Promise<YTVideo[]> {
  const c = readCache<YTVideo[]>(SESSION_KEY, SESSION_TTL);
  if (c.found) return c.data;

  try {
    const res = await fetch("/api/youtube/videos", { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      const videos: YTVideo[] = (data.videos ?? []).map((v: any) => ({
        id: v.id, title: v.title, published: v.published,
        thumbnail: v.thumbnail, description: v.description,
        url: v.url, views: v.views, type: v.type ?? "video",
      }));
      if (videos.length > 0) { writeCache(SESSION_KEY, videos); return videos; }
    }
  } catch {}

  const videos = await fetchRSS();
  writeCache(SESSION_KEY, videos);
  return videos;
}

// ─── Live stream detection ─────────────────────────────────────────────────────
//
// Strategy: fetch the channel's /live page through CORS proxies.
// YouTube redirects this to the actual watch page when a stream is live.
// We then do SIMPLE STRING SEARCH on the raw HTML — no JSON.parse needed.
// This avoids the "lazy regex stops at first }" bug.

function decodeUnicode(s: string): string {
  return s.replace(/\\u[\dA-Fa-f]{4}/g, m => String.fromCharCode(parseInt(m.slice(2), 16)));
}

function extractTitle(html: string): string {
  // og:title is the most reliable
  const og = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/);
  if (og) return decodeUnicode(og[1]);
  const og2 = html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:title"/);
  if (og2) return decodeUnicode(og2[1]);
  // name=title fallback
  const nt = html.match(/<meta[^>]+name="title"[^>]+content="([^"]+)"/);
  if (nt) return decodeUnicode(nt[1]);
  return "";
}

async function fetchLivePage(): Promise<LiveStreamInfo | null> {
  // Two YouTube URL formats that both redirect to the current live stream
  const liveUrls = [
    `https://www.youtube.com/@${CHANNEL_HANDLE}/live`,
    `https://www.youtube.com/channel/${CHANNEL_ID}/live`,
  ];
  const makeProxies = [
    (u: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
    (u: string) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
  ];

  for (const liveUrl of liveUrls) {
    for (const makeProxy of makeProxies) {
      try {
        const res = await fetch(makeProxy(liveUrl), { signal: AbortSignal.timeout(10000) });
        if (!res.ok) continue;
        const html = await res.text();

        // Simple string checks — no JSON.parse, avoids regex-nesting bugs
        const isLive =
          html.includes('"isLive":true') ||
          html.includes('"isLiveNow":true') ||
          html.includes('"isLiveContent":true');
        const isUpcoming =
          html.includes('"isUpcoming":true') &&
          html.includes('"scheduledStartTime"');

        if (!isLive && !isUpcoming) {
          // This URL is not live — no need to try more proxies for it
          break;
        }

        // Extract the first video ID in the page
        const idMatch = html.match(/"videoId":"([A-Za-z0-9_-]{11})"/);
        if (!idMatch) continue;
        const videoId = idMatch[1];

        const title = extractTitle(html) || (isLive ? "بث مباشر" : "عرض أول");

        return {
          id: videoId,
          title,
          type: isLive ? "live" : "premiere",
          url: `https://www.youtube.com/watch?v=${videoId}`,
          thumbnail: `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        };
      } catch { continue; }
    }
  }
  return null;
}

// Secondary: check Invidious API (clean JSON, no HTML scraping)
async function checkLiveViaInvidious(): Promise<LiveStreamInfo | null> {
  const instances = [
    `https://inv.tux.pizza`,
    `https://invidious.privacydev.net`,
  ];
  for (const base of instances) {
    try {
      const res = await fetch(
        `${base}/api/v1/channels/${CHANNEL_ID}/videos?sort_by=newest&type=all`,
        { signal: AbortSignal.timeout(7000), headers: { Accept: "application/json" } }
      );
      if (!res.ok) continue;
      const data = await res.json();
      const videos: any[] = data.videos ?? [];
      const live = videos.find(v => v.liveNow === true || v.isUpcoming === true);
      if (!live) return null;
      return {
        id: live.videoId,
        title: live.title ?? (live.liveNow ? "بث مباشر" : "عرض أول"),
        type: live.liveNow ? "live" : "premiere",
        url: `https://www.youtube.com/watch?v=${live.videoId}`,
        thumbnail: `https://i3.ytimg.com/vi/${live.videoId}/maxresdefault.jpg`,
      };
    } catch { continue; }
  }
  return null;
}

export async function getLiveStream(): Promise<LiveStreamInfo | null> {
  const c = readCache<LiveStreamInfo | null>(LIVE_KEY, LIVE_TTL);
  if (c.found) return c.data;

  // Run both methods in parallel; first non-null result wins
  const [pageResult, invResult] = await Promise.allSettled([
    fetchLivePage(),
    checkLiveViaInvidious(),
  ]);

  const info =
    (pageResult.status === "fulfilled" && pageResult.value) ||
    (invResult.status === "fulfilled" && invResult.value) ||
    null;

  // Only cache if at least one method returned a definitive answer
  const hadSuccess =
    pageResult.status === "fulfilled" || invResult.status === "fulfilled";
  if (hadSuccess) writeCache(LIVE_KEY, info);

  return info;
}

export function invalidateLiveCache() {
  try { sessionStorage.removeItem(LIVE_KEY); } catch {}
}
