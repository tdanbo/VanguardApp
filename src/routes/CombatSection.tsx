import { faDiceD20, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { NewCharacterEntry } from "../Types";
import DetailStatComponent from "../components_cleanup/DetailStatComponent";
import DiceSection from "../components_combatlog/DiceSection";
import { update_session } from "../functions/SessionsFunctions";
import { toTitleCase } from "../functions/UtilityFunctions";

import * as Constants from "../Constants";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  CombatEntry,
  DisplayType,
  SessionEntry,
} from "../Types";
import CombatEntryItem from "../components_combatlog/CombatEntryItem";
import PartySection from "../components_combatlog/PartySection";

const Button = styled.button`
  display: flex;
  flex-grow: 1;
  flex: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 5px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  cursor: pointer;
  font-size: 14px;
  justify-content: center;
  align-items: center;
`;

import {
  CriticalFailureSounds,
  CriticalSuccessSounds,
  RestingSounds,
  RollSounds,
} from "../Images";
import DayChangeEntryItem from "../components_combatlog/DayChangeEntryItem";
import RestEntryItem from "../components_combatlog/RestEntryItem";
// import { set } from "lodash";

interface CombatSectionProps {
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
  isGm: boolean;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
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
  session,
  websocket,
  setCharacterId,
  setIsCreature,
  isCreature,
  isGm,
  setIsGm,
  setDisplay,
  setActiveState,
  setAdvantage,
  setCriticalState,
}: CombatSectionProps) {
  // const { combatlogResponse } = useWebSocket();
  const [diceTrayOpen, setDiceTrayOpen] = useState(false);

  const scrollRef = useRef(null);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // Compare the current combat log with the previous one\
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
      } else if (last_roll.roll_type === "day") {
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

  const handlePostCharacter = async () => {
    NewCharacterEntry.name = "Player Character";
    NewCharacterEntry.id = uuidv4();
    session.characters.push(NewCharacterEntry);
    await update_session(session, websocket, NewCharacterEntry, isCreature);
    setCharacterId(NewCharacterEntry.id);
  };

  return (
    <>
      <div className="header" style={{ gap: "10px" }}>
        {isGm ? (
          <Button onClick={handlePostCharacter}>
            <FontAwesomeIcon icon={faUserPlus} />
          </Button>
        ) : diceTrayOpen ? (
          <DiceSection
            character={NewCharacterEntry}
            session={session}
            websocket={websocket}
            isCreature={isCreature}
            setActiveState={setActiveState}
            setAdvantage={setAdvantage}
            setCriticalState={setCriticalState}
          />
        ) : (
          <>
            <div className="row outline_color">
              <DetailStatComponent
                title={"QUARTER"}
                value={toTitleCase(session.travel.time)}
              />
            </div>
            <div className="row outline_color">
              <DetailStatComponent
                title={"DAY"}
                value={toTitleCase(session.travel.day.toString())}
              />
            </div>
          </>
        )}

        <div
          className="row button bg--primary-4 border"
          style={{ maxWidth: "50px" }}
          onClick={() => setDiceTrayOpen(!diceTrayOpen)}
          title={"Dice Tray"}
        >
          <FontAwesomeIcon icon={faDiceD20} />
        </div>
      </div>
      <PartySection
        session={session}
        websocket={websocket}
        setCharacterId={setCharacterId}
        setIsCreature={setIsCreature}
        isCreature={isCreature}
        setIsGm={setIsGm}
        isGm={isGm}
        setDisplay={setDisplay}
      />
      <div className="column">
        <div className="scroll_container" ref={scrollRef}>
          {session.combatlog.map((item, index) => {
            if (item.roll_type === "eating" || item.roll_type === "sleeping") {
              return (
                <RestEntryItem
                  key={index}
                  combatEntry={item}
                  index={index}
                  session={session}
                />
              );
            } else if (item.roll_type === "day") {
              return (
                <DayChangeEntryItem
                  key={index}
                  combatEntry={item}
                  index={index}
                  session={session}
                />
              );
            }
            return (
              <CombatEntryItem
                key={index}
                combatEntry={item}
                index={index}
                session={session}
              />
            ); // Return null when none of the conditions are met
          })}
        </div>
      </div>

      {/* <DiceSection
          character={character}
          session={session}
          websocket={websocket}
          isCreature={isCreature}
          setActiveState={setActiveState}
          setAdvantage={setAdvantage}
          setCriticalState={setCriticalState}
        /> */}
    </>
  );
}

export default CombatSection;
