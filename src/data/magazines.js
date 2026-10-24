// Magazine issues are edited in /admin → Magazine issues
// (content/magazines/*.json); name and prices in /admin → Settings.
import { fromFolder } from "./content";
import settings from "../../content/settings/magazine.json";

export const magazineName = settings.name;
export const magazineTagline = settings.tagline;
export const yearlySubscriptionPrice = settings.yearlySubscriptionPrice;
export const singleIssuePrice = settings.singleIssuePrice;

// Newest issue first.
const magazines = fromFolder(
  import.meta.glob("../../content/magazines/*.json", { eager: true, import: "default" })
).sort((a, b) => String(b.month).localeCompare(String(a.month)));

export default magazines;
