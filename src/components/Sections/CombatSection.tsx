import CombatEntryItem from "../CombatEntryItem";
import { CombatEntry } from "../../Types";

import { getCombatLog } from "../../functions/CombatFunctions";
import { SessionContext } from "../../contexts/SessionContext";
import { useWebSocket } from "../../contexts/WebSocketContext";
import { useState, useEffect, useContext, RefObject } from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;

  flex-grow: 1;

  flex-direction: column-reverse;
  align-items: flex-end;
  justify-content: flex-end;

  gap: 10px;
  width: 100%;
`;

import { useRef } from "react";
import { RollSounds } from "../../Images";

interface CombatSectionProps {
  scrollRef: RefObject<HTMLElement>;
}

function CombatSection({ scrollRef }: CombatSectionProps) {
  const [combatLog, setCombatLog] = useState<CombatEntry[]>([]);
  const { session } = useContext(SessionContext);
  const { combatlogResponse } = useWebSocket();

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

  useEffect(() => {
    playRandomSound();
    if (combatlogResponse) {
      setCombatLog(combatlogResponse);
    }
  }, [combatlogResponse]);

  useEffect(() => {
    if (session.id === "") return;
    getCombatLog(session.id).then((response) => {
      console.log("Getting Combat Log");
      setCombatLog(response);
    });
  }, [session]);

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
