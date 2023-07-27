import * as Constants from "../Constants";

type Props = {
  type_name: string;
  type_value: number;
};

function StatBox({ type_name, type_value }: Props) {
  return (
    <div className="d-flex flex-column w-100">
      <div
        className="d-flex flex-grow-1 align-items-center justify-content-center rounded-top"
        style={{
          color: Constants.RED,
          backgroundColor: Constants.PRIMARY_MEDIUM,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "2px 2px 2px 2px",
          fontSize: "0.8rem",
          fontWeight: "bold",
        }}
      >
        {type_value}
      </div>
      <div
        className="d-flex flex-grow-1 align-items-center justify-content-center rounded-bottom"
        style={{
          backgroundColor: Constants.PRIMARY_LIGHTER,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "2px 2px 2px 2px",
          fontSize: "0.8rem",
          fontWeight: "bold",
        }}
      >
        {type_name.toUpperCase()}
      </div>
    </div>
  );
}

export default StatBox;
