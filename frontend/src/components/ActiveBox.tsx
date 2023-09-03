import * as Constants from "../Constants";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faBolt,
  faCrosshairs,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";

type Props = {
  active: string;
  type_name: string;
  type_value: number;
};

function ActiveBox({ active, type_name, type_value }: Props) {
  const [value, setValue] = useState(type_value);

  const icon = (active: string) => {
    if (active === "sneaking") {
      return <FontAwesomeIcon icon={faVolumeXmark} />;
    } else if (active === "casting") {
      return <FontAwesomeIcon icon={faBolt} />;
    } else if (active === "defense") {
      return <FontAwesomeIcon icon={faShieldHalved} />;
    } else if (active === "attack") {
      return <FontAwesomeIcon icon={faCrosshairs} />;
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div
        className="flex grow items-center justify-center  rounded-t"
        style={{
          color: Constants.RED,
          backgroundColor: Constants.PRIMARY_MEDIUM,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "2px 2px 1px 2px",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
        onClick={() => setValue(value + 1)}
      >
        {value}
      </div>
      <div
        className="flex grow items-center justify-center rounded-b "
        style={{
          backgroundColor: Constants.PRIMARY_LIGHTER,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "1px 2px 2px 2px",
          fontSize: "1.0rem",
          padding: "4px",
          color: Constants.DARK,
        }}
      >
        {icon(active)}
      </div>
    </div>
  );
}

export default ActiveBox;
