import { ItemEntry, SessionEntry, CharacterEntry } from "../Types";
import * as Constants from "../Constants";
import { update_session } from "../functions/SessionsFunctions";
import { Socket } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import debounce from "lodash.debounce";
type DurabilityBoxProps = {
  item: ItemEntry;
  session: SessionEntry;
  character: CharacterEntry;
  websocket: Socket;
  isCreature: boolean;
  inactive?: boolean;
};

function DurabilityComponent({
  item,
  session,
  character,
  isCreature,
  websocket,
}: DurabilityBoxProps) {
  const [hover, setHover] = useState(false);
  const [prevDurability, setPrevDurability] = useState(item.durability);
  const [prevItemId, setPrevItemId] = useState(item.id);
  let max_durability = 0;
  if (
    item.static.category === "weapon accessory" ||
    item.static.category === "armor accessory"
  ) {
    max_durability = 4;
  } else {
    max_durability = item.static.roll.base;
  }

  const handleAddDurability = () => {
    if (item.durability >= max_durability) {
      return;
    }
    item.durability = item.durability + 1;
    update_session(session, websocket, character, isCreature);
  };

  const handleSubDurability = () => {
    if (item.durability == 0) {
      return;
    }
    item.durability = item.durability - 1;
    update_session(session, websocket, character, isCreature);
  };

  const setPrevDurabilityDebounced = useMemo(
    () =>
      debounce((durability) => {
        setPrevDurability(durability);
      }, 1000),
    [],
  ); // Delay should match the transition duration in CSS

  useEffect(() => {
    if (item.id !== prevItemId) {
      // If the item has changed, update the previous item ID and durability immediately
      setPrevItemId(item.id);
      setPrevDurability(item.durability);
    } else if (item.durability !== prevDurability) {
      // If the durability has changed, update the previous durability after a delay
      setPrevDurabilityDebounced(item.durability);
    }
  }, [
    item.id,
    item.durability,
    prevItemId,
    prevDurability,
    setPrevDurabilityDebounced,
  ]);

  const durabilityDecreased = useMemo(
    () => item.id === prevItemId && item.durability < prevDurability,
    [item.id, item.durability, prevItemId, prevDurability],
  );

  return (
    <div
      className={`column ${
        durabilityDecreased
          ? "negative_durability_color"
          : "standard_durability_color"
      }`}
      style={{
        minWidth: "40px",
        maxWidth: "40px",
        borderLeft: "1px solid",
        borderColor: "rgba(0, 0, 0, 0.25)",
        borderRadius: "0px",
        justifyContent: "center",
        gap: "0px",
      }}
      onClick={handleSubDurability}
      onContextMenu={(e) => {
        e.preventDefault();
        handleAddDurability();
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      title={"Durability"}
    >
      <div
        className="row"
        style={{
          color: Constants.WIDGET_SECONDARY_FONT,
          fontSize: "14px",
          fontWeight: "bold",
          textShadow: "2px 2px 2px " + Constants.BACKGROUND,
        }}
      >
        {hover ? `${item.durability} I ${max_durability}` : item.durability}
      </div>
      <div
        className="row"
        style={{
          color: "rgba(255, 255, 255, 0.2)",
          fontSize: "10px",
        }}
      >
        <FontAwesomeIcon
          icon={faHammer}
          color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
          fontSize={"12px"}
        />
      </div>
    </div>
  );
}

export default DurabilityComponent;
