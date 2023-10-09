import * as Constants from "../Constants";
import { AbilityEntry, CreatureEntry } from "../Types";
import { useState, useContext, useEffect, SetStateAction } from "react";

import { CharacterContext } from "../contexts/CharacterContext";
import { useRoll } from "../functions/CombatFunctions";
import { onAddCorruption } from "../functions/CharacterFunctions";
import { Ability } from "../Types";
import styled from "styled-components";

import {
  onDeleteAbility,
  onAddAbilityItem,
  onChangeAbilityLevel,
} from "../functions/CharacterFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkull } from "@fortawesome/free-solid-svg-icons";
import { set } from "lodash";

interface LevelComponentProps {
  level: string;
  ability: AbilityEntry;
  ability_level: Ability;
  type: string;
  radius: string;
}

const BaseContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ContainerProps {
  radius: string;
}

const LevelBaseContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  border-left: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom-left-radius: ${(props) => props.radius};
  border-bottom-right-radius: ${(props) => props.radius};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: 50px;
  min-height: 50px;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  gap: 5px;
  min-height: 35px;
  max-height: 35px;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex: 1;
  margin-left: 5px;
`;

const LevelSelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: right;
`;

const RollContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: right;
  gap: 2px;
`;

const AddButton = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 20px;
  max-width: 20px;
  border-right-top-radius: ${Constants.BORDER_RADIUS};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

const ExpandButten = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  width: 20px;
  max-width: 20px;
  border-right-top-radius: ${Constants.BORDER_RADIUS};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  padding-bottom: 5px;
`;

const CorruptionButten = styled.div`
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  background-color: rgba(25, 25, 25, 1);
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  justify-content: center;
  align-items: center;
  align-items: right;
  font-weight: bold;
  width: 40px;
  font-size: 14px;
`;

interface LevelContainerProps {
  $expanded: boolean;
}

const LevelContainer = styled.div<LevelContainerProps>`
  display: ${(props) => (props.$expanded ? "flex" : "none")};
  flex-direction: column;
`;

const CreatureName = styled.div`
  align-items: flex-end;
  display: flex;
  flex-grow: 1;
  flex: 1;
  color: ${Constants.BRIGHT_RED};
  font-size: 15px;
  font-weight: bold;
`;

const AbilityDetail = styled.div`
  display: flex;
  flex-grow: 1;
  flex: 1;
  color: rgba(255, 255, 255, 0.2);
  font-size: 10px;
`;

const Divider = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.25);
  width: 2px;
  height: 20px;
  margin-left: 2px;
  margin-right: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

// const LevelSelection = styled.div<LevelProps>`
//   margin: 1px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border-radius: 3px;
//   background-color: ${(props) =>
//     props.$active ? EntryColor(props.type) : Constants.WIDGET_BACKGROUND_EMPTY};
//   border: 1px solid #3d3d3c;
//   color: ${Constants.WIDGET_PRIMARY_FONT};
//   font-size: 12px;
//   width: 40px;
//   height: 20px;
//   cursor: pointer;
// `;

const AbilityDescription = styled.div`
  align-items: center;
  padding: 10px;
  flex-grow: 1;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  font-size: 14px;
`;

function parseBoldKeywords(input: string): JSX.Element[] {
  const keywords = [
    "Passive",
    "Free",
    "Attacks",
    "Reaction",
    "Special",
    "Active",
  ];
  const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
  const parts = input.split(regex);
  return parts.map((part, index) => {
    if (keywords.includes(part)) {
      return <strong key={index}>{part}</strong>;
    } else {
      return <span key={index}>{part}</span>;
    }
  });
}

function LevelComponent({ ability_level, radius }: LevelComponentProps) {
  return (
    <LevelBaseContainer radius={radius}>
      <AbilityDescription>
        {parseBoldKeywords(ability_level.description)}
      </AbilityDescription>
    </LevelBaseContainer>
  );
}

interface AbilityEntryItemProps {
  creature: CreatureEntry;
  browser: boolean;
  setInventoryState?: (inventoryState: number) => void;
  encounter: CreatureEntry[];
  setEncounter: React.Dispatch<React.SetStateAction<CreatureEntry[]>>;
}

function CreatureEntryItem({
  creature,
  browser,
  encounter,
  setEncounter,
}: AbilityEntryItemProps) {
  const [expanded, setExpanded] = useState<boolean>(false);

  const AddEncounterCreature = () => {
    console.log("Add Creature");
    const newEncounter = [...encounter];
    newEncounter.push(creature);
    setEncounter(newEncounter);
  };

  const DeleteEncounterCreature = (creature: CreatureEntry) => {
    console.log("Delete Creature");
  };

  return (
    <BaseContainer>
      <Container>
        <ExpandButten
          className={"button-hover"}
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        >
          {/* {expanded ? "-" : "+"} */}
        </ExpandButten>
        <NameContainer>
          <CreatureName>{creature.name}</CreatureName>
          <AbilityDetail>
            {creature.resistance} {creature.race}
          </AbilityDetail>
        </NameContainer>
        {browser ? (
          <AddButton className={"button-hover"} onClick={AddEncounterCreature}>
            +
          </AddButton>
        ) : (
          <AddButton
            className={"button-hover"}
            onClick={() => DeleteEncounterCreature(creature)}
          >
            x
          </AddButton>
        )}
      </Container>
      {/* <LevelContainer $expanded={expanded}>
        {ability.novice.description !== "" && abilityLevel === "Novice" && (
          <LevelComponent
            level="Novice"
            ability={ability}
            ability_level={ability.novice}
            type={ability.type}
            radius={Constants.BORDER_RADIUS}
          />
        )}

        {ability.adept.description !== "" && abilityLevel === "Adept" && (
          <>
            <LevelComponent
              level="Novice"
              ability={ability}
              ability_level={ability.novice}
              type={ability.type}
              radius={"0px"}
            />
            <LevelComponent
              level="Adept"
              ability={ability}
              ability_level={ability.adept}
              type={ability.type}
              radius={Constants.BORDER_RADIUS}
            />
          </>
        )}

        {ability.master.description !== "" && abilityLevel === "Master" && (
          <>
            <LevelComponent
              level="Novice"
              ability={ability}
              ability_level={ability.novice}
              type={ability.type}
              radius={"0px"}
            />
            <LevelComponent
              level="Adept"
              ability={ability}
              ability_level={ability.adept}
              type={ability.type}
              radius={"0px"}
            />
            <LevelComponent
              level="Master"
              ability={ability}
              ability_level={ability.master}
              type={ability.type}
              radius={Constants.BORDER_RADIUS}
            />
          </>
        )}
      </LevelContainer> */}
    </BaseContainer>
  );
}

export default CreatureEntryItem;
