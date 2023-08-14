import * as Constants from "../Constants";
import { AbilityEntry } from "../Types";
import { useState, useContext } from "react";

import { CharacterContext } from "../contexts/CharacterContext";

import {
  onDeleteAbility,
  onAddAbilityItem,
} from "../functions/CharacterFunctions";

interface LevelComponentProps {
  level: string;
  abilityDescription: string;
}

function LevelComponent({ level, abilityDescription }: LevelComponentProps) {
  return (
    <div
      className="flex items-center p-2"
      style={{ borderBottom: `1px solid ${Constants.BORDER}` }}
    >
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
        {level}
      </div>
      <div
        className="flex-grow-1 flex items-center p-2"
        style={{
          backgroundColor: Constants.PRIMARY_DARKER,
          color: Constants.DARK,
          fontSize: "14px",
        }}
      >
        {abilityDescription}
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
  );
}

interface AbilityEntryItemProps {
  ability: AbilityEntry;
  browser: boolean;
}

function AbilityEntryItem({ ability, browser }: AbilityEntryItemProps) {
  const { character, setCharacter } = useContext(CharacterContext);
  const [abilityLevel, setAbilityLevel] = useState<string>(
    browser ? "Master" : "Novice",
  );

  const AddAbilitySlot = () => {
    const updatedCharacter = onAddAbilityItem({ character, ability });
    if (updatedCharacter) {
      console.log("updatedCharacter", updatedCharacter);
      setCharacter(updatedCharacter);
    }
  };

  const DeleteAbilitySlot = (id: string) => {
    const updatedCharacter = onDeleteAbility({ id, character });
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
  };

  function handleLevelChange(level: string) {
    setAbilityLevel(level);
  }

  return (
    <div
      className="m-1 flex"
      style={{
        backgroundColor: Constants.PRIMARY_DARKER,
      }}
    >
      {browser ? (
        <div
          className="flex items-center justify-center"
          style={{
            backgroundColor: Constants.PURPLE,
            width: "20px",
            fontSize: "10px",
            borderBottom: `1px solid ${Constants.BORDER}`,
          }}
          onClick={() => AddAbilitySlot()}
        >
          +
        </div>
      ) : (
        <div
          className="flex items-center justify-center"
          style={{
            backgroundColor: Constants.PURPLE,
            width: "20px",
            fontSize: "10px",
            borderBottom: `1px solid ${Constants.BORDER}`,
          }}
          onClick={() => DeleteAbilitySlot(ability.id)}
        >
          x
        </div>
      )}
      <div className="grow flex-col">
        <div
          className="flex grow"
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
              {ability.name}
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
            onClick={() => handleLevelChange("Novice")}
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
            onClick={() => handleLevelChange("Adept")}
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
            onClick={() => handleLevelChange("Master")}
          >
            M
          </div>
        </div>
        <div
          className="h-50 h-10 grow flex-col md:p-4"
          style={{
            color: Constants.BORDER_DARK,
            backgroundColor: Constants.PRIMARY_DARKER,
            borderBottom: `1px solid ${Constants.BORDER}`,
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {ability.tradition}, {ability.type}
        </div>
        <div
          className="flex-row"
          style={{
            backgroundColor: Constants.PRIMARY_DARKER,
            borderBottom: `1px solid ${Constants.BORDER}`,
          }}
        >
          {abilityLevel === "Novice" && (
            <LevelComponent
              level="Novice"
              abilityDescription={ability.novice}
            />
          )}
          {abilityLevel === "Adept" && (
            <>
              <LevelComponent
                level="Novice"
                abilityDescription={ability.novice}
              />
              <LevelComponent
                level="Adept"
                abilityDescription={ability.adept}
              />
            </>
          )}
          {abilityLevel === "Master" && (
            <>
              <LevelComponent
                level="Novice"
                abilityDescription={ability.novice}
              />
              <LevelComponent
                level="Adept"
                abilityDescription={ability.adept}
              />
              <LevelComponent
                level="Master"
                abilityDescription={ability.master}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default AbilityEntryItem;
