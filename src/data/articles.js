// Articles are edited in /admin → Articles (content/articles/*.json).
// Each has `blocks` for its Read More popup; see ./blocks.js for the format.
import { fromFolder, newestFirst } from "./content";

const articles = fromFolder(
  import.meta.glob("../../content/articles/*.json", { eager: true, import: "default" })
).sort(newestFirst);

export default articles;
