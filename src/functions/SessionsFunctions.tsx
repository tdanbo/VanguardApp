import axios from "axios";
import { CharacterEntry, SessionEntry } from "../Types";

export async function postSession(NewSessionEntry: SessionEntry) {
  console.log("Updating Sessions");
  const response = await axios
    .post("http://localhost:8000/api/sessions/", NewSessionEntry)
    .then((res) => console.log(res));

  return response;
}

export async function getCharacters(id: string): Promise<CharacterEntry[]> {
  const response = await axios.get<CharacterEntry[]>(
    `http://localhost:8000/api/session-characters/${id}`,
  );

  return response.data;
}

export async function getSessions(user: string): Promise<SessionEntry[]> {
  const response = await axios.get<SessionEntry[]>(
    `http://localhost:8000/api/sessions/${user}`,
  );

  return response.data;
}

export async function joinSession(id: string, user: string) {
  const response = await axios.put(
    `http://localhost:8000/api/sessions/join/${id}/${user}`,
  );

  return response.data;
}

export async function leaveSession(id: string, user: string) {
  const response = await axios.put(
    `http://localhost:8000/api/sessions/leave/${id}/${user}`,
  );

  return response.data;
}

export async function deleteSession(id: string, user: string) {
  const response = await axios.delete(
    `http://localhost:8000/api/sessions/delete/${id}/${user}`,
  );

  return response.data;
}

export async function deleteSessionCharacter(name: string, id: string) {
  const response = await axios.delete(
    `http://localhost:8000/api/characterlog/${id}/${name}`,
  );
  return response.data;
}

export async function deleteAllSessionCharacters(id: string) {
  const response = await axios.delete(
    `http://localhost:8000/api/sessions/delete_characters/${id}`,
  );
  return response.data;
}

export async function getSessionUsers(id: string) {
  const response = await axios.get(
    `http://localhost:8000/api/sessions/users/${id}`,
  );
  return response.data;
}
