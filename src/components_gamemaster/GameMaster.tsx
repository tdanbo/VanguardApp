import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import * as Constants from "../Constants";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  DisplayType,
  SessionEntry,
} from "../Types";
import ResetCreatureEncounter from "./ResetCreatureEncounter";
import CreatureEncounterSection from "./CreatureEncounterSection";
import TimeTrackBox from "../components_gamemaster/TimeTrackBox";
import TravelBox from "../components_gamemaster/TravelBox";

import { update_session } from "../functions/SessionsFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSkull } from "@fortawesome/free-solid-svg-icons";
import {
  UsedResources,
  calculateDurabilityPercentage,
} from "../functions/UtilityFunctions";
import Icon from "@mdi/react";
import { mdiShieldOff } from "@mdi/js";

interface GameMasterProps {
  session: SessionEntry;
  browserState: number;
  setBrowserState: (value: number) => void;
  websocket: Socket;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
  isCreature: boolean;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;

  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;
  isGm: boolean;

  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
}

function GameMaster({
  session,
  setIsGm,
  websocket,
  isCreature,
  setIsCreature,
  advantage,
  activeState,
  setActiveState,
  setAdvantage,
  setCharacterId,
  criticalState,
  setCriticalState,
  setDisplay,
}: GameMasterProps) {
  const [characterLog, setCharacterLog] = useState<CharacterEntry[]>([]);

  useEffect(() => {
    const combined_creatures = [...session.characters, ...session.encounter];
    combined_creatures.sort((a, b) => {
      if (a.details.initiative > b.details.initiative) {
        return -1;
      } else if (a.details.initiative < b.details.initiative) {
        return 1;
      } else {
        return 0;
      }
    });
    setCharacterLog(combined_creatures);
  }, [session]);

  const HandleAddDamageGain = () => {
    session.travel.damage_gain += 1;
    update_session(session, websocket);
  };

  const HandleAddCorruptionGain = () => {
    session.travel.corruption_gain += 1;
    update_session(session, websocket);
  };

  const HandleSubDamageGain = () => {
    if (session.travel.damage_gain === 0) {
      return;
    }
    session.travel.damage_gain -= 1;
    update_session(session, websocket);
  };

  const HandleSubCorruptionGain = () => {
    if (session.travel.corruption_gain === 0) {
      return;
    }
    session.travel.corruption_gain -= 1;
    update_session(session, websocket);
  };

  const usedResources = UsedResources(session);
  const durability_percentage = calculateDurabilityPercentage(usedResources);

  return (
    <div className="column">
      <div className="header">
        <div className="row">
          <ResetCreatureEncounter session={session} websocket={websocket} />
          <TravelBox session={session} websocket={websocket} />
          <div
            className="row empty_color"
            style={{ maxWidth: "210px", gap: "0px" }}
          >
            <div
              className="row button"
              onClick={() => HandleSubDamageGain()}
              onContextMenu={(e) => {
                e.preventDefault();
                HandleAddDamageGain();
              }}
            >
              <FontAwesomeIcon icon={faHeart} color={Constants.COLOR_1} />
              {session.travel.damage_gain}
            </div>
            <div
              className="row"
              style={{ maxWidth: "2px", background: Constants.BACKGROUND }}
            />
            <div
              className="row button"
              onClick={() => HandleSubCorruptionGain()}
              onContextMenu={(e) => {
                e.preventDefault();
                HandleAddCorruptionGain();
              }}
            >
              <FontAwesomeIcon icon={faSkull} color={Constants.COLOR_3} />
              {session.travel.corruption_gain}
            </div>
            <div
              className="row"
              style={{ maxWidth: "2px", background: Constants.BACKGROUND }}
            />
            <div
              className="row button"
              title={
                "The party have used " +
                usedResources +
                "% of their total resources."
              }
            >
              {usedResources}%
            </div>
          </div>
          <div
            className="row empty_color button"
            style={{ maxWidth: "70px" }}
            title={
              "Items have a " +
              durability_percentage +
              "% durability loss chance"
            }
          >
            <Icon
              path={mdiShieldOff}
              size={0.6}
              color={Constants.WIDGET_PRIMARY_FONT}
            />
            {durability_percentage}%
          </div>
          {/* <div
            className="row base_color button"
            style={{ maxWidth: "50px" }}
            onClick={() => DailyDurability(session)}
          >
            a
          </div> */}
        </div>
      </div>
      <div className="scroll_container" style={{ width: "100%" }}>
        <CreatureEncounterSection
          session={session}
          websocket={websocket}
          isCreature={isCreature}
          setIsCreature={setIsCreature}
          setIsGm={setIsGm}
          characterLog={characterLog}
          advantage={advantage}
          activeState={activeState}
          setActiveState={setActiveState}
          setAdvantage={setAdvantage}
          setCharacterId={setCharacterId}
          criticalState={criticalState}
          setCriticalState={setCriticalState}
          setDisplay={setDisplay}
        />
      </div>
      <div className="row" style={{ maxHeight: "30px" }}>
        <TimeTrackBox session={session} websocket={websocket} />
      </div>
    </div>
  );
}

export default GameMaster;
