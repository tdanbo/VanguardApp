import * as Constants from "../Constants";
import { AbilityEntry } from "../Types";
import { useState, useContext } from "react";

import { CharacterContext } from "../contexts/CharacterContext";
import { useRoll } from "../functions/CombatFunctions";
import { Ability } from "../Types";

import {
  onDeleteAbility,
  onAddAbilityItem,
  onChangeAbilityLevel,
} from "../functions/CharacterFunctions";

interface LevelComponentProps {
  level: string;
  ability: AbilityEntry;
  ability_level: Ability;
  type: string;
}

const EntryColor = (type: string) => {
  return Constants.TYPE_COLORS[type.toLowerCase()] || Constants.BORDER_DARK;
};

function LevelComponent({
  level,
  ability,
  ability_level,
  type,
}: LevelComponentProps) {
  const onRollDice = useRoll();
  return (
    <div
      className="flex items-center p-2"
      style={{ borderBottom: `1px solid ${Constants.BORDER}` }}
    >
      <div
        className="flex items-center p-2"
        style={{
          backgroundColor: Constants.PRIMARY_DARKER,
          color: EntryColor(type),
          fontSize: "11px",
          fontWeight: "bold",
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
        {ability_level.description}
      </div>
      {Array.from(ability_level.roll).map((roll) => {
        return (
          <div
            className="rounded-1 m-1 flex items-center justify-start p-2"
            style={{
              backgroundColor: Constants.PRIMARY_HOVER,
              border: `1px solid ${Constants.BORDER}`,
              color: EntryColor(type),
              fontSize: "11px",
              fontWeight: "bold",
              height: "22px",
            }}
            onClick={() =>
              onRollDice({
                dice: roll.dice,
                count: 1,
                target: 0,
                type: ability.name,
                add_mod: true,
              })
            }
          >
            {roll.dice}
          </div>
        );
      })}
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
    browser ? "Master" : ability.level,
  );

  const AddAbilitySlot = () => {
    const updatedCharacter = onAddAbilityItem({ character, ability });
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
  };

  const DeleteAbilitySlot = (id: string) => {
    const updatedCharacter = onDeleteAbility({ id, character });
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
  };

  function handleLevelChange(id: string, level: string) {
    setAbilityLevel(level);
    const updatedCharacter = onChangeAbilityLevel({ id, level, character });
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
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
            backgroundColor: EntryColor(ability.type),
            width: "15px",
            minWidth: "15px",
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
            backgroundColor: EntryColor(ability.type),
            width: "15px",
            minWidth: "15px",
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
              backgroundColor:
                ability.level === "Novice" ||
                ability.level === "Adept" ||
                ability.level === "Master"
                  ? EntryColor(ability.type)
                  : Constants.DARK,
              border: `1px solid #3d3d3c`,
              color: Constants.FONT_LIGHT,
              fontSize: "11px",
              fontWeight: "bold",
              width: "30px",
            }}
            onClick={() => handleLevelChange(ability.id, "Novice")}
          >
            N
          </div>
          <div
            className="m-1 flex items-center justify-center rounded"
            style={{
              backgroundColor:
                ability.level === "Adept" || ability.level === "Master"
                  ? EntryColor(ability.type)
                  : Constants.DARK,
              border: `1px solid #3d3d3c`,
              color: Constants.FONT_LIGHT,
              fontSize: "11px",
              fontWeight: "bold",
              width: "30px",
            }}
            onClick={() => handleLevelChange(ability.id, "Adept")}
          >
            A
          </div>
          <div
            className="m-1 flex items-center justify-center rounded"
            style={{
              backgroundColor:
                ability.level === "Master"
                  ? EntryColor(ability.type)
                  : Constants.DARK,
              border: `1px solid #3d3d3c`,
              color: Constants.FONT_LIGHT,
              fontSize: "11px",
              fontWeight: "bold",
              width: "30px",
            }}
            onClick={() => handleLevelChange(ability.id, "Master")}
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
              ability={ability}
              ability_level={ability.novice}
              type={ability.type}
            />
          )}
          {abilityLevel === "Adept" && (
            <>
              <LevelComponent
                level="Novice"
                ability={ability}
                ability_level={ability.novice}
                type={ability.type}
              />
              <LevelComponent
                level="Adept"
                ability={ability}
                ability_level={ability.adept}
                type={ability.type}
              />
            </>
          )}
          {abilityLevel === "Master" && (
            <>
              <LevelComponent
                level="Novice"
                ability={ability}
                ability_level={ability.novice}
                type={ability.type}
              />
              <LevelComponent
                level="Adept"
                ability={ability}
                ability_level={ability.adept}
                type={ability.type}
              />
              <LevelComponent
                level="Master"
                ability={ability}
                ability_level={ability.master}
                type={ability.type}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default AbilityEntryItem;
