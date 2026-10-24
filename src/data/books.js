// Books are edited in /admin → Books (content/books/*.json).
import { fromFolder } from "./content";

const books = fromFolder(
  import.meta.glob("../../content/books/*.json", { eager: true, import: "default" })
)
  .map((book) => ({ ...book, access: book.label }))
  .sort((a, b) => (a.position ?? 999) - (b.position ?? 999));

export default books;
