// Pulls the 11-character video id out of any common YouTube link.
export function youtubeId(url) {
  const match = String(url).match(
    /(?:youtube\.com\/(?:shorts\/|watch\?(?:.*&)?v=|embed\/|live\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

export const youtubeThumbnail = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

// Privacy-friendly player that starts playing straight away.
export const youtubeEmbedUrl = (id) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`;

export const youtubeVideoUrl = (id) => `https://www.youtube.com/watch?v=${id}`;

// Opens connections to the servers the YouTube player needs, so pressing play
// does not have to wait for them. Safe to call more than once.
const PLAYER_ORIGINS = [
  "https://www.youtube-nocookie.com",
  "https://www.youtube.com",
  "https://www.google.com",
  "https://i.ytimg.com",
  "https://googleads.g.doubleclick.net",
  "https://static.doubleclick.net",
];
let warmedUp = false;

export function warmUpYoutube() {
  if (warmedUp || typeof document === "undefined") return;
  warmedUp = true;
  for (const origin of PLAYER_ORIGINS) {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    link.crossOrigin = "";
    document.head.appendChild(link);
  }
}

// Looks up a video's title through YouTube's public oEmbed service.
// Results are cached for the visit; resolves to null if it cannot be found.
const titleCache = new Map();

export function fetchYoutubeTitle(id) {
  if (!titleCache.has(id)) {
    const url = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(
      `https://www.youtube.com/watch?v=${id}`
    )}`;
    titleCache.set(
      id,
      fetch(url)
        .then((response) => (response.ok ? response.json() : null))
        .then((data) => data?.title ?? null)
        .catch(() => null)
    );
  }
  return titleCache.get(id);
}
