import axios from "axios";
import { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { API } from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";
export async function postSession(NewSessionEntry: SessionEntry) {
  const response = await axios
    .post(`${API}/api/sessions/`, NewSessionEntry)
    .then((res) => console.log(res));

  return response;
}

export async function get_session(id: string): Promise<SessionEntry> {
  const response = await axios.get<SessionEntry>(`${API}/api/session/${id}`);
  return response.data;
}

export async function get_long_session(
  session: SessionEntry,
): Promise<SessionEntry> {
  try {
    const response = await axios.get<SessionEntry>(
      `${API}/api/sessions/${session.id}/${session.state}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching long session:", error);
    // Optionally rethrow the error or handle it as needed
    throw error;
  }
}

export async function update_session(
  session: SessionEntry,
  character: CharacterEntry,
  isCreature: boolean,
  websocket: Socket,
) {
  // This function is called when the session is updated, and it will proc the broadcast to all users
  console.log("Updating session / Sending Updates To Clients");
  session.state = uuidv4();
  try {
    websocket.emit('update', session);
    if (isCreature) {
      await axios.put(`${API}/api/creatures/`, character);
    } else {
    websocket.emit('update', session);
    await axios.put(`${API}/api/session/`, session);
    }
  } catch (error) {
    console.error(error);
    throw error; // You may want to throw the error so that it can be caught and handled elsewhere if needed
  }
}
