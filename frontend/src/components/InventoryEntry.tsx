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
      className="d-flex"
      style={{
        backgroundColor: BackgroundColor(),
        padding: "1px",
        height: Constants.INTENTORY_ENTRY_HEIGHT,
        minHeight: Constants.INTENTORY_ENTRY_HEIGHT,
        borderTop: `1px solid ${Constants.BORDER}`,
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: Constants.BLUE,
          width: "8px",
          fontSize: "10px",
        }}
      >
        x
      </div>
      <div
        className="d-flex flex-column"
        style={{
          backgroundColor: BackgroundColor(),
          marginLeft: "1px",
        }}
      >
        <div
          className="d-flex flex-grow-1"
          style={{
            backgroundColor: Constants.BORDER,
            width: "8px",
            marginBottom: "1px",
          }}
        ></div>
        <div
          className="d-flex flex-grow-1"
          style={{
            backgroundColor: Constants.BORDER,
            width: "8px",
            marginTop: "1px",
          }}
        ></div>
      </div>
      <div className="d-flex px-2 py-1">
        <div
          className="d-flex flex-column"
          style={{
            backgroundColor: BackgroundColor(),
          }}
        >
          <div
            className="d-flex flex-grow-1 rounded-1 justify-content-center align-items-center"
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
            className="d-flex flex-grow-1 rounded-1 justify-content-center align-items-center"
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
          className="d-flex flex-column"
          style={{
            backgroundColor: BackgroundColor(),
          }}
        >
          <div
            className="d-flex flex-grow-1 rounded-1 justify-content-center align-items-center"
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
            className="d-flex flex-grow-1 rounded-1 justify-content-center align-items-center"
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
      <div className="d-flex flex-row flex-grow-1">
        <div className="d-flex flex-column m-0 justify-content-center">
          <p
            className="card-title"
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              color: Constants.DARK,
            }}
          >
            Dagger
          </p>
          <p
            className="card-subtitle"
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
        className="d-flex rounded-1 justify-content-start align-items-center p-2 m-1"
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
