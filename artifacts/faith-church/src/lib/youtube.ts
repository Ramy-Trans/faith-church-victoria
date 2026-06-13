const CHANNEL_ID = "UCYdsXaXzdLvgnJL9gsBxY5g";
const SESSION_KEY = "fc_yt_cache_v2";
const SESSION_TTL = 15 * 60 * 1000; // 15 min

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

function readCache(): YTVideo[] | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const { videos, at } = JSON.parse(raw) as { videos: YTVideo[]; at: number };
    if (Date.now() - at < SESSION_TTL) return videos;
  } catch {}
  return null;
}

function writeCache(videos: YTVideo[]) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ videos, at: Date.now() }));
  } catch {}
}

export async function getYouTubeVideos(): Promise<YTVideo[]> {
  const cached = readCache();
  if (cached) return cached;

  // Try backend first (same-origin, no proxy chain for production build)
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
        writeCache(videos);
        return videos;
      }
    }
  } catch {}

  // Fallback: fetch RSS directly via CORS proxy
  const videos = await fetchRSS();
  writeCache(videos);
  return videos;
}
