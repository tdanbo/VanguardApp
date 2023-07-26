import React from "react";
import Header from "./Header";
import * as Constants from "../Constants";

const StatsMiddle: React.FC = () => {
  return (
    <>
      <Header title={"Abilities & Powers"} />
      <div
        className="flex-grow-1 overflow-auto d-flex flex-column-reverse"
        style={{
          backgroundColor: Constants.PRIMARY,
        }}
      ></div>
    </>
  );
};

export default StatsMiddle;
