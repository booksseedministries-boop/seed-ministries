// Long-form readings (Daily Matters, Articles) have `blocks`, shown in order:
//   { type: "text", body }              a paragraph
//   { type: "verse", body, reference }  a highlighted quote
// Text wrapped in *asterisks* is shown in bold; line breaks are kept.

// Short plain-text preview built from the first text paragraphs.
export const excerpt = (item, paragraphs = 2) =>
  (item.blocks ?? [])
    .filter((block) => block.type === "text")
    .slice(0, paragraphs)
    .map((block) => block.body)
    .join(" ")
    .replaceAll("*", "");
