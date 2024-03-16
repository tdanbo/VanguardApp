import axios from "axios";
import { Socket } from "socket.io-client";
import { API } from "../Constants";
import { CharacterEntry, SessionEntry } from "../Types";

export async function get_session(id: string): Promise<SessionEntry> {
  const response = await axios.get<SessionEntry>(`${API}/api/session/${id}`);
  return response.data;
}

export async function update_session(
  session: SessionEntry,
  websocket: Socket,
  character?: CharacterEntry,
  isCreature?: boolean,
) {
  // This function is called when the session is updated, and it will proc the broadcast to all users
  console.log("Updating session / Sending Updates To Clients");
  websocket.emit("update", session);
  try {
    if (isCreature) {
      console.log("Updating Creature!!!");
      console.log(character);
      await axios.put(`${API}/api/creatures/`, character);
    } else {
      await axios.put(`${API}/api/session/`, session);
    }
  } catch (error) {
    console.error(error);
    throw error; // You may want to throw the error so that it can be caught and handled elsewhere if needed
  }
}
