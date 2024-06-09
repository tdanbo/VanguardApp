import {
  IconDefinition,
  faMinus,
  faPlus,
  faAnglesUp,
  faAnglesDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetStateAction, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import "../App.css";
import * as Constants from "../Constants";
import "../Styles.css";
import { RollDice } from "../functions/UtilityFunctions";
import {
  ActiveStateType,
  AdvantageType,
  CharacterEntry,
  RollTypeEntry,
  SessionEntry,
} from "../Types";
import { toTitleCase } from "../functions/UtilityFunctions";
import { GetGameData } from "../contexts/GameContent";
import { FindValueFromActive } from "../functions/CharacterFunctions";
import { mdiArrowCollapse, mdiArrowExpand } from "@mdi/js";
import { Icon } from "@mdi/react";

interface Props {
  stat_name: RollTypeEntry;
  stat_value: number;
  active?: boolean;
  stat_icon: IconDefinition | null;
  stat_color: string;
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setAdvantage: React.Dispatch<SetStateAction<AdvantageType>>;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
  modifierLock: boolean;
}

function StatComponent2({
  stat_name,
  stat_value,
  stat_icon,
  stat_color,
  session,
  character,
  websocket,
  isCreature,
  advantage,
  activeState,
  setActiveState,
  setAdvantage,
  setCriticalState,
  modifierLock,
}: Props) {
  const { equipment } = GetGameData();
  const [modValue, setModvalue] = useState<number>(0);

  const handleAddValue = () => {
    const newValue = modValue + 1;
    setModvalue(newValue);
  };

  const handleSubValue = () => {
    const newValue = modValue - 1;
    setModvalue(newValue);
  };

  useEffect(() => {
    if (!modifierLock) {
      setModvalue(0);
    }
  }, [modifierLock]);

  let flanked = 0;
  if (
    advantage === "flanking" &&
    stat_name === FindValueFromActive("attack", character).stat
  ) {
    flanked += 2;
  } else if (
    advantage === "flanked" &&
    stat_name === FindValueFromActive("defense", character).stat
  ) {
    flanked -= 2;
  } else {
    flanked = 0;
  }
  let color = Constants.WIDGET_SECONDARY_FONT;
  if (["attack", "defense", "casting", "sneaking"].includes(stat_name)) {
    color = Constants.TYPE_COLORS[stat_name];
  }

  const ModifierConverter: Record<number, number> = {
    30: -20,
    29: -19,
    28: -18,
    27: -17,
    26: -16,
    25: -15,
    24: -14,
    23: -13,
    22: -12,
    21: -11,
    20: -10,
    19: -9,
    18: -8,
    17: -7,
    16: -6,
    15: -5,
    14: -4,
    13: -3,
    12: -2,
    11: -1,
    10: 0,
    9: 1,
    8: 2,
    7: 3,
    6: 4,
    5: 5,
    4: 6,
    3: 7,
    2: 8,
    1: 9,
  };

  const valueTitle: string =
    ModifierConverter[Math.max(stat_value + modValue + flanked, 1)].toString();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="row base_color" style={{ padding: "2px", gap: "0px" }}>
      <div
        className="row base_color"
        style={{
          maxWidth: "35px",
          minWidth: "35px",
          fontSize: "20px",
        }}
      >
        {modValue === 0 && stat_icon ? (
          <FontAwesomeIcon
            icon={stat_icon}
            color={stat_color}
            style={{ fontSize: "20px" }}
          />
        ) : modValue === 0 ? (
          <div></div>
        ) : (
          <div>
            {modValue > 0 ? "+" : ""}
            {modValue}
          </div>
        )}
      </div>
      <div
        className="row"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ gap: "0px" }}
      >
        <div
          className="row"
          style={{
            maxWidth: "30px",
            minWidth: "30px",
            fontSize: "20px",
            visibility: isHovered ? "visible" : "hidden",
          }}
          onClick={handleSubValue}
        >
          <FontAwesomeIcon
            icon={faMinus}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
            style={{ fontSize: "12px" }}
          />
        </div>
        <div
          className="column"
          style={{
            fontSize: "14px",
            gap: "5px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {toTitleCase(stat_name)}
          <div className="row" style={{ gap: "3px", maxHeight: "0px" }}>
            {advantage === "flanking" &&
            stat_name === FindValueFromActive("attack", character).stat ? (
              <Icon
                path={mdiArrowCollapse}
                size={0.7}
                style={{ marginTop: "10px" }}
              />
            ) : advantage === "flanked" &&
              stat_name === FindValueFromActive("defense", character).stat ? (
              <Icon
                path={mdiArrowExpand}
                size={0.7}
                style={{ marginTop: "10px" }}
              />
            ) : null}
            {activeState === "full" ? (
              <FontAwesomeIcon
                icon={faAnglesUp}
                color={Constants.WIDGET_PRIMARY_FONT}
                style={{ fontSize: "15px", marginTop: "10px" }}
              />
            ) : activeState === "weak" ? (
              <FontAwesomeIcon
                icon={faAnglesDown}
                color={Constants.WIDGET_PRIMARY_FONT}
                style={{ fontSize: "15px", marginTop: "10px" }}
              />
            ) : null}
          </div>
        </div>
        <div
          className="row"
          style={{
            maxWidth: "30px",
            minWidth: "30px",
            fontSize: "20px",
            visibility: isHovered ? "visible" : "hidden",
          }}
          onClick={handleAddValue}
        >
          <FontAwesomeIcon
            icon={faPlus}
            color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
            style={{ fontSize: "12px" }}
          />
        </div>
      </div>
      <div
        className="row button button_color"
        style={{ maxWidth: "30px", minWidth: "30px", fontSize: "20px" }}
        title={isCreature ? valueTitle : ""}
        onClick={() =>
          RollDice({
            session: session,
            character: character,
            websocket: websocket,
            roll_type: stat_name,
            roll_source: "Skill Test",
            isCreature: isCreature,
            dice: 20,
            dice_mod: modValue,
            color: color,
            target: Math.max(stat_value + modValue + flanked, 1),
            setModValue: setModvalue,
            advantage: advantage,
            activeState: activeState,
            setActiveState: setActiveState,
            setAdvantage: setAdvantage,
            setCriticalState: setCriticalState,
            equipment,
            modifierLock,
          })
        }
      >
        {Math.max(stat_value + modValue + flanked, 1)}
      </div>
    </div>
    // <Container>
    //   <Row height={"100%"} className="first-row">
    //     <DiceContainerLeft>
    //       {stat_icon !== faNotEqual && (
    //         <FontAwesomeIcon icon={stat_icon} color={stat_color} />
    //       )}
    //     </DiceContainerLeft>

    //     <Value className="dice-icon-hover" title={isCreature ? valueTitle : ""}>
    //       {Math.max(stat_value + modValue + flanked, 1)}
    //     </Value>
    //     <DiceContainerRight>
    //       </DiceContainer>
    //     </DiceContainerRight>
    //   </Row>
    //   <ActiveValue className="value-row" $active={active}>
    //     {(() => {
    //       if (advantage === "flanking" && stat_name === "attack") {
    //         return toTitleCase(`${advantage} ${stat_name}`);
    //       } else if (advantage === "flanked" && stat_name === "defense") {
    //         return toTitleCase(`${advantage} ${stat_name}`);
    //       } else {
    //         return toTitleCase(stat_name);
    //       }
    //     })()}
    //   </ActiveValue>
    //   <BottomRow height={"25%"} className="second-row" $active={active}>
    //     <Minus className="button-hover" onClick={handleSubValue}>
    //       <FontAwesomeIcon
    //         icon={faMinus}
    //         color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
    //       />
    //     </Minus>
    //     <Modifier className="mouse-icon-hover">
    //       {modValue > 0 ? "+" : ""}
    //       {modValue}
    //     </Modifier>
    //     <Plus className="button-hover" onClick={handleAddValue}>
    //       <FontAwesomeIcon
    //         icon={faPlus}
    //         color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
    //       />
    //     </Plus>
    //   </BottomRow>
    // </Container>
  );
}

export default StatComponent2;
