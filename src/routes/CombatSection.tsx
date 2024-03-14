import { RefObject, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import {
  CharacterEntry,
  CombatEntry,
  SessionEntry,
  ActiveStateType,
  AdvantageType,
} from "../Types";
import DiceSection from "../components_combatlog/DiceSection";
import CombatEntryItem from "../components_combatlog/CombatEntryItem";
import * as Constants from "../Constants";
import PartySection from "../components_combatlog/PartySection";
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

const SideColumn = styled.div`
  display: flex;
  flex: 0.5; /* Default flex value for resolutions below 1080p */
  flex-direction: column;
  background-color: ${Constants.BACKGROUND};
  height: 100%;
  gap: 25px;
  padding: 25px;
  box-sizing: border-box;

  /* Media query for 1080p resolution and above */
  @media (min-width: 1920px) {
    flex: 0.5; /* Keep flex as 0.5 for 1080p resolution */
  }

  /* Media query for 1440p resolution and above */
  @media (min-width: 2560px) {
    flex: 1; /* Change flex to 1 for 1440p resolution */
  }
`;

import {
  CriticalFailureSounds,
  CriticalSuccessSounds,
  RestingSounds,
  RollSounds,
} from "../Images";
// import { set } from "lodash";

interface CombatSectionProps {
  scrollRef: RefObject<HTMLDivElement>;
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  isConnected: boolean;
  isGm: boolean;
  gmMode: boolean;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
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
  setActiveState,
  setCharacterName,
  setIsCreature,
  setAdvantage,
  isCreature,
  isConnected,
  isGm,
  gmMode,
  setGmMode,
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
      <SideColumn>
        <PartySection
          session={session}
          websocket={websocket}
          setCharacterName={setCharacterName}
          setIsCreature={setIsCreature}
          isCreature={isCreature}
          isConnected={isConnected}
          isGm={isGm}
          gmMode={gmMode}
          setGmMode={setGmMode}
        />
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
      </SideColumn>
    </>
  );
}

export default CombatSection;
