import axios from "axios";
import { API } from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
export async function postSession(NewSessionEntry: SessionEntry) {
  const response = await axios
    .post(`${API}/api/sessions/`, NewSessionEntry)
    .then((res) => console.log(res));

  return response;
}

export async function getCharacters(id: string): Promise<CharacterEntry[]> {
  if (id === "") return [];
  const response = await axios.get<CharacterEntry[]>(
    `${API}/api/session-characters/${id}`,
  );

  return response.data;
}

export async function updateSession(
  session: SessionEntry,
  character: CharacterEntry,
  isCreature: boolean,
) {
  if (isCreature) {
    const response = await axios.put(
      `${API}/api/creaturelog/${character.name}`,
      character,
    );
    return session;
  } else {
    const response = await axios.put<SessionEntry>(
      `${API}/api/sessions/${session.id}`,
      session,
    );
    return response.data;
  }
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

export async function update_session(
  session: SessionEntry,
  character: CharacterEntry,
  isCreature: boolean,
  websocket: WebSocket,
) {
  // This function is called when the session is updated, and it will proc the broadcast to all users
  console.log("Updating session / Sending Updates To Clients");
  try {
    if (isCreature) {
      const creature = await axios.put(
        `${API}/api/creaturelog/${character.name}`,
        character,
      );
    }

    const res = await axios.put(`${API}/api/session/${session.id}`, session);
    websocket.send(JSON.stringify(session));
  } catch (error) {
    console.error(error);
    throw error; // You may want to throw the error so that it can be caught and handled elsewhere if needed
  }
}
