import * as Constants from "../Constants";
import { CharacterImages } from "../Images";
import "../Styles.css";
import { CharacterEntry, SessionEntry } from "../Types";
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

import EditCharacterComponent from "./EditCharacterComponent";
import { Socket } from "socket.io-client";
import SmallCorruptionComponent from "./SmallCorruptionComponent";

// background-image: url("/dist/assets/portrait1.jpeg");

interface HealthBoxProps {
  character: CharacterEntry;

  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
}

function PortraitComponent({
  character,
  session,
  websocket,
  isCreature,
  setCharacterId,
}: HealthBoxProps) {
  const speed = GetMovementSpeed(character);
  const pain = GetPainThreshold(character);
  const capacity = GetUsedSlots(character);
  const burn = GetBurnRate(character);
  return (
    <div
      className="row"
      style={{
        backgroundImage: `url(${CharacterImages(character.portrait)})`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        borderRadius: Constants.BORDER_RADIUS,
        backgroundColor: Constants.WIDGET_BACKGROUND_EMPTY,
      }}
    >
      <div className="column" style={{ gap: "1px", padding: "2px" }}>
        <SmallStatComponent
          value={speed.toString()}
          title={"speed"}
          icon={faPersonRunning}
          bad_result={false}
        />
        <SmallStatComponent
          value={pain.toString()}
          title={"pain threshold"}
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
          bad_result={capacity > GetMaxSlots(character)}
        />
        <SmallCorruptionComponent
          character={character}
          session={session}
          isCreature={isCreature}
          websocket={websocket}
        />
      </div>
      <div className="column" style={{ gap: "0px" }} />
      <div
        className="column"
        style={{
          gap: "0px",

          alignItems: "flex-end",
          justifyContent: "flex-start",
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
      </div>
    </div>
  );
}

export default PortraitComponent;
