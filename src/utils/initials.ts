import { HONORIFICS } from "@/constants/site";

export function getInitials(name: string) {
  const words = name
    .replace(/\./g, "")
    .split(" ")
    .filter((w) => w && !HONORIFICS.includes(w.toLowerCase()));
  return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
