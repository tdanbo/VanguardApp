import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { CharacterEntry, CreatureEntry } from "../../Types";
import { getCharacters } from "../../functions/SessionsFunctions";
import { SessionContext } from "../../contexts/SessionContext";
import EncounterCharacterEntry from "../EncounterCharacterEntry";
import EncounterCreatureEntry from "../EncounterCreatureEntry";

const Container = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
interface EncounterSectionProps {
  encounter: CreatureEntry[];
}

type ProcessedCreature = CreatureEntry & { name: string };

function processEncounter(encounter: CreatureEntry[]): ProcessedCreature[] {
  const nameCount: { [key: string]: number } = {};
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return encounter.map((creature) => {
    const { name } = creature;

    if (!nameCount[name]) {
      nameCount[name] = 1;
      return creature; // Leave the first creature unchanged
    } else {
      // The following logic will append a letter even to the first duplicate creature
      let suffix = 0;
      let newName = `${name} ${alphabet[suffix]}`;

      while (nameCount[newName]) {
        suffix++;
        newName = `${name} ${alphabet[suffix]}`;
      }

      nameCount[name]++;
      nameCount[newName] = 1;

      return {
        ...creature,
        name: newName,
      };
    }
  });
}
function EncounterSection({ encounter }: EncounterSectionProps) {
  const { session } = useContext(SessionContext);
  const [characterLog, setCharacterLog] = useState<CharacterEntry[]>([]);
  const processedEncounter = processEncounter(encounter);

  useEffect(() => {
    getCharacters(session.id).then((response) => {
      setCharacterLog(response);
    });
  }, []);

  // Combine characterLog and encounter into one list
  const combinedList = [...characterLog, ...processedEncounter];

  const sortedInventory = combinedList.sort((a, b) => {
    // Determine the type and get the quick values
    let quickA = "id" in a ? a.stats.quick.value : a.stats.quick;
    let quickB = "id" in b ? b.stats.quick.value : b.stats.quick;

    // If quick values are the same, sort by vigilant values
    if (quickA === quickB) {
      let vigilantA = "id" in a ? a.stats.vigilant.value : a.stats.vigilant;
      let vigilantB = "id" in b ? b.stats.vigilant.value : b.stats.vigilant;

      // Sort in descending order
      return vigilantB - vigilantA;
    }

    // Otherwise, sort in descending order by quick values
    return quickB - quickA;
  });

  return (
    <Container>
      {Array.from(sortedInventory).map((entry, index) => {
        if ("id" in entry) {
          return <EncounterCharacterEntry key={index} character={entry} />;
        } else {
          return <EncounterCreatureEntry key={index} creature={entry} />;
        }
        return null; // Return null or some other default JSX if none of the conditions match
      })}
    </Container>
  );
}

export default EncounterSection;
