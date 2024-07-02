import {
  faArrowDown,
  faGhost,
  faHandSparkles,
  faHatWizard,
  faShield,
  faUser,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { EquipAbilityType, DisplayType } from "../Types";
import Icon from "@mdi/react";
import { mdiSack, mdiSword } from "@mdi/js";
import * as Constants from "../Constants";
interface FooterCharacterProps {
  setEquipmentAbilities: React.Dispatch<React.SetStateAction<EquipAbilityType>>;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
  isGm: boolean;
  display: DisplayType;
}

function FooterCharacterComponent({
  setEquipmentAbilities,
  display,
  setDisplay,
  isGm,
}: FooterCharacterProps) {
  const onEquipmentClick = () => {
    setEquipmentAbilities("equipment");
  };

  const onAbilitiesClick = () => {
    setEquipmentAbilities("abilities");
  };

  const onAbilitiesClick2 = () => {
    setDisplay("abilities");
  };

  const onInventoryClick = () => {
    setDisplay("inventory");
  };

  const onCombatLogClick = () => {
    setDisplay("combatlog");
  };

  const onCharacterClick = () => {
    setDisplay("character");
  };

  const onGameMasterClick = () => {
    setDisplay("gamemaster");
  };

  const onCreaturesClick = () => {
    setDisplay("creatures");
  };

  const onDropsClick = () => {
    setDisplay("drops");
  };

  return (
    <>
      {display === "character" ? (
        <>
          <div
            className="header_button breakpoint show_under_breakpoint2"
            title="equipment"
            onClick={onEquipmentClick}
            style={{
              borderRight: "1px solid #252827",
              color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
            }}
          >
            <FontAwesomeIcon icon={faShield} />
          </div>
          <div
            className="header_button breakpoint show_under_breakpoint2"
            title="My Abilities"
            onClick={onAbilitiesClick}
            style={{
              borderRight: "1px solid #252827",
              color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
            }}
          >
            <FontAwesomeIcon icon={faWandMagicSparkles} />
          </div>
        </>
      ) : null}
      <div
        className="header_button hide_over_breakpoint3"
        title="inventory"
        onClick={onInventoryClick}
        style={{
          borderRight: "1px solid #252827",
          color:
            display === "inventory"
              ? Constants.WIDGET_PRIMARY_FONT
              : Constants.WIDGET_SECONDARY_FONT_INACTIVE,
        }}
      >
        <Icon path={mdiSack} size={0.8} />
      </div>
      <div
        className="header_button hide_over_breakpoint3"
        title="abilities"
        onClick={onAbilitiesClick2}
        style={{
          borderRight: "1px solid #252827",
          color:
            display === "abilities"
              ? Constants.WIDGET_PRIMARY_FONT
              : Constants.WIDGET_SECONDARY_FONT_INACTIVE,
        }}
      >
        <FontAwesomeIcon icon={faHandSparkles} />
      </div>
      <div
        className="header_button  hide_over_breakpoint3"
        title="combatlog"
        onClick={onCombatLogClick}
        style={{
          borderRight: "1px solid #252827",
          color:
            display === "combatlog"
              ? Constants.WIDGET_PRIMARY_FONT
              : Constants.WIDGET_SECONDARY_FONT_INACTIVE,
        }}
      >
        <Icon path={mdiSword} size={0.9} />
        {/* <TinyCombatLogComponent session={session} /> */}
      </div>
      {isGm ? (
        <>
          <div
            className="header_button hide_over_breakpoint3"
            title="creatures"
            onClick={onCreaturesClick}
            style={{
              borderRight: "1px solid #252827",
              color:
                display === "creatures"
                  ? Constants.WIDGET_PRIMARY_FONT
                  : Constants.WIDGET_SECONDARY_FONT_INACTIVE,
            }}
          >
            <FontAwesomeIcon icon={faGhost} />
          </div>
          <div
            className="header_button hide_over_breakpoint3"
            title="drops"
            onClick={onDropsClick}
            style={{
              borderRight: "1px solid #252827",
              color:
                display === "drops"
                  ? Constants.WIDGET_PRIMARY_FONT
                  : Constants.WIDGET_SECONDARY_FONT_INACTIVE,
            }}
          >
            <FontAwesomeIcon icon={faArrowDown} size="lg" />
          </div>
          <div
            className="header_button show_under_px"
            title="gamemaster"
            onClick={onGameMasterClick}
            style={{
              borderRight: "1px solid #252827",
              color:
                display === "gamemaster"
                  ? Constants.WIDGET_PRIMARY_FONT
                  : Constants.WIDGET_SECONDARY_FONT_INACTIVE,
            }}
          >
            <FontAwesomeIcon icon={faHatWizard} />
          </div>
        </>
      ) : null}
      <div
        className="header_button show_under_px"
        title="character"
        onClick={onCharacterClick}
        style={{
          color:
            display === "character"
              ? Constants.WIDGET_PRIMARY_FONT
              : Constants.WIDGET_SECONDARY_FONT_INACTIVE,
        }}
      >
        <FontAwesomeIcon icon={faUser} />
      </div>
    </>
  );
}

export default FooterCharacterComponent;
