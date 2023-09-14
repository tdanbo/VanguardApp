import * as Constants from "../../Constants";
import { CharacterEntry } from "../../Types";
import { CharacterContext } from "../../contexts/CharacterContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSkull } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

type Props = {
  onAddFunction: (character: CharacterEntry) => CharacterEntry;
  onSubFunction: (character: CharacterEntry) => CharacterEntry;
};

function ToughnessBox({ onAddFunction, onSubFunction }: Props) {
  const { character, setCharacter } = useContext(CharacterContext);

  const handleAdd = () => {
    const updated_character = onAddFunction(character);
    setCharacter(updated_character);
  };

  const handleSub = () => {
    const updated_character = onSubFunction(character);
    setCharacter(updated_character);
  };

  const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: coral;
    gap: 10px;
  `;

  const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    background-color: rgb(255, 0, 170);
  `;

  const Value = styled.div`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    background-color: rgb(255, 0, 170);
    font-size: 1.5em;
    font-weight: bold;
    color: white;
  `;

  const Icon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: rgb(189, 188, 187);
    width: 50px;
  `;

  const TickBarFilled = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    background-color: rgb(255, 0, 170);
    border: 1px solid black;
  `;

  const TickBarEmpty = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    background-color: rgb(255, 0, 170);
  `;

  const permanent_corruption = character.corruption.permanent;
  const remaining_corruption =
    character.corruption.threshold * 3 - character.corruption.permanent;

  const damage_toughness = character.toughness.damage.value;
  const remaining_toughness =
    character.toughness.max.value - character.toughness.damage.value;

  return (
    <Container>
      <Row>
        {Array.from({ length: permanent_corruption }).map((_, index) => {
          return <TickBarFilled key={index} />;
        })}
        {Array.from({ length: remaining_corruption }).map((_, index) => {
          return <TickBarEmpty key={index} />;
        })}
        <Value></Value>
        <Icon>
          {character.corruption.threshold * 3 - character.corruption.permanent}
        </Icon>
      </Row>
      <Row>
        <Value>
          {Array.from({ length: damage_toughness }).map((_, index) => {
            return <TickBarFilled key={index} />;
          })}
          {Array.from({ length: remaining_toughness }).map((_, index) => {
            return <TickBarEmpty key={index} />;
          })}
        </Value>
        <Icon>
          {character.toughness.max.value - character.toughness.damage.value}
        </Icon>
      </Row>
    </Container>
  );
}

export default ToughnessBox;
