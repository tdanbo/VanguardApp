import axios from "axios";
import { CharacterEntry, SessionEntry } from "../Types";
import { API } from "../Constants";
export async function postSession(NewSessionEntry: SessionEntry) {
  const response = await axios
    .post(`${API}/api/sessions/`, NewSessionEntry)
    .then((res) => console.log(res));

  return response;
}

export async function getCharacters(id: string): Promise<CharacterEntry[]> {
  const response = await axios.get<CharacterEntry[]>(
    `${API}/api/session-characters/${id}`,
  );

  return response.data;
}

export async function getSession(id: string): Promise<SessionEntry> {
  const response = await axios.get<SessionEntry>(`${API}/api/sessions/${id}`);

  return response.data;
}

export async function joinSession(id: string, user: string) {
  const response = await axios.put(`${API}/api/sessions/join/${id}/${user}`);

  return response.data;
}

export async function leaveSession(id: string, user: string) {
  const response = await axios.put(`${API}/api/sessions/leave/${id}/${user}`);

  return response.data;
}

export async function deleteSession(id: string) {
  const response = await axios.delete(`${API}/api/sessions/delete/${id}`);

  return response.data;
}

export async function deleteSessionCharacter(name: string, id: string) {
  const response = await axios.delete(`${API}/api/characterlog/${id}/${name}`);
  return response.data;
}

export async function deleteAllSessionCharacters(id: string) {
  const response = await axios.delete(
    `${API}/api/sessions/delete_characters/${id}`,
  );
  return response.data;
}

export async function getSessionUsers(id: string) {
  const response = await axios.get(`${API}/api/sessions/users/${id}`);
  return response.data;
}
