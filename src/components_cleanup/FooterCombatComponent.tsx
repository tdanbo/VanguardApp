import {
  faArrowDown,
  faGhost,
  faHandSparkles,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { EquipAbilityType, DisplayType } from "../Types";
import Icon from "@mdi/react";
import { mdiSack, mdiSword } from "@mdi/js";
import * as Constants from "../Constants";

interface FooterCharacterProps {
  setEquipmentAbilities: React.Dispatch<React.SetStateAction<EquipAbilityType>>;
  setRightDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
  isGm: boolean;
  rightDisplay: DisplayType;
}

function FooterCombatComponent({
  setRightDisplay,
  isGm,
  rightDisplay,
}: FooterCharacterProps) {
  const onCreaturesClick = () => {
    setRightDisplay("creatures");
  };

  const onEquipmentClick = () => {
    setRightDisplay("equipment");
  };

  const onAbilitiesClick = () => {
    setRightDisplay("abilities");
  };

  const onInventoryClick = () => {
    setRightDisplay("inventory");
  };

  const onCombatLogClick = () => {
    setRightDisplay("combatlog");
  };

  const onDropsClick = () => {
    setRightDisplay("drops");
  };

  return (
    <>
      {isGm && (
        <>
          <div
            className="header_button "
            title="creatures"
            onClick={onCreaturesClick}
            style={{
              borderRight: "1px solid #252827",
              color:
                rightDisplay === "creatures"
                  ? Constants.WIDGET_PRIMARY_FONT
                  : Constants.WIDGET_SECONDARY_FONT_INACTIVE,
            }}
          >
            <FontAwesomeIcon icon={faGhost} />
          </div>
          <div
            className="header_button "
            title="equipment"
            style={{
              borderRight: "1px solid #252827",
              color:
                rightDisplay === "equipment"
                  ? Constants.WIDGET_PRIMARY_FONT
                  : Constants.WIDGET_SECONDARY_FONT_INACTIVE,
            }}
            onClick={onEquipmentClick}
          >
            <FontAwesomeIcon icon={faShield} />
          </div>
          <div
            className="header_button hide_over_breakpoint4"
            title="drops"
            style={{
              borderRight: "1px solid #252827",
              color:
                rightDisplay === "drops"
                  ? Constants.WIDGET_PRIMARY_FONT
                  : Constants.WIDGET_SECONDARY_FONT_INACTIVE,
            }}
            onClick={onDropsClick}
          >
            <FontAwesomeIcon icon={faArrowDown} size="lg" />
          </div>
        </>
      )}

      <div
        className="header_button hide_over_breakpoint4"
        title="inventory"
        onClick={onInventoryClick}
        style={{
          borderRight: "1px solid #252827",
          color:
            rightDisplay === "inventory"
              ? Constants.WIDGET_PRIMARY_FONT
              : Constants.WIDGET_SECONDARY_FONT_INACTIVE,
        }}
      >
        <Icon path={mdiSack} size={0.8} />
      </div>
      <div
        className="header_button hide_over_breakpoint4"
        title="abilities"
        onClick={onAbilitiesClick}
        style={{
          borderRight: "1px solid #252827",
          color:
            rightDisplay === "abilities"
              ? Constants.WIDGET_PRIMARY_FONT
              : Constants.WIDGET_SECONDARY_FONT_INACTIVE,
        }}
      >
        <FontAwesomeIcon icon={faHandSparkles} />
      </div>
      <div
        className="header_button"
        title="combat log"
        onClick={onCombatLogClick}
        style={{
          color:
            rightDisplay === "combatlog"
              ? Constants.WIDGET_PRIMARY_FONT
              : Constants.WIDGET_SECONDARY_FONT_INACTIVE,
        }}
      >
        <Icon path={mdiSword} size={0.9} />
      </div>
    </>
  );
}

export default FooterCombatComponent;
