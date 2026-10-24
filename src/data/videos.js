// Videos are edited in /admin → Videos (content/videos/*.json), newest first.
// Each has `url` (the short), and optionally `fullVideo` (the full message,
// shown with a "Watch full message" button) and `title` (replaces the title
// fetched from YouTube). Any common YouTube link format works.
import { fromFolder, newestFirst } from "./content";

const videos = fromFolder(
  import.meta.glob("../../content/videos/*.json", { eager: true, import: "default" })
).sort(newestFirst);

export const youtubeChannelUrl = "https://www.youtube.com/channel/UC2I8UjUYIOzEGFlLcD9nHOg";

export default videos;
