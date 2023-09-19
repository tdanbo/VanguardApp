export function UpperFirstLetter(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }
  return input.charAt(0).toUpperCase() + input.slice(1);
}
