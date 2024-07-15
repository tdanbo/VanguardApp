import { faFeather } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdiRomanNumeral1, mdiRomanNumeral2 } from "@mdi/js";
import Icon from "@mdi/react";
import { Socket } from "socket.io-client";
import { update_session } from "../functions/SessionsFunctions";
import { IsWeapon } from "../functions/UtilityFunctions";
import {
  CharacterEntry,
  ItemEntry,
  ItemStateType,
  SessionEntry,
} from "../Types";

interface EquipComponentProps {
  item: ItemEntry;
  session: SessionEntry;
  websocket: Socket;
  character: CharacterEntry;
  isCreature: boolean;
  isGm: boolean;
  state: ItemStateType;
}

function EquipComponent({
  item,
  session,
  websocket,
  character,
  isCreature,
  state,
}: EquipComponentProps) {
  const equipHandler = (item: ItemEntry) => {
    if (state !== "take") {
      item.equipped = !item.equipped;
      update_session(session, websocket, character, isCreature);
    }
  };

  const HandleLightSetting = () => {
    item.light = !item.light;
    update_session(session, websocket, character, isCreature);
  };

  const categoryBackgroundColor = IsWeapon(item)
    ? "bg--background-red font--red-darker"
    : "bg--background-blue font--blue-darker";

  return (
    <>
      {[1, 2, 3].includes(item.static.slot) ? (
        <div
          className={`button border-radius--left ${
            item.equipped
              ? categoryBackgroundColor
              : "font--primary-4 bg--primary-3"
          }`}
          style={{ minWidth: "25px", maxWidth: "25px" }}
          onClick={() => {
            equipHandler(item);
          }}
        >
          {item.static.slot === 1 ? (
            <Icon path={mdiRomanNumeral1} size={1.5} />
          ) : item.static.slot === 2 ? (
            <Icon path={mdiRomanNumeral2} size={1.5} />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div
          className="button bg--primary-3 border-radius--left"
          style={{ minWidth: "25px", maxWidth: "25px" }}
          onClick={() => {
            HandleLightSetting();
          }}
        >
          {item.light ? (
            <FontAwesomeIcon icon={faFeather} style={{ fontSize: "12px" }} />
          ) : null}
        </div>
      )}
      <div className="vertical-divider bg--primary-1" />
    </>
  );
}

export default EquipComponent;
