import {
  faGhost,
  faHandSparkles,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { EquipAbilityType, DisplayType } from "../Types";
import Icon from "@mdi/react";
import { mdiSack, mdiSword } from "@mdi/js";

interface FooterCharacterProps {
  setEquipmentAbilities: React.Dispatch<React.SetStateAction<EquipAbilityType>>;
  setRightDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
  isGm: boolean;
}

function FooterCombatComponent({
  setRightDisplay,
  isGm,
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

  return (
    <>
      {isGm && (
        <>
          <div
            className="header_button hide_over_breakpoint4"
            title="creatures"
            onClick={onCreaturesClick}
            style={{ borderRight: "1px solid #252827" }}
          >
            <FontAwesomeIcon icon={faGhost} />
          </div>
          <div
            className="header_button hide_over_breakpoint4"
            title="equipment"
            style={{ borderRight: "1px solid #252827" }}
            onClick={onEquipmentClick}
          >
            <FontAwesomeIcon icon={faShield} />
          </div>
        </>
      )}

      <div
        className="header_button hide_over_breakpoint4"
        title="inventory"
        onClick={onInventoryClick}
        style={{ borderRight: "1px solid #252827" }}
      >
        <Icon path={mdiSack} size={0.8} />
      </div>
      <div
        className="header_button hide_over_breakpoint4"
        title="inventory"
        onClick={onAbilitiesClick}
        style={{ borderRight: "1px solid #252827" }}
      >
        <FontAwesomeIcon icon={faHandSparkles} />
      </div>
      <div
        className="header_button"
        title="combat log"
        onClick={onCombatLogClick}
      >
        <Icon path={mdiSword} size={0.9} />
      </div>
    </>
  );
}

export default FooterCombatComponent;
