import * as Constants from "../Constants";

type Props = {
  type_name: string;
  type_value: number;
};

function StatBox({ type_name, type_value }: Props) {
  return (
    <div className="flex flex-col w-full">
      <div
        className="flex flex-grow-1 items-center justify-center rounded-t"
        style={{
          color: Constants.RED,
          backgroundColor: Constants.PRIMARY_MEDIUM,
          border: `1px solid ${Constants.BORDER_LIGHT}`,
          margin: "2px 2px 2px 2px",
          fontSize: "1.1rem",
          fontWeight: "bold",
        }}
      >
        {type_value}
      </div>
      <div
        className="flex flex-grow-1 items-center justify-center rounded-b"
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
