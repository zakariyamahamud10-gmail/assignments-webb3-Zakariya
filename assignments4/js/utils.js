export async function fetchHouses() {
  const dataUrl = new URL("../data/houses.json", import.meta.url);
  const response = await fetch(dataUrl);
  if (!response.ok) {
    throw new Error("Kunde inte hämta husdata.");
  }
  return response.json();
}

export function scareLevelText(level) {
  const levels = ["", "Mysigt", "Lite läskigt", "Obehagligt", "Skräckinjagande", "Ren terror"];
  return levels[level] ?? "Okänt";
}
