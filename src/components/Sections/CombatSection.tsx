import CombatEntryItem from "../CombatEntryItem";
import { CombatEntry } from "../../Types";

import { getCombatLog } from "../../functions/CombatFunctions";
import { SessionContext } from "../../contexts/SessionContext";

import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 10px;
`;

function CombatSection() {
  const [combatLog, setCombatLog] = useState<CombatEntry[]>([]);
  const { session } = useContext(SessionContext);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const data = await getCombatLog(session.id);
      setCombatLog(data);
    }, 1000); // Polls every second

    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
  }, [session.id]);

  return (
    <Container>
      {[...combatLog].reverse().map((item, index) => (
        <CombatEntryItem key={index} combatEntry={item} index={index} />
      ))}
    </Container>
  );
}

export default CombatSection;
