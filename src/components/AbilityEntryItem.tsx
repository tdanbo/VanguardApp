import * as Constants from "../Constants";
import { AbilityEntry } from "../Types";
import { useState, useContext } from "react";

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
  height: 50px;
  min-height: 50px;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND};
  gap: 5px;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: left;
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
  flex-direction: row;
  flex-grow: 1;
  width: 20px;
  max-width: 20px;
  border-right-top-radius: ${Constants.BORDER_RADIUS};
  background-color: rgba(0, 0, 0, 0.25);
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  padding-bottom: 5px;
`;

const LevelContainer = styled.div`
  display: flex;
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
  align-items: flex-start;
  display: flex;
  flex-grow: 1;
  flex: 1;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  font-size: 11px;
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
  height: 20px;
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

  const onRollDice = useRoll();

  const RollCorruptionDice = async () => {
    const dice_result = await onRollDice({
      dice: "d4",
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
                    modifier: 0,
                    count: 1,
                    target: 0,
                    source: ability.name,
                    active: ability.type,
                    add_mod: true,
                  })
                }
              >
                {roll.dice}
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
                    modifier: 0,
                    count: 1,
                    target: 0,
                    source: ability.name,
                    active: ability.type,
                    add_mod: true,
                  })
                }
              >
                {roll.dice}
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
                    modifier: 0,
                    count: 1,
                    target: 0,
                    source: ability.name,
                    active: ability.type,
                    add_mod: true,
                  })
                }
              >
                {roll.dice}
              </RollButton>
            ))
          : null}
      </>
    );
  }

  return (
    <BaseContainer>
      <Container>
        {ability.type === "Mystical Power" ? (
          <CorruptionButten onClick={RollCorruptionDice}>
            <FontAwesomeIcon icon={faSkull} />
          </CorruptionButten>
        ) : (
          <ExpandButten></ExpandButten>
        )}

        <NameContainer>
          <AbilityName type={ability.type} $active={true}>
            {ability.name}
          </AbilityName>
          <AbilityDetail>
            {ability.type}, {ability.tradition}
          </AbilityDetail>
        </NameContainer>

        <RollContainer>
          <DiceComponent ability={ability} />
        </RollContainer>
        <Divider />
        <LevelSelectionContainer>
          <LevelSelection
            type={ability.type}
            $active={["Novice", "Adept", "Master"].includes(ability.level)}
            onClick={() => handleLevelChange(ability.id, "Novice")}
          >
            N
          </LevelSelection>
          <LevelSelection
            type={ability.type}
            $active={["Adept", "Master"].includes(ability.level)}
            onClick={() => handleLevelChange(ability.id, "Adept")}
          >
            A
          </LevelSelection>
          <LevelSelection
            type={ability.type}
            $active={ability.level === "Master"}
            onClick={() => handleLevelChange(ability.id, "Master")}
          >
            M
          </LevelSelection>
        </LevelSelectionContainer>

        {browser ? (
          <AddButton onClick={AddAbilitySlot}>+</AddButton>
        ) : (
          <AddButton onClick={() => DeleteAbilitySlot(ability.id)}>x</AddButton>
        )}
      </Container>
      <LevelContainer>
        {abilityLevel === "Novice" && (
          <LevelComponent
            level="Novice"
            ability={ability}
            ability_level={ability.novice}
            type={ability.type}
            radius={Constants.BORDER_RADIUS}
          />
        )}
        {abilityLevel === "Adept" && (
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
        {abilityLevel === "Master" && (
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
