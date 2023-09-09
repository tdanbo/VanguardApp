import axios from "axios";
import { CharacterEntry, SessionEntry } from "../Types";

export function postSession(NewSessionEntry: SessionEntry) {
  console.log("Updating Sessions");
  axios
    .post("http://localhost:8000/api/sessions/", NewSessionEntry)
    .then((res) => console.log(res));
}

export async function getSessions(user: string): Promise<SessionEntry[]> {
  const response = await axios.get<SessionEntry[]>(
    `http://localhost:8000/api/sessions/${user}`,
  );

  return response.data;
}

export async function getCharacters(id: string): Promise<CharacterEntry[]> {
  const response = await axios.get<CharacterEntry[]>(
    `http://localhost:8000/api/session-characters/${id}`,
  );

  return response.data;
}
