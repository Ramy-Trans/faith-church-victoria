const CHANNEL_ID = "UCYdsXaXzdLvgnJL9gsBxY5g";
const UPLOADS_PLAYLIST_ID = "UUYdsXaXzdLvgnJL9gsBxY5g";
const MAX_VIDEOS = 100;

async function fetchAllVideosFromAPI(apiKey) {
  const videoIds = [];
  let pageToken;

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
    const items = data.items ?? [];

    for (const item of items) {
      const id = item.snippet?.resourceId?.videoId;
      if (id) videoIds.push(id);
    }

    pageToken = data.nextPageToken;
    if (!pageToken || videoIds.length >= MAX_VIDEOS) break;
  }

  if (videoIds.length === 0) return [];

  const videos = [];
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

      let type = "video";
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

function parseRSS(xml) {
  const videos = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];
    const videoId = (entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/) ?? [])[1] ?? "";
    const title =
      (entry.match(/<media:title><!\[CDATA\[([\s\S]*?)\]\]><\/media:title>/) ??
        entry.match(/<title>(.*?)<\/title>/) ?? [])[1] ?? "";
    const published = (entry.match(/<published>(.*?)<\/published>/) ?? [])[1] ?? "";
    const thumbnail = (entry.match(/<media:thumbnail url="([^"]*)"/) ?? [])[1] ?? "";
    const description =
      (entry.match(/<media:description><!\[CDATA\[([\s\S]*?)\]\]><\/media:description>/) ??
        entry.match(/<media:description>([\s\S]*?)<\/media:description>/) ?? [])[1] ?? "";
    const views = (entry.match(/<media:statistics views="([^"]*)"/) ?? [])[1] ?? "0";
    const linkHref =
      (entry.match(/<link rel="alternate" href="([^"]*)"/) ?? [])[1] ??
      `https://www.youtube.com/watch?v=${videoId}`;
    if (videoId) {
      videos.push({
        id: videoId,
        title: title.trim(),
        published,
        thumbnail: thumbnail || `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        description: description.trim(),
        url: linkHref,
        views,
        type: "video",
      });
    }
  }
  return videos;
}

export const handler = async () => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    let videos;

    if (apiKey) {
      videos = await fetchAllVideosFromAPI(apiKey);
    } else {
      const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
      const response = await fetch(RSS_URL, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; FaithChurchBot/1.0)" },
      });
      if (!response.ok) throw new Error(`YouTube RSS fetch failed: ${response.status}`);
      const xml = await response.text();
      videos = parseRSS(xml);
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ videos, cached: false, total: videos.length }),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("YouTube fetch error:", message);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: message, videos: [] }),
    };
  }
};
