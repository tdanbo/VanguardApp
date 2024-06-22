import * as Constants from "../Constants";
import "../layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toTitleCase } from "../functions/UtilityFunctions";
import {
  IconDefinition,
  faCarrot,
  faHeartBroken,
  faPersonRunning,
  faSkull,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";

const backgroundcolor = "rgba(19, 23, 22, 0.8)";

type faHeartBroken = "faHeartBroken";
type faCarrot = "faCarrot";
type faPersonRunning = "faPersonRunning";
type faWeightHanging = "faWeightHanging";
type faSkull = "faSkull";

interface SmallStatComponentProps {
  title: string;
  value: string;
  icon: IconDefinition;
  bad_result?: boolean;
}

function SmallStatComponent({
  title,
  value,
  icon,
  bad_result,
}: SmallStatComponentProps) {
  let color = Constants.WIDGET_SECONDARY_FONT_INACTIVE;
  if (icon === faCarrot) {
    color = "rgba(205, 112, 57, 0.7)";
  } else if (icon === faHeartBroken) {
    color = Constants.BRIGHT_RED;
  } else if (icon === faPersonRunning) {
    color = Constants.GREEN;
  } else if (icon === faWeightHanging) {
    color = Constants.BRIGHT_YELLOW;
  } else if (icon === faSkull) {
    color = Constants.COLOR_3;
  } else {
    color = Constants.WIDGET_SECONDARY_FONT_INACTIVE;
  }

  return (
    <div
      className="column"
      style={{ backgroundColor: backgroundcolor, gap: "0px" }}
    >
      <div className="row">
        <div className="row" style={{ width: "20px", marginLeft: "8px" }} />
        <div
          className="row"
          style={{
            fontSize: "20px",
            alignItems: "flex-end",
            marginTop: "2px",
            filter: `drop-shadow(1px 1px 0px ${Constants.BACKGROUND})`,
            fontWeight: bad_result ? "700" : "400",
            color: bad_result
              ? Constants.BRIGHT_RED
              : Constants.WIDGET_PRIMARY_FONT,
          }}
        >
          {value}
        </div>
        <div
          className="row"
          style={{
            width: "20px",
            marginRight: "8px",
            filter: `drop-shadow(1px 1px 0px ${Constants.BACKGROUND})`,
          }}
        >
          <FontAwesomeIcon icon={icon} color={color} size="sm" />
        </div>
      </div>
      <div
        className="row"
        style={{
          height: "auto",
          marginBottom: "5px",
          fontSize: "12px",
          fontWeight: "bold",
          color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
        }}
      >
        {toTitleCase(title)}
      </div>
    </div>
  );
}

export default SmallStatComponent;
