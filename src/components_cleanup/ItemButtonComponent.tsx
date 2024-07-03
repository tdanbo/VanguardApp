import { faCoins, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Constants from "../Constants";
import { ItemEntry, SessionEntry } from "../Types";
import { update_session } from "../functions/SessionsFunctions";
type buttonStateType = "add" | "drop" | "buy";

interface ItemButtonComponent {
  state: buttonStateType;
  item: ItemEntry;
  session: SessionEntry;
}

function ItemButtonComponent({ state, item, session }: ItemButtonComponent) {
  const icon = state === "buy" ? faCoins : state === "drop" ? faXmark : faPlus;

  return (
    <div
      className="row"
      style={{
        maxWidth: "40px",
        background: Constants.WIDGET_BACKGROUND_EMPTY,
        borderRadius: "0px",
        borderLeft: "1px solid rgba(0, 0, 0, 0.25)",
        color: Constants.WIDGET_SECONDARY_FONT_INACTIVE,
      }}
    >
      <FontAwesomeIcon icon={icon} size="sm" />
    </div>
  );
}

export default ItemButtonComponent;
