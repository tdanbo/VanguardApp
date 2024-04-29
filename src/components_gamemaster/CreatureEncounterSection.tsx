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
  characterLog: CharacterEntry[];
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;
  criticalState: boolean;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreatureEncounterSection({
  session,
  websocket,
  isCreature,
  setIsCreature,
  characterLog,
  activeState,
  advantage,
  setActiveState,
  setAdvantage,
  setCharacterId,
  setIsGm,
  criticalState,
  setCriticalState,
}: EncounterSectionProps) {
  // If setSortedEncounter is part of your useState declaration, it should look like this

  const onCreatureDelete = (name: string) => {
    console.log("Deleting creature: ", name);
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
              activeState={activeState}
              advantage={advantage}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
              setCharacterId={setCharacterId}
              criticalState={criticalState}
              setCriticalState={setCriticalState}
            />
          );
        }
      })}
    </Container>
  );
}

export default CreatureEncounterSection;
