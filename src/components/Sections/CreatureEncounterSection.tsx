import { useState, useEffect } from "react";
import styled from "styled-components";
import { CharacterEntry, SessionEntry } from "../../Types";
import EncounterCharacterEntry from "../EncounterCharacterEntry";
import EncounterCreatureEntry from "../EncounterCreatureEntry";
import { Stat } from "../../Types";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

interface EncounterSectionProps {
  encounter: CharacterEntry[];
  setCreatureEncounter: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
  onDeleteCreature: (id: string) => void;
  session: SessionEntry;
  websocket: WebSocket;
  isCreature: boolean;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreatureEncounterSection({
  encounter,
  setCreatureEncounter,
  onDeleteCreature,
  session,
  websocket,
  isCreature,
  setIsCreature,
  setCharacterName,
  setGmMode,
}: EncounterSectionProps) {
  const [characterLog, setCharacterLog] = useState<CharacterEntry[]>([]);
  // If setSortedEncounter is part of your useState declaration, it should look like this
  const [sortedEncounter, setSortedEncounter] = useState<
    (CharacterEntry | CharacterEntry)[]
  >([]);

  useEffect(() => {
    setCharacterLog(session.characters);
  }, [encounter, session]);

  useEffect(() => {
    // Assuming combinedList is already declared and available in this scope
    const combinedList = [...characterLog, ...encounter];

    const sortedEncounter = combinedList.sort((a, b) => {
      // Define a type guard to check if the stats are in the expected format
      const isStatObject = (stat: number | Stat): stat is Stat => {
        return (stat as Stat).value !== undefined;
      };

      // Determine the type and get the quick values
      let quickA = isStatObject(a.stats.quick)
        ? a.stats.quick.value
        : a.stats.quick;
      let quickB = isStatObject(b.stats.quick)
        ? b.stats.quick.value
        : b.stats.quick;

      // If quick values are the same, sort by vigilant values
      if (quickA === quickB) {
        let vigilantA = isStatObject(a.stats.vigilant)
          ? a.stats.vigilant.value
          : a.stats.vigilant;
        let vigilantB = isStatObject(b.stats.vigilant)
          ? b.stats.vigilant.value
          : b.stats.vigilant;

        // Sort in descending order
        return vigilantB - vigilantA;
      }

      // Otherwise, sort in descending order by quick values
      return quickB - quickA;
    });

    setSortedEncounter(sortedEncounter); // Update the state with the sorted list
  }, [characterLog, encounter]);

  return (
    <Container>
      {Array.from(sortedEncounter).map((entry, index) => {
        if (entry.id === session.id) {
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
              onDeleteCreature={() => {
                onDeleteCreature(entry.id);
              }}
              setCreatureEncounter={setCreatureEncounter}
              encounter={encounter}
              session={session}
              websocket={websocket}
              isCreature={isCreature}
              setGmMode={setGmMode}
              setCharacterName={setCharacterName}
              setIsCreature={setIsCreature}
            />
          );
        }
      })}
    </Container>
  );
}

export default CreatureEncounterSection;
