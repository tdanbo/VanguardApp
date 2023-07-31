import * as Constants from "../Constants";

interface InventoryEntryProps {
  index: number;
}

function InventoryEntry({ index }: InventoryEntryProps) {
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
    >
      <div
        className="flex justify-center items-center"
        style={{
          backgroundColor: Constants.BLUE,
          width: "8px",
          fontSize: "10px",
        }}
      >
        x
      </div>
      <div
        className="flex flex-col"
        style={{
          backgroundColor: BackgroundColor(),
          marginLeft: "1px",
        }}
      >
        <div
          className="flex flex-grow-1"
          style={{
            backgroundColor: Constants.BORDER,
            width: "8px",
            marginBottom: "1px",
          }}
        ></div>
        <div
          className="flex flex-grow-1"
          style={{
            backgroundColor: Constants.BORDER,
            width: "8px",
            marginTop: "1px",
          }}
        ></div>
      </div>
      <div className="flex px-2 py-1">
        <div
          className="flex flex-col"
          style={{
            backgroundColor: BackgroundColor(),
          }}
        >
          <div
            className="flex flex-grow-1 rounded-1 justify-center items-center"
            style={{
              backgroundColor: Constants.BORDER,
              width: "22px",
              margin: "1px",
              color: Constants.BLUE,
              fontSize: "11px",
              fontWeight: "bold",
            }}
          >
            Ef
          </div>
          <div
            className="flex flex-grow-1 rounded-1 justify-center items-center"
            style={{
              backgroundColor: Constants.BORDER,
              width: "22px",
              margin: "1px",
              color: Constants.BLUE,
              fontSize: "11px",
              fontWeight: "bold",
            }}
          >
            Ef
          </div>
        </div>
        <div
          className="flex flex-col"
          style={{
            backgroundColor: BackgroundColor(),
          }}
        >
          <div
            className="flex flex-grow-1 rounded-1 justify-center items-center"
            style={{
              backgroundColor: Constants.BORDER,
              width: "22px",
              margin: "1px",
              color: Constants.BLUE,
              fontSize: "11px",
              fontWeight: "bold",
            }}
          >
            Ef
          </div>
          <div
            className="flex flex-grow-1 rounded-1 justify-center items-center"
            style={{
              backgroundColor: Constants.BORDER,
              width: "22px",
              margin: "1px",
              color: Constants.BLUE,
              fontSize: "11px",
              fontWeight: "bold",
            }}
          >
            Ef
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-grow-1">
        <div className="flex flex-col m-0 justify-center">
          <p
            className="mb-3"
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              color: Constants.DARK,
            }}
          >
            Dagger
          </p>
          <p
            className="-mt-2 mb-0"
            style={{
              fontSize: "11px",
              fontWeight: "bold",
              color: Constants.BLUE,
            }}
          >
            Short Weapon
          </p>
        </div>
      </div>
      <div
        className="flex rounded-1 justify-start items-center p-2 m-1"
        style={{
          backgroundColor: Constants.PRIMARY_HOVER,
          border: `1px solid ${Constants.BORDER}`,
          color: Constants.DARK,
          fontSize: "11px",
          fontWeight: "bold",
          height: "22px",
        }}
      >
        119x
      </div>
    </div>
  );
}
export default InventoryEntry;
