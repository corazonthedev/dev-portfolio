export const LANG_COLORS: Record<string, string> = {
  Python: "#5caf78",
  "C#": "#9b6ef0",
  JavaScript: "#d19a66",
  TypeScript: "#61afef",
  "C++": "#56b6c2",
  GDScript: "#8bc34a",
  CSS: "#61afef",
  HTML: "#d19a66",
  Rust: "#5caf78",
  Go: "#56b6c2",
  Ruby: "#d19a66",
};

export function getLangColor(lang: string | null): string {
  if (!lang) return "#5caf78";
  return LANG_COLORS[lang] || "#5caf78";
}
