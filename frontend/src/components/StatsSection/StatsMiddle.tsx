import React from "react";
import TitleBox from "../TitleBox";
import * as Constants from "../../Constants";
import AbilityEntry from "../AbilityEntry";

const StatsMiddle: React.FC = () => {
  return (
    <>
      <TitleBox title={"Abilities & Powers"} />
      <div
        className="flex-grow-1 flex flex-col-reverse overflow-auto p-2"
        style={{
          backgroundColor: Constants.PRIMARY,
        }}
      >
        <AbilityEntry />
        <AbilityEntry />
        <AbilityEntry />
        <AbilityEntry />
        <AbilityEntry />
        <AbilityEntry />
        <AbilityEntry />
        <AbilityEntry />
        <AbilityEntry />
        <AbilityEntry />
      </div>
    </>
  );
};

export default StatsMiddle;
