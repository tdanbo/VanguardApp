import {
  faGhost,
  faHandSparkles,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DisplayType } from "../Types";
import Icon from "@mdi/react";
import { mdiSack } from "@mdi/js";

interface FooterBrowserProps {
  isGm: boolean;
  setLeftDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
}

function FooterBrowserComponent({ setLeftDisplay, isGm }: FooterBrowserProps) {
  const onCreaturesClick = () => {
    setLeftDisplay("creatures");
  };

  const onEquipmentClick = () => {
    setLeftDisplay("equipment");
  };

  const onInventoryClick = () => {
    setLeftDisplay("inventory");
  };

  const onAbilitiesClick = () => {
    setLeftDisplay("abilities");
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
        title="abilities"
        onClick={onAbilitiesClick}
      >
        <FontAwesomeIcon icon={faHandSparkles} />
      </div>
    </>
  );
}

export default FooterBrowserComponent;
