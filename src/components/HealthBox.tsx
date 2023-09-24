import * as Constants from "../Constants";
import { CharacterContext } from "../contexts/CharacterContext";
import { useContext } from "react";
import styled from "styled-components";

import {
  onAddPermCorruption,
  onSubPermCorruption,
  onAddToughness,
  onSubToughness,
  onAddCorruption,
  onSubCorruption,
} from "../functions/CharacterFunctions";

interface PortraitProps {
  src: string;
}

const Container = styled.div<PortraitProps>`
  display: flex;
  flex: 2;

  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: ${Constants.BORDER_RADIUS};
`;

// background-image: url("/dist/assets/portrait1.jpeg");

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
  border-radius: ${Constants.BORDER_RADIUS};
`;

const LeftValue = styled.button`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  background-color: ${Constants.WIDGET_BACKGROUND};
  max-width: 50px;
  min-width: 50px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  font-size: 1.25rem;
  font-weight: bold;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-top-right-radius: ${Constants.BORDER_RADIUS};
  border-bottom-right-radius: ${Constants.BORDER_RADIUS};
  p {
    display: none;
    font-size: 1.25rem;
    font-weight: bold;
    margin-top: -10px;
    color: ${Constants.WIDGET_BACKGROUND};
    letter-spacing: 1px;
  }
  &:hover p {
      display: block;
    }
  }
`;

const RightValue = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  background-color: ${Constants.WIDGET_BACKGROUND};
  max-width: 50px;
  min-width: 50px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  font-size: 1.25rem;
  font-weight: bold;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-top-left-radius: ${Constants.BORDER_RADIUS};
  border-bottom-left-radius: ${Constants.BORDER_RADIUS};
  p {
    display: none;
    font-size: 1.25rem;
    font-weight: bold;
    margin-top: -10px;
    color: ${Constants.WIDGET_BACKGROUND};
    letter-spacing: 1px;
  }
  &:hover p {
      display: block;
    }
  }
`;

interface BgColor {
  $bgcolor: string;
}

const LeftTickBar = styled.div<BgColor>`
  display: flex;
  flex-grow: 1;
  border-left: 1px solid ${Constants.WIDGET_BORDER};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${(props) => props.$bgcolor};
`;

const RightTickBar = styled.div<BgColor>`
  display: flex;
  flex-grow: 1;
  background-color: ${(props) => props.$bgcolor};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
`;

function HealthBox() {
  const { character, setCharacter } = useContext(CharacterContext);

  const handleAddToughness = () => {
    const updated_character = onAddToughness(character);
    setCharacter(updated_character);
  };

  const handleSubToughness = () => {
    const updated_character = onSubToughness(character);
    setCharacter(updated_character);
  };

  const handleAddCorruption = () => {
    const updated_character = onAddPermCorruption(character);
    setCharacter(updated_character);
  };

  const handleSubCorruption = () => {
    const updated_character = onSubPermCorruption(character);
    setCharacter(updated_character);
  };

  const handleTempAddCorruption = () => {
    const updated_character = onAddCorruption(character, 1);
    setCharacter(updated_character);
  };

  const handleTempSubCorruption = () => {
    const updated_character = onSubCorruption(character, 1);
    setCharacter(updated_character);
  };

  const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);
  const maxCorruptionPermanent = corruptionThreshold * 3;

  const remaining_corruption =
    maxCorruptionPermanent - character.corruption.permanent;

  const damage_toughness = character.toughness.damage.value;
  const remaining_toughness =
    character.toughness.max.value - character.toughness.damage.value;

  const temporary_corruption = character.corruption.temporary;
  const clean_corruption =
    character.corruption.threshold - temporary_corruption;

  return (
    <Container src={character.portrait}>
      <InnerContainer>
        <Row>
          {[...Array(temporary_corruption)].map((_, index) => (
            <LeftTickBar
              onClick={handleTempSubCorruption}
              onContextMenu={(e) => {
                e.preventDefault();
                handleTempAddCorruption();
              }}
              key={index}
              $bgcolor={Constants.WIDGET_BACKGROUND_EMPTY}
            />
          ))}
          {[...Array(clean_corruption)].map((_, index) => (
            <LeftTickBar
              onClick={handleTempSubCorruption}
              onContextMenu={(e) => {
                e.preventDefault();
                handleTempAddCorruption();
              }}
              key={index}
              $bgcolor={Constants.TYPE_COLORS["casting"]}
            />
          ))}
          <LeftValue
            onClick={handleAddCorruption}
            onContextMenu={(e) => {
              e.preventDefault();
              handleSubCorruption();
            }}
          >
            {remaining_corruption}
            <p>{maxCorruptionPermanent}</p>
          </LeftValue>
        </Row>

        <Row
          onClick={handleSubToughness}
          onContextMenu={(e) => {
            e.preventDefault();
            handleAddToughness();
          }}
        >
          <RightValue>
            {remaining_toughness} <p>{character.toughness.max.value}</p>
          </RightValue>
          {Array.from({ length: remaining_toughness }).map((_, index) => {
            return (
              <RightTickBar
                key={index}
                $bgcolor={Constants.TYPE_COLORS["health"]}
              />
            );
          })}
          {Array.from({ length: damage_toughness }).map((_, index) => {
            return (
              <RightTickBar
                key={index}
                $bgcolor={Constants.WIDGET_BACKGROUND_EMPTY}
              />
            );
          })}
        </Row>
      </InnerContainer>
    </Container>
  );
}

export default HealthBox;
