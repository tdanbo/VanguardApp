import "bootstrap/dist/css/bootstrap.css";
import * as Constants from "../Constants";

type Props = {
  dice_type: string;
};

const EntryRoll = ({ dice_type }: Props) => {
  return (
    <div className="w-100">
      <div
        className="d-flex align-items-center justify-content-center m-1 rounded-top"
        style={{
          backgroundColor: Constants.PRIMARY_LIGHTER,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
        }}
      >
        0
      </div>
      <div
        className="d-flex align-items-center justify-content-center m-1 rounded-bottom"
        style={{
          backgroundColor: Constants.PRIMARY_LIGHTER,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
        }}
      >
        {dice_type}
      </div>
    </div>
  );
};

const EntryRollButton = () => {
  return (
    <div
      className="d-flex rounded ml-1 mb-1 mt-1"
      style={{
        backgroundColor: Constants.BRIGHT_RED,
        minWidth: "19px",
        border: `1px solid ${Constants.BORDER_LIGHT}`,
      }}
    ></div>
  );
};

function CombatEntryRoll() {
  return (
    <>
      <EntryRoll dice_type="D4" />
      <EntryRoll dice_type="D6" />
      <EntryRoll dice_type="D7" />
      <EntryRoll dice_type="D10" />
      <EntryRoll dice_type="D12" />
      <EntryRoll dice_type="D20" />
      <EntryRollButton />
    </>
  );
}

export default CombatEntryRoll;
