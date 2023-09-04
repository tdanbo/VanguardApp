import * as Constants from "../Constants";
interface InventoryEntryEmptyProps {
  index: number;
}

function InventoryEntryEmpty({ index }: InventoryEntryEmptyProps) {
  const BackgroundColor = () => {
    if (index % 2 === 0) {
      return Constants.PRIMARY;
    } else {
      return Constants.PRIMARY_DARKER;
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
