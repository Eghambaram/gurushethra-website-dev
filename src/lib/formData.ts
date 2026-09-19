// Small helpers for parsing FormData in admin Server Actions — every future
// CRUD form (Prompts 6-13) reuses these for the same recurring shapes.

export function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export function nullableStr(formData: FormData, key: string): string | null {
  const value = str(formData, key);
  return value || null;
}

export function num(formData: FormData, key: string): number {
  return Number(formData.get(key) ?? 0);
}

export function bool(formData: FormData, key: string): boolean {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

// One array item per line — used for headlineLines, qualifications, achievements, features.
export function lines(formData: FormData, key: string): string[] {
  return str(formData, key)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

// One "Label: Value" pair per line — used for credential-style jsonb fields.
export function pairs(formData: FormData, key: string): { label: string; value: string }[] {
  return lines(formData, key)
    .map((line) => {
      const i = line.indexOf(":");
      return i === -1 ? { label: line, value: "" } : { label: line.slice(0, i).trim(), value: line.slice(i + 1).trim() };
    })
    .filter((p) => p.label);
}
