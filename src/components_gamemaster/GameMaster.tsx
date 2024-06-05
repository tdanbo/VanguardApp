import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import * as Constants from "../Constants";
import {
  ActiveStateType,
  AdvantageType,
  ChallengeEntry,
  CharacterEntry,
  SessionEntry,
} from "../Types";
import ResetCreatureEncounter from "./ResetCreatureEncounter";
import CreatureEncounterSection from "./CreatureEncounterSection";
import TimeTrackBox from "../components_gamemaster/TimeTrackBox";
import TravelBox from "../components_gamemaster/TravelBox";
import "../layout.css";
import { update_session } from "../functions/SessionsFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSkull } from "@fortawesome/free-solid-svg-icons";
import { ChallengeRating } from "../functions/UtilityFunctions";

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

interface DivProps {
  width: string;
}

const Row = styled.div<DivProps>`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
`;

const DynamicContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${Constants.WIDGET_GAB};
  height: 0px; /* or another fixed value */
`;

const ScrollColumn = styled.div<DivProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  gap: ${Constants.WIDGET_GAB};
  max-width: ${(props) => props.width};
  overflow-y: scroll;
`;

interface GameMasterProps {
  session: SessionEntry;
  browserState: number;
  setBrowserState: (value: number) => void;
  websocket: Socket;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
  isCreature: boolean;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;
  isGm: boolean;
  criticalState: boolean;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "2",
        backgroundColor: Constants.BACKGROUND,
        height: "100%",
        gap: "25px",
        boxSizing: "border-box",
        padding: "25px 50px 25px 50px",
      }}
    >
      <Container height={"40px"}>
        <Row width={"100%"}>
          <ResetCreatureEncounter session={session} websocket={websocket} />
          <TravelBox session={session} websocket={websocket} />
          <div
            className="row empty_color button"
            style={{ maxWidth: "60px" }}
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
            className="row empty_color button"
            style={{ maxWidth: "60px" }}
            onClick={() => HandleSubCorruptionGain()}
            onContextMenu={(e) => {
              e.preventDefault();
              HandleAddCorruptionGain();
            }}
          >
            <FontAwesomeIcon icon={faSkull} color={Constants.COLOR_3} />
            {session.travel.corruption_gain}
          </div>
          {/* <div
            className="row base_color button"
            style={{ maxWidth: "50px" }}
            onClick={() => DailyDurability(session)}
          >
            a
          </div> */}
        </Row>
      </Container>
      <DynamicContainer key="container">
        <ScrollColumn width="100%">
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
          />
        </ScrollColumn>
      </DynamicContainer>
      <Container height={"30px"}>
        <TimeTrackBox session={session} websocket={websocket} />
      </Container>
    </div>
  );
}

export default GameMaster;
