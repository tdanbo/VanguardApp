import CombatEntryItem from "../CombatEntryItem";
import { CombatEntry } from "../../Types";

import { getCombatLog } from "../../functions/CombatFunctions";
import { SessionContext } from "../../contexts/SessionContext";
import { useState, useEffect, useContext, RefObject } from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;

  flex-grow: 1;

  flex-direction: column-reverse;
  align-items: flex-end;
  justify-content: flex-start;

  gap: 10px;
  width: 100%;
`;

import { useRef } from "react";
import { RollSounds } from "../../Images";
// import { set } from "lodash";

interface CombatSectionProps {
  scrollRef: RefObject<HTMLElement>;
}

function deepCompareCombatEntries(
  array1: CombatEntry[],
  array2: CombatEntry[],
) {
  if (array1 === array2) return true;
  if (array1 == null || array2 == null) return false;
  if (array1.length !== array2.length) return false;

  for (let i = 0; i < array1.length; i++) {
    const obj1 = array1[i];
    const obj2 = array2[i];

    // Assuming you know the properties of CombatEntry,
    // compare them here. For example:
    if (obj1.uuid !== obj2.uuid) {
      return false;
    }
  }

  return true;
}

function CombatSection({ scrollRef }: CombatSectionProps) {
  const [combatLog, setCombatLog] = useState<CombatEntry[]>([]);
  const { session } = useContext(SessionContext);
  // const { combatlogResponse } = useWebSocket();

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const scrollableElement = scrollRef.current as unknown as HTMLElement;
      scrollableElement.scrollTop = scrollableElement.scrollHeight;
    }
  };

  const audioRef = useRef(new Audio()); // <-- Initialize a ref for the audio element

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const playRandomSound = () => {
    const randomIndex = Math.floor(Math.random() * RollSounds.length);
    const randomSound = RollSounds[randomIndex];

    if (audioRef.current) {
      audioRef.current.src = randomSound;
      audioRef.current.play().catch((error) => {
        console.error("Audio play failed:", error);
      });
    }
  };

  // useEffect(() => {
  //   playRandomSound();
  //   console.log("Combat Log Response: ", combatlogResponse);
  //   if (combatlogResponse) {
  //     setCombatLog(combatlogResponse);
  //   }
  // }, [combatlogResponse]);

  // useEffect(() => {
  //   if (session.id === "") return;
  //   getCombatLog(session.id).then((response) => {
  //     console.log("Getting Combat Log");
  //     setCombatLog(response);
  //   });
  // }, [session]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (session.id === "") return;
      getCombatLog(session.id).then((response) => {
        if (!deepCompareCombatEntries(response, combatLog)) {
          setCombatLog(response);
          playRandomSound();
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, [session, combatLog]); // Add combatLog to dependencies

  useEffect(() => {
    scrollToBottom();
  }, [combatLog]);

  return (
    <Container>
      {[...combatLog].reverse().map((item, index) => (
        <CombatEntryItem key={index} combatEntry={item} index={index} />
      ))}
    </Container>
  );
}

export default CombatSection;
