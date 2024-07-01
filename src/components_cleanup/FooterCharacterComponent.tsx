import {
  faHandSparkles,
  faHatWizard,
  faShield,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { EquipAbilityType, DisplayType } from "../Types";
import Icon from "@mdi/react";
import { mdiSack, mdiSword } from "@mdi/js";

interface FooterCharacterProps {
  setEquipmentAbilities: React.Dispatch<React.SetStateAction<EquipAbilityType>>;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
  isGm: boolean;
}

function FooterCharacterComponent({
  setEquipmentAbilities,
  setDisplay,
  isGm,
}: FooterCharacterProps) {
  const onEquipmentClick = () => {
    setEquipmentAbilities("equipment");
  };

  const onAbilitiesClick = () => {
    setEquipmentAbilities("abilities");
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

  return (
    <>
      <div
        className="header_button breakpoint show_under_breakpoint2"
        title="equipment"
        onClick={onEquipmentClick}
      >
        <FontAwesomeIcon icon={faShield} />
      </div>
      <div className="header_divider breakpoint show_under_breakpoint2" />
      <div
        className="header_button breakpoint show_under_breakpoint2"
        title="abilities"
        onClick={onAbilitiesClick}
      >
        <FontAwesomeIcon icon={faHandSparkles} />
      </div>
      {isGm ? (
        <div
          className="header_button show_under_px"
          title="game master"
          onClick={onGameMasterClick}
        >
          <FontAwesomeIcon icon={faHatWizard} />
        </div>
      ) : null}
      <div className="header_divider show_under_px" />
      <div
        className="header_button show_under_px"
        title="character sheet"
        onClick={onCharacterClick}
      >
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className="header_divider show_under_px" />
      <div
        className="header_button hide_over_breakpoint3"
        title="inventory"
        onClick={onInventoryClick}
      >
        <Icon path={mdiSack} size={0.8} />
      </div>
      <div className="header_divider show_under_px" />
      <div
        className="header_button  hide_over_breakpoint3"
        title="combat log"
        onClick={onCombatLogClick}
      >
        <Icon path={mdiSword} size={0.9} />
      </div>
    </>
  );
}

export default FooterCharacterComponent;
