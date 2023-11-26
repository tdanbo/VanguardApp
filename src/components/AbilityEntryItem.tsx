import * as Constants from "../Constants";
import { AbilityEntry } from "../Types";
import { useState, useContext, useEffect } from "react";

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

interface LevelComponentProps {
  level: string;
  ability: AbilityEntry;
  ability_level: Ability;
  type: string;
  radius: string;
}

const EntryColor = (type: string) => {
  return Constants.TYPE_COLORS[type.toLowerCase()] || Constants.WIDGET_BORDER;
};

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

interface LevelProps {
  $active: boolean;
  type: string;
}

const AbilityName = styled.div<LevelProps>`
  align-items: flex-end;
  display: flex;
  flex-grow: 1;
  flex: 1;
  color: ${(props) =>
    props.$active ? EntryColor(props.type) : Constants.WIDGET_SECONDARY_FONT};
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

const LevelSelection = styled.div<LevelProps>`
  margin: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  background-color: ${(props) =>
    props.$active ? EntryColor(props.type) : Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid #3d3d3c;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  font-size: 12px;
  width: 40px;
  height: 20px;
  cursor: pointer;
`;

const AbilityDescription = styled.div`
  align-items: center;
  padding: 10px;
  flex-grow: 1;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  font-size: 14px;
`;

const RollButton = styled.div<LevelProps>`
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  color: ${(props) =>
    props.$active ? EntryColor(props.type) : Constants.WIDGET_SECONDARY_FONT};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  justify-content: center;
  align-items: center;
  align-items: right;
  font-weight: bold;
  width: 40px;
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
  ability: AbilityEntry;
  browser: boolean;
  setInventoryState?: (inventoryState: number) => void;
}

function AbilityEntryItem({
  ability,
  browser,
  setInventoryState,
}: AbilityEntryItemProps) {
  const { character, setCharacter } = useContext(CharacterContext);
  const [abilityLevel, setAbilityLevel] = useState<string>(ability.level);

  useEffect(() => {
    if (browser) {
      if (ability.master.description !== "") {
        setAbilityLevel("Master");
      } else if (ability.adept.description !== "") {
        setAbilityLevel("Adept");
      } else if (ability.novice.description !== "") {
        setAbilityLevel("Novice");
      } else {
        setAbilityLevel("Novice");
      }
    }
  });

  const [expanded, setExpanded] = useState<boolean>(false);

  const AddAbilitySlot = () => {
    const updatedCharacter = onAddAbilityItem({ character, ability });
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
    if (setInventoryState) {
      setInventoryState(2);
    }
  };

  const DeleteAbilitySlot = (ability: AbilityEntry) => {
    const updatedCharacter = onDeleteAbility({ ability, character });
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
  };

  function handleLevelChange(ability: AbilityEntry, level: string) {
    setAbilityLevel(level);
    const updatedCharacter = onChangeAbilityLevel({
      ability,
      level,
      character,
    });
    if (updatedCharacter) {
      setCharacter(updatedCharacter);
    }
  }

  const onRollDice = useRoll();

  const RollCorruptionDice = async () => {
    const dice_result = await onRollDice({
      dice: 4,
      count: 1,
      target: 0,
      modifier: 0,
      source: ability.name,
      active: "Corruption",
      add_mod: true,
    });

    const updated_character = onAddCorruption(character, dice_result);

    if (updated_character) {
      setCharacter(updated_character);
    }
  };

  interface DiceProps {
    ability: AbilityEntry;
  }

  function DiceComponent({ ability }: DiceProps) {
    const onRollDice = useRoll();
    return (
      <>
        {ability.level === "Novice"
          ? Array.from(ability.novice.roll).map((roll, index) => (
              <RollButton
                $active={true}
                key={index}
                type={ability.type}
                onClick={() =>
                  onRollDice({
                    dice: roll.dice,
                    modifier: roll.mod,
                    count: 1,
                    target: 0,
                    source: ability.name,
                    active: ability.type,
                    add_mod: true,
                  })
                }
              >
                d{roll.dice}
                {roll.mod > 0 ? `+${roll.mod}` : null}
              </RollButton>
            ))
          : ability.level === "Adept"
          ? Array.from(ability.adept.roll).map((roll, index) => (
              <RollButton
                $active={true}
                key={index}
                type={ability.type}
                onClick={() =>
                  onRollDice({
                    dice: roll.dice,
                    modifier: roll.mod,
                    count: 1,
                    target: 0,
                    source: ability.name,
                    active: ability.type,
                    add_mod: true,
                  })
                }
              >
                d{roll.dice}
                {roll.mod > 0 ? `+${roll.mod}` : null}
              </RollButton>
            ))
          : ability.level === "Master"
          ? Array.from(ability.master.roll).map((roll, index) => (
              <RollButton
                $active={true}
                key={index}
                type={ability.type}
                onClick={() =>
                  onRollDice({
                    dice: roll.dice,
                    modifier: roll.mod,
                    count: 1,
                    target: 0,
                    source: ability.name,
                    active: ability.type,
                    add_mod: true,
                  })
                }
              >
                d{roll.dice}
                {roll.mod > 0 ? `+${roll.mod}` : null}
              </RollButton>
            ))
          : null}
      </>
    );
  }

  return (
    <BaseContainer>
      <Container>
        <ExpandButten
          className={"button-hover"}
          onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
        >
          {expanded ? "-" : "+"}
        </ExpandButten>
        <NameContainer>
          <AbilityName type={ability.type} $active={true}>
            {ability.name}
          </AbilityName>
          <AbilityDetail>
            {ability.tradition === ""
              ? ability.type
              : `${ability.type}, ${ability.tradition}`}
          </AbilityDetail>
        </NameContainer>

        <RollContainer>
          <DiceComponent ability={ability} />
          {ability.type === "Mystical Power" ? (
            <CorruptionButten onClick={RollCorruptionDice}>
              <FontAwesomeIcon icon={faSkull} />
            </CorruptionButten>
          ) : null}
        </RollContainer>
        <Divider />
        <LevelSelectionContainer>
          {ability.novice.description !== "" && (
            <LevelSelection
              className={"button-hover"}
              type={ability.type}
              $active={["Novice", "Adept", "Master"].includes(ability.level)}
              onClick={() => handleLevelChange(ability, "Novice")}
            >
              N
            </LevelSelection>
          )}
          {ability.adept.description !== "" && (
            <LevelSelection
              className={"button-hover"}
              type={ability.type}
              $active={["Adept", "Master"].includes(ability.level)}
              onClick={() => handleLevelChange(ability, "Adept")}
            >
              A
            </LevelSelection>
          )}
          {ability.master.description !== "" && (
            <LevelSelection
              className={"button-hover"}
              type={ability.type}
              $active={ability.level === "Master"}
              onClick={() => handleLevelChange(ability, "Master")}
            >
              M
            </LevelSelection>
          )}
        </LevelSelectionContainer>

        {browser ? (
          <AddButton className={"button-hover"} onClick={AddAbilitySlot}>
            +
          </AddButton>
        ) : (
          <AddButton
            className={"button-hover"}
            onClick={() => DeleteAbilitySlot(ability)}
          >
            x
          </AddButton>
        )}
      </Container>
      <LevelContainer $expanded={expanded}>
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
      </LevelContainer>
    </BaseContainer>
  );
}

export default AbilityEntryItem;
