import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { CharacterEntry } from "../../Types";
import { getCharacters } from "../../functions/SessionsFunctions";
import { SessionContext } from "../../contexts/SessionContext";
import EncounterEntry from "../EncounterEntry";

const Container = styled.div`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;
`;

function EncounterSection() {
  const { session } = useContext(SessionContext);
  const [characterLog, setCharacterLog] = useState<CharacterEntry[]>([]);

  useEffect(() => {
    getCharacters(session.id).then((response) => {
      setCharacterLog(response);
    });
  }, []);

  const sortedInventory = [...characterLog].sort((a, b) => {
    // Provide safe access to the quick values
    let quickA = a.stats.quick.value || 0;
    let quickB = b.stats.quick.value || 0;

    // If quick values are the same, sort by vigilant values
    if (quickA === quickB) {
      let vigilantA = a.stats.vigilant.value || 0;
      let vigilantB = b.stats.vigilant.value || 0;

      // Sort in descending order
      return vigilantB - vigilantA;
    }

    // Otherwise, sort in descending order by quick values
    return quickB - quickA;
  });

  return (
    <Container>
      {Array.from(sortedInventory).map((character, index) => {
        {
          return <EncounterEntry key={index} character={character} />;
        }
      })}
    </Container>
  );
}

export default EncounterSection;
