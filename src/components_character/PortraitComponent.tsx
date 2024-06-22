import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";
import "../layout.css";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  SessionEntry,
} from "../Types";
import {
  GetBurnRate,
  GetMaxSlots,
  GetMovementSpeed,
  GetPainThreshold,
  GetUsedSlots,
} from "../functions/RulesFunctions";
import InfoComponent from "./InfoComponent";
import SmallStatComponent from "./SmallStatComponent";
import {
  faCarrot,
  faHeartCrack,
  faPersonRunning,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";
import ActiveStateComponent from "./ActiveStateComponent";

import EditCharacterComponent from "./EditCharacterComponent";
import { Socket } from "socket.io-client";
import SmallCorruptionComponent from "./SmallCorruptionComponent";

// background-image: url("/dist/assets/portrait1.jpeg");

interface HealthBoxProps {
  character: CharacterEntry;
  activeState: ActiveStateType;
  setActiveState: (state: ActiveStateType) => void;
  advantage: AdvantageType;
  setAdvantage: (state: AdvantageType) => void;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
  criticalState: boolean;
}

function PortraitComponent({
  character,
  activeState,
  setActiveState,
  advantage,
  setAdvantage,
  session,
  websocket,
  isCreature,
  setCharacterId,
  setCriticalState,
  criticalState,
}: HealthBoxProps) {
  const speed = GetMovementSpeed(character);
  const pain = GetPainThreshold(character);
  const capacity = GetUsedSlots(character);
  const burn = GetBurnRate(character);

  return (
    <div
      className="row"
      style={{
        backgroundImage: `url(${CharacterPortraits[character.portrait]})`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        borderRadius: Constants.BORDER_RADIUS,
        backgroundColor: Constants.WIDGET_BACKGROUND_EMPTY,
      }}
    >
      <div
        className="column"
        style={{ gap: "1px", width: "33%", padding: "2px" }}
      >
        <SmallStatComponent
          value={speed.toString()}
          title={"speed"}
          icon={faPersonRunning}
          bad_result={false}
        />
        <SmallStatComponent
          value={pain.toString()}
          title={"pain"}
          icon={faHeartCrack}
          bad_result={false}
        />

        <SmallStatComponent
          value={burn.toString()}
          title={"consumption"}
          icon={faCarrot}
          bad_result={false}
        />
        <SmallStatComponent
          value={
            capacity.toString() + " / " + GetMaxSlots(character).toString()
          }
          title={"capacity"}
          icon={faWeightHanging}
          bad_result={capacity >= GetMaxSlots(character)}
        />
        <SmallCorruptionComponent
          character={character}
          session={session}
          isCreature={isCreature}
          websocket={websocket}
        />
      </div>
      <div className="column" style={{ gap: "0px", width: "33%" }} />
      <div
        className="column"
        style={{
          gap: "0px",
          width: "33%",
          alignItems: "flex-end",
        }}
      >
        <InfoComponent character={character} />
        <EditCharacterComponent
          session={session}
          websocket={websocket}
          isCreature={isCreature}
          character={character}
          setCharacterId={setCharacterId}
        />
        <ActiveStateComponent
          activeState={activeState}
          setActiveState={setActiveState}
          advantage={advantage}
          setAdvantage={setAdvantage}
          criticalState={criticalState}
          setCriticalState={setCriticalState}
        />
      </div>
    </div>
  );
}

export default PortraitComponent;
