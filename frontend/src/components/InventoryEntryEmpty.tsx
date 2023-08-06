import * as Constants from "../Constants";
import { CharacterEntry } from "../Types";
import chroma from "chroma-js";

interface InventoryEntryEmptyProps {
  index: number;
  selectedCharacter: CharacterEntry;
}

function InventoryEntryEmpty({
  index,
  selectedCharacter,
}: InventoryEntryEmptyProps) {
  const DARKER_PRIMARY = chroma(Constants.PRIMARY).darken(1).hex();
  const DARKER_PRIMARY_DARKER = chroma(Constants.PRIMARY_DARKER)
    .darken(1)
    .hex();
  const BackgroundColor = () => {
    if (index % 2 === 0) {
      if (index - 1 >= selectedCharacter.stats.strong) {
        return DARKER_PRIMARY;
      } else {
        return Constants.PRIMARY;
      }
    } else {
      if (index - 1 >= selectedCharacter.stats.strong) {
        return DARKER_PRIMARY_DARKER;
      } else {
        return Constants.PRIMARY_DARKER;
      }
    }
  };
  return (
    <div
      className="flex"
      style={{
        backgroundColor: BackgroundColor(),
        padding: "1px",
        height: Constants.INTENTORY_ENTRY_HEIGHT,
        minHeight: Constants.INTENTORY_ENTRY_HEIGHT,
        borderTop: `1px solid ${Constants.BORDER}`,
      }}
    ></div>
  );
}
export default InventoryEntryEmpty;
