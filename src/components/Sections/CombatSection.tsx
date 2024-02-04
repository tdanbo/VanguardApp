import { RefObject, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import {
  CharacterEntry,
  CombatEntry,
  SessionEntry,
  ActiveStateType,
  AdvantageType,
} from "../../Types";
import DiceSection from "../../components/Sections/DiceSection";
import CombatEntryItem from "../CombatEntryItem";
import * as Constants from "../../Constants";
type DivProps = {
  width: string;
};

const DynamicContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${Constants.WIDGET_GAB};
  height: 0px; /* or another fixed value */
`;

interface ContainerProps {
  height: string;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${Constants.WIDGET_GAB};
  height: ${(props) => props.height};
  max-height: ${(props) => props.height};
`;

const Row = styled.div<DivProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
`;

const Column = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
  justify-content: flex-start;
  overflow: scroll;
  scrollbar-width: none !important;
`;

import {
  CriticalFailureSounds,
  CriticalSuccessSounds,
  RestingSounds,
  RollSounds,
} from "../../Images";
// import { set } from "lodash";

interface CombatSectionProps {
  scrollRef: RefObject<HTMLDivElement>;
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
}

function deepCompareCombatEntries(
  array1: CombatEntry[],
  array2: CombatEntry[],
) {
  if (array2.length === 0) return true;
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

function CombatSection({
  scrollRef,
  session,
  character,
  websocket,
  isCreature,
  setActiveState,
  setAdvantage,
}: CombatSectionProps) {
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
    if (
      prevCombatLogRef.current &&
      !deepCompareCombatEntries(session.combatlog, prevCombatLogRef.current)
    ) {
      const last_roll = session.combatlog.at(-1);
      if (!last_roll) return;

      if (
        last_roll.roll_source === "Skill Test" &&
        last_roll.roll_entry.critical.state === 2
      ) {
        playRandomSound(CriticalSuccessSounds);
      } else if (
        last_roll.roll_source === "Skill Test" &&
        last_roll.roll_entry.critical.state === 0
      ) {
        playRandomSound(CriticalFailureSounds);
      } else if (last_roll.roll_type === "resting") {
        playRandomSound(RestingSounds);
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
    <>
      <DynamicContainer>
        <Column ref={scrollRef} width={"100%"}>
          {session.combatlog.map((item, index) => (
            <CombatEntryItem
              key={index}
              combatEntry={item}
              index={index}
              session={session}
            />
          ))}
        </Column>
      </DynamicContainer>
      <Container height={"30px"}>
        <Row width={"100%"}>
          <DiceSection
            character={character}
            session={session}
            websocket={websocket}
            isCreature={isCreature}
            setActiveState={setActiveState}
            setAdvantage={setAdvantage}
          />
        </Row>
      </Container>
    </>
  );
}

export default CombatSection;
