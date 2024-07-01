import { faGhost, faShield } from "@fortawesome/free-solid-svg-icons";
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
            className="header_button show_under_px"
            title="creatures"
            onClick={onCreaturesClick}
          >
            <FontAwesomeIcon icon={faGhost} />
          </div>
          <div className="header_divider show_under_px" />
          <div
            className="header_button show_under_px"
            title="equipment"
            onClick={onEquipmentClick}
          >
            <FontAwesomeIcon icon={faShield} />
          </div>
          <div className="header_divider show_under_px" />
        </>
      )}

      <div
        className="header_button show_under_px"
        title="inventory"
        onClick={onInventoryClick}
      >
        <Icon path={mdiSack} size={0.8} />
      </div>
      <div className="header_divider show_under_px" />
      <div
        className="header_button show_under_px"
        title="combat log"
        onClick={onCombatLogClick}
      >
        <Icon path={mdiSword} size={0.9} />
      </div>
    </>
  );
}

export default FooterCombatComponent;
