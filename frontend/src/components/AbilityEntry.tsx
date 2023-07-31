import * as Constants from "../Constants";

function AbilityEntry() {
  return (
    <div
      className="m-1 flex"
      style={{
        backgroundColor: Constants.PRIMARY_DARKER,
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          backgroundColor: Constants.PURPLE,
          width: "20px",
          fontSize: "10px",
          borderBottom: `1px solid ${Constants.BORDER}`,
        }}
      >
        x
      </div>
      <div className="flex-col">
        <div
          className="flex flex grow"
          style={{
            backgroundColor: Constants.DARK,
            borderBottom: `1px solid ${Constants.BORDER}`,
          }}
        >
          <div className="m-3 flex grow flex-row">
            <h5
              className="items-center justify-start"
              style={{
                color: Constants.FONT_LIGHT,
              }}
            >
              Black Bolt
            </h5>
          </div>
          <div
            className="m-1 flex items-center justify-center rounded"
            style={{
              backgroundColor: Constants.PURPLE,
              border: `1px solid #3d3d3c`,
              color: Constants.FONT_LIGHT,
              fontSize: "11px",
              fontWeight: "bold",
              width: "30px",
            }}
          >
            N
          </div>
          <div
            className="m-1 flex items-center justify-center rounded"
            style={{
              backgroundColor: Constants.DARK,
              border: `1px solid #3d3d3c`,
              color: Constants.FONT_LIGHT,
              fontSize: "11px",
              fontWeight: "bold",
              width: "30px",
            }}
          >
            A
          </div>
          <div
            className="m-1 flex items-center justify-center rounded"
            style={{
              backgroundColor: Constants.DARK,
              border: `1px solid #3d3d3c`,
              color: Constants.FONT_LIGHT,
              fontSize: "11px",
              fontWeight: "bold",
              width: "30px",
            }}
          >
            M
          </div>
        </div>
        <div
          className="h-50 flex h-10 grow md:p-4"
          style={{
            color: Constants.BORDER_DARK,
            backgroundColor: Constants.PRIMARY_DARKER,
            borderBottom: `1px solid ${Constants.BORDER}`,
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          Mystical Power, Sorcery, 1 Permanent Corruption
        </div>
        <div
          className="d-flex-row flex-grow-1 flex"
          style={{
            backgroundColor: Constants.PRIMARY_DARKER,
            borderBottom: `1px solid ${Constants.BORDER}`,
          }}
        >
          <div className="flex items-center p-2">
            <div
              className="flex items-center p-2"
              style={{
                backgroundColor: Constants.PRIMARY_DARKER,
                color: Constants.PURPLE,
                fontSize: "11px",
                fontWeight: "bold",
                width: "100px",
              }}
            >
              NOVICE
            </div>
            <div
              className="flex-grow-1 flex items-center p-2"
              style={{
                backgroundColor: Constants.PRIMARY_DARKER,
                color: Constants.DARK,
                fontSize: "14px",
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book.
            </div>
            <div
              className="rounded-1 m-1 flex items-center justify-start p-2"
              style={{
                backgroundColor: Constants.PRIMARY_HOVER,
                border: `1px solid ${Constants.BORDER}`,
                color: Constants.PURPLE,
                fontSize: "11px",
                fontWeight: "bold",
                height: "22px",
              }}
            >
              1d6
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AbilityEntry;
