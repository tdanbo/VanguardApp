import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";

import CombatEntryItem from "../CombatEntryItem";
import { CombatEntry } from "../../Types";

import { getCombatLog } from "../../functions/CombatFunctions";

import { useState, useEffect } from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 10px;
`;

function CombatSection() {
  const [combatLog, setCombatLog] = useState<CombatEntry[]>([]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const data = await getCombatLog();
      setCombatLog(data);
    }, 1000); // Polls every second

    return () => clearInterval(intervalId); // Clear the interval when the component is unmounted
  }, []);

  return (
    <Container>
      {[...combatLog].reverse().map((item, index) => (
        <CombatEntryItem key={index} combatEntry={item} index={index} />
      ))}
    </Container>
  );
}

export default CombatSection;
