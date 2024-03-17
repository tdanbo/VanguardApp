import { Socket } from "socket.io-client";
import styled from "styled-components";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  SessionEntry,
} from "../Types";
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
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
  characterLog: CharacterEntry[];
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setCharacter: React.Dispatch<React.SetStateAction<CharacterEntry>>;
}

function CreatureEncounterSection({
  session,
  websocket,
  isCreature,
  setIsCreature,
  setGmMode,
  characterLog,
  activeState,
  advantage,
  setActiveState,
  setAdvantage,
  setCharacter,
}: EncounterSectionProps) {
  // If setSortedEncounter is part of your useState declaration, it should look like this

  const onCreatureDelete = (name: string) => {
    const newEncounter = session.encounter.filter((entry) => entry.id !== name);
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
                onCreatureDelete(entry.id);
              }}
              session={session}
              websocket={websocket}
              isCreature={isCreature}
              setGmMode={setGmMode}
              setIsCreature={setIsCreature}
              activeState={activeState}
              advantage={advantage}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
              setCharacter={setCharacter}
            />
          );
        }
      })}
    </Container>
  );
}

export default CreatureEncounterSection;
