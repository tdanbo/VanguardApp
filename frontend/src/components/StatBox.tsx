import * as Constants from "../Constants";

type Props = {
  type_name: string;
  type_value: number;
};

function StatBox({ type_name, type_value }: Props) {
  return (
    <div className="d-flex flex-column w-100">
      <div
        className="d-flex flex-grow-1 align-items-center justify-content-center rounded-top fw-bold"
        style={{
          fontSize: "0.8rem",
          color: Constants.RED,
          backgroundColor: Constants.PRIMARY_MEDIUM,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "2px 2px 2px 2px",
        }}
      >
        {type_value}
      </div>
      <div
        className="d-flex flex-grow-1 align-items-center justify-content-center rounded-bottom fw-bold"
        style={{
          fontSize: "0.8rem",
          backgroundColor: Constants.PRIMARY_LIGHTER,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "2px 2px 2px 2px",
        }}
      >
        {type_name}
      </div>
    </div>
  );
}

export default StatBox;
