import { faArrowDown, faHandSparkles } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DisplayType } from "../Types";
import Icon from "@mdi/react";
import { mdiSack } from "@mdi/js";

import * as Constants from "../Constants";
interface FooterBrowserProps {
  isGm: boolean;
  setLeftDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
  display: DisplayType;
}

function FooterBrowserComponent({
  setLeftDisplay,
  isGm,
  display,
}: FooterBrowserProps) {
  const onInventoryClick = () => {
    setLeftDisplay("inventory");
  };

  const onAbilitiesClick = () => {
    setLeftDisplay("abilities");
  };

  const onDropsClick = () => {
    setLeftDisplay("drops");
  };

  return (
    <>
      {isGm && (
        <>
          <div
            className="header_button show_under_px"
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
        </>
      )}

      <div
        className="header_button show_under_px"
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
        className="header_button show_under_px"
        title="abilities"
        onClick={onAbilitiesClick}
        style={{
          color:
            display === "abilities"
              ? Constants.WIDGET_PRIMARY_FONT
              : Constants.WIDGET_SECONDARY_FONT_INACTIVE,
        }}
      >
        <FontAwesomeIcon icon={faHandSparkles} />
      </div>
    </>
  );
}

export default FooterBrowserComponent;
