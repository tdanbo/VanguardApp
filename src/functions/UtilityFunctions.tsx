import axios from "axios";
import { API } from "../Constants";
import { AbilityEntry, ItemEntry } from "../Types";

export function UpperFirstLetter(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function toTitleCase(input: string): string {
  if (!input || typeof input !== "string") {
    return "";
  }
  return input
    .toLowerCase() // Convert whole string to lowercase first
    .split(" ") // Split string by space
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the array back to a string
}

export async function getAbility(name: string) {
  try {
    const response = await axios.get(`${API}/api/abilities/${name}`);
    return response.data as AbilityEntry;
  } catch (error) {
    console.error(`Error fetching ability with name "${name}":`, error);
    throw error;
  }
}

export async function getItem(name: string) {
  try {
    const response = await axios.get(`${API}/api/equipment/${name}`);
    return response.data as ItemEntry;
  } catch (error) {
    console.error(`Error fetching armor with name "${name}":`, error);
    throw error;
  }
}
