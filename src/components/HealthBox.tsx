import * as Constants from "../Constants";
import { CharacterEntry } from "../Types";
import { CharacterContext } from "../contexts/CharacterContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSkull } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

type Props = {
  onAddFunction: (character: CharacterEntry) => CharacterEntry;
  onSubFunction: (character: CharacterEntry) => CharacterEntry;
};

function HealthBox({ onAddFunction, onSubFunction }: Props) {
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
    flex: 2;
    background-image: url("/dist/assets/portrait1.jpeg");
    background-size: cover;
    background-position: center;
    border-radius: ${Constants.BORDER_RADIUS};
  `;

  const InnerContainer = styled.div`
    display: flex;
    flex: 2;
    flex-direction: row;
    justiy-content: end;
    align-items: end;
    gap: 10px;
    margin: 10px;
  `;

  const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    max-height: 50px;
    min-height: 50px;
    background-color: ${Constants.BACKGROUND};
  `;

  const Value = styled.div`
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: center;
    background-color: ${Constants.WIDGET_BACKGROUND};
    max-width: 50px;
    min-width: 50px;
    color: ${Constants.WIDGET_PRIMARY_FONT};
    font-size: 1.25rem;
    font-weight: bold;
    border-right: 1px solid ${Constants.WIDGET_BORDER};
    border-top: 1px solid ${Constants.WIDGET_BORDER};
    border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  `;

  interface cssProps {
    backgroundColor: string;
  }

  const TickBar = styled.div<cssProps>`
    display: flex;
    flex-grow: 1;
    background-color: ${(props) => props.backgroundColor};
    border-right: 1px solid ${Constants.WIDGET_BORDER};
    border-top: 1px solid ${Constants.WIDGET_BORDER};
  `;

  const permanent_corruption = character.corruption.permanent;
  const remaining_corruption =
    character.corruption.threshold * 2 - character.corruption.permanent;

  const damage_toughness = character.toughness.damage.value;
  const remaining_toughness =
    character.stats.strong.value - character.toughness.damage.value;

  return (
    <Container>
      <InnerContainer>
        <Row>
          {Array.from({ length: permanent_corruption }).map((_, index) => {
            return (
              <TickBar
                key={index}
                backgroundColor={Constants.WIDGET_BACKGROUND_EMPTY}
              />
            );
          })}
          {Array.from({ length: remaining_corruption }).map((_, index) => {
            return (
              <TickBar
                key={index}
                backgroundColor={Constants.TYPE_COLORS["casting"]}
              />
            );
          })}
          <Value>{remaining_corruption}</Value>
        </Row>
        <Row>
          <Value>{remaining_toughness}</Value>
          {Array.from({ length: remaining_toughness }).map((_, index) => {
            return (
              <TickBar
                key={index}
                backgroundColor={Constants.TYPE_COLORS["health"]}
              />
            );
          })}
          {Array.from({ length: damage_toughness }).map((_, index) => {
            return (
              <TickBar
                key={index}
                backgroundColor={Constants.WIDGET_BACKGROUND_EMPTY}
              />
            );
          })}
        </Row>
      </InnerContainer>
    </Container>
  );
}

export default HealthBox;
