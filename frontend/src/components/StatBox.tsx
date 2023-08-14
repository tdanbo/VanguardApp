import * as Constants from "../Constants";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";

type Props = {
  type_name: string;
  type_value: number;
};

function StatBox({ type_name, type_value }: Props) {
  return (
    <div className="flex w-full flex-col">
      <div
        className="flex grow items-center justify-center  rounded-t"
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
      <div className="flex">
        <div
          className="h-7 w-7 items-center justify-center rounded-bl "
          style={{
            backgroundColor: Constants.PRIMARY_LIGHTER,
            borderLeft: `1px solid ${Constants.BORDER_LIGHT}`,
            borderBottom: `1px solid ${Constants.BORDER_LIGHT}`,
            borderTop: `1px solid ${Constants.BORDER_LIGHT}`,
            margin: "2px 0px 2px 2px",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
        ></div>
        <div
          className="flex grow items-center justify-center rounded-br pr-6"
          style={{
            backgroundColor: Constants.PRIMARY_LIGHTER,
            border: `1px solid ${Constants.BORDER_LIGHT}`,
            margin: "2px 2px 2px 0px",
            fontSize: "0.8rem",
            fontWeight: "bold",
          }}
        >
          {type_name.toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export default StatBox;
