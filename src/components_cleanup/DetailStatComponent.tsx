import "../Styles.css";
import * as Constants from "../Constants";

interface DetailStatProps {
  title: string;
  value: string;
}

function DetailStatComponent({ title, value }: DetailStatProps) {
  return (
    <div className="row">
      <div
        className="row"
        style={{
          fontSize: "10px",
          fontWeight: "bold",
          color: Constants.WIDGET_SECONDARY_FONT,
          alignContent: "right",
          justifyContent: "right",
          marginTop: "5px",
        }}
      >
        {title}
      </div>
      <div
        className="row"
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: Constants.WIDGET_PRIMARY_FONT,
          alignContent: "left",
          justifyContent: "left",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default DetailStatComponent;
