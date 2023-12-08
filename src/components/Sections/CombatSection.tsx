import { CombatEntry, SessionEntry } from "../../Types";
import CombatEntryItem from "../CombatEntryItem";

import { RefObject, useEffect, useRef } from "react";
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

import {
  CriticalFailureSounds,
  CriticalSuccessSounds,
  RollSounds,
} from "../../Images";
// import { set } from "lodash";

interface CombatSectionProps {
  scrollRef: RefObject<HTMLElement>;
  session: SessionEntry;
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

function CombatSection({ scrollRef, session }: CombatSectionProps) {
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

  const playRandomSound = (SoundList: string[]) => {
    const randomIndex = Math.floor(Math.random() * SoundList.length);
    const randomSound = SoundList[randomIndex];

    if (audioRef.current) {
      audioRef.current.src = randomSound;
      audioRef.current.play().catch((error) => {
        console.error("Audio play failed:", error);
      });
    }
  };

  // Inside your component
  const prevCombatLogRef = useRef<CombatEntry[] | null>(null);

  useEffect(() => {
    // Compare the current combat log with the previous one
    if (prevCombatLogRef.current && !deepCompareCombatEntries(session.combatlog, prevCombatLogRef.current)) {
      const last_roll = session.combatlog.at(0);
      if (!last_roll) return;
      if (last_roll.source === "Skill Test" && last_roll.roll === 1) {
        playRandomSound(CriticalSuccessSounds);
      } else if (
        last_roll.source === "Skill Test" &&
        last_roll.roll === 20
      ) {
        playRandomSound(CriticalFailureSounds);
      } else {
        playRandomSound(RollSounds);
      }
    }

    // Update the ref with the current combat log
    prevCombatLogRef.current = session.combatlog;

  }, [session.combatlog]);

  useEffect(() => {
    scrollToBottom();
  }, [session]);

  return (
    <Container>
      {session.combatlog.reverse().map((item, index) => (
        <CombatEntryItem key={index} combatEntry={item} index={index} />
      ))}
    </Container>
  );
}

export default CombatSection;
