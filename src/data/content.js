// Turns a folder of JSON files (edited through the /admin CMS) into a list.
// Each entry gets an `id` from its file name. Vite needs the literal glob
// pattern at each call site, so callers pass the result of import.meta.glob.
export const fromFolder = (modules) =>
  Object.entries(modules).map(([path, data]) => ({
    id: path.split("/").pop().replace(/\.json$/, ""),
    ...data,
  }));

// Newest first by an ISO date / month string such as "2026-10-24".
export const newestFirst = (a, b) => String(b.date ?? "").localeCompare(String(a.date ?? ""));
