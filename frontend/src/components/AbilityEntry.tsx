import * as Constants from "../Constants";

function AbilityEntry() {
  return (
    <div
      className="d-flex m-1"
      style={{
        backgroundColor: Constants.PRIMARY_DARKER,
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: Constants.PURPLE,
          width: "20px",
          fontSize: "10px",
          borderBottom: `1px solid ${Constants.BORDER}`,
        }}
      >
        x
      </div>
      <div className="d-flex flex-column flex-grow-1">
        <div
          className="d-flex flex-grow-2"
          style={{
            backgroundColor: Constants.DARK,
            borderBottom: `1px solid ${Constants.BORDER}`,
          }}
        >
          <div className="d-flex flex-row flex-grow-1 m-2">
            <div className="d-flex flex-column m-0 justify-content-center">
              <h5
                className="card-title"
                style={{
                  color: Constants.FONT_LIGHT,
                }}
              >
                Black Bolt
              </h5>
            </div>
          </div>
          <div
            className="d-flex rounded-1 justify-content-center align-items-center m-1"
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
            className="d-flex rounded-1 justify-content-center align-items-center m-1"
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
            className="d-flex rounded-1 justify-content-center align-items-center m-1"
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
          className="d-flex flex-grow-2 py-1"
          style={{
            color: Constants.BORDER_DARK,
            backgroundColor: Constants.PRIMARY_DARKER,
            borderBottom: `1px solid ${Constants.BORDER}`,
            padding: "75px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          Mystical Power, Sorcery, 1 Permanent Corruption
        </div>
        <div
          className="d-flex d-flex-row flex-grow-1"
          style={{
            backgroundColor: Constants.PRIMARY_DARKER,
            borderBottom: `1px solid ${Constants.BORDER}`,
          }}
        >
          <div className="d-flex flex-grow-1 align-items-center p-2">
            <div
              className="d-flex flex-grow-2 align-items-center p-2"
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
              className="d-flex flex-grow-1 align-items-center p-2"
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
              className="d-flex rounded-1 justify-content-start align-items-center p-2 m-1"
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
