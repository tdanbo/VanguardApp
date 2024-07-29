import { Socket } from "socket.io-client";
import styled from "styled-components";
import { CharacterEntry, DisplayType, SessionEntry } from "../Types";
import { update_session } from "../functions/SessionsFunctions";
import EncounterCharacterEntry from "./EncounterCharacterEntry";
import EncounterCreatureEntry from "./EncounterCreatureEntry";
const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

interface EncounterSectionProps {
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  characterLog: CharacterEntry[];

  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;

  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
}

function CreatureEncounterSection({
  session,
  websocket,
  isCreature,
  setIsCreature,
  characterLog,

  setCharacterId,
  setIsGm,

  setDisplay,
}: EncounterSectionProps) {
  // If setSortedEncounter is part of your useState declaration, it should look like this

  const onCreatureDelete = (name: string) => {
    const newEncounter = session.encounter.filter(
      (entry) => entry.name !== name,
    );
    session.encounter = newEncounter;
    update_session(session, websocket);
  };

  return (
    <Container>
      {Array.from(characterLog).map((entry, index) => {
        if (!entry.creature) {
          return (
            <EncounterCharacterEntry
              key={entry.id + index} // Assuming 'id' exists on CharacterEntry
              character={entry}
            />
          );
        } else {
          return (
            <EncounterCreatureEntry
              key={entry.name + index}
              creature={entry}
              onCreatureDelete={() => {
                onCreatureDelete(entry.name);
              }}
              session={session}
              websocket={websocket}
              isCreature={isCreature}
              setIsGm={setIsGm}
              setIsCreature={setIsCreature}
              setCharacterId={setCharacterId}
              setDisplay={setDisplay}
            />
          );
        }
      })}
    </Container>
  );
}

export default CreatureEncounterSection;
