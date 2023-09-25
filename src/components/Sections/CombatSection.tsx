import CombatEntryItem from "../CombatEntryItem";
import { CombatEntry } from "../../Types";

import { getCombatLog } from "../../functions/CombatFunctions";
import { SessionContext } from "../../contexts/SessionContext";
import { useWebSocket } from "../../contexts/WebSocketContext";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 10px;
`;

function CombatSection() {
  const [combatLog, setCombatLog] = useState<CombatEntry[]>([]);
  const { session } = useContext(SessionContext);
  const { combatlogResponse } = useWebSocket();

  useEffect(() => {
    console.log("Combat Section: ", combatlogResponse);
    if (combatlogResponse) {
      setCombatLog(combatlogResponse);
    }
  }, [combatlogResponse]);

  useEffect(() => {
    if (session.id === "") return;
    getCombatLog(session.id).then((response) => {
      setCombatLog(response);
    });
  }, [session]);

  return (
    <Container>
      {[...combatLog].reverse().map((item, index) => (
        <CombatEntryItem key={index} combatEntry={item} index={index} />
      ))}
    </Container>
  );
}

export default CombatSection;
