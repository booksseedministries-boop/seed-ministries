// Daily Matters reflections are edited in /admin → Daily Matters
// (content/daily-matters/*.json), newest first. See ./blocks.js for the format.
import { fromFolder, newestFirst } from "./content";

const dailyMatters = fromFolder(
  import.meta.glob("../../content/daily-matters/*.json", { eager: true, import: "default" })
).sort(newestFirst);

export default dailyMatters;
