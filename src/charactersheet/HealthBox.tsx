import * as Constants from "../Constants";
import { CharacterEntry } from "../Types";
import styled from "styled-components";
import { CharacterPortraits } from "../Images";
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
  background-position: center 40%;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
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

interface ValueBoxProps {
  placement: number;
}

const ValueBoxRight = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
  background-color: ${Constants.WIDGET_BACKGROUND};
  max-width: 60px;
  min-width: 60px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};

  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: ${Constants.BORDER_RADIUS};
  border-bottom-right-radius: ${Constants.BORDER_RADIUS};

  h1,
  h2 {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  h1 {
    font-weight: bold;
    font-size: 25px;
  }

  h2 {
    display: none;
    font-size: 18px;
  }

  &:hover h1 {
    display: none;
  }

  &:hover h2 {
    display: flex;
  }
`;

const ValueBoxLeft = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
  background-color: ${Constants.WIDGET_BACKGROUND};
  max-width: 60px;
  min-width: 60px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border: 1px solid ${Constants.WIDGET_BORDER};

  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: ${Constants.BORDER_RADIUS};
  border-bottom-left-radius: ${Constants.BORDER_RADIUS};

  h1,
  h2 {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  h1 {
    font-weight: bold;
    font-size: 25px;
  }

  h2 {
    display: none;
    font-size: 18px;
  }

  &:hover h1 {
    display: none;
  }

  &:hover h2 {
    display: flex;
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

const Divider = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.5);
  width: 2px;
  height: 16px;
  margin: 4px;
`;

interface HealthBoxProps {
  character: CharacterEntry;
}

function HealthBox({ character }: HealthBoxProps) {
  const handleAddToughness = () => {
    const updated_character = onAddToughness(character);
    // setCharacter(updated_character);
  };

  const handleSubToughness = () => {
    const updated_character = onSubToughness(character);
    // setCharacter(updated_character);
  };

  const handleAddCorruption = () => {
    const updated_character = onAddPermCorruption(character);
    // setCharacter(updated_character);
  };

  const handleSubCorruption = () => {
    const updated_character = onSubPermCorruption(character);
    // setCharacter(updated_character);
  };

  const handleTempAddCorruption = () => {
    const updated_character = onAddCorruption(character, 1);
    // setCharacter(updated_character);
  };

  const handleTempSubCorruption = () => {
    const updated_character = onSubCorruption(character, 1);
    // setCharacter(updated_character);
  };

  const corruptionThreshold = Math.ceil(character.stats.resolute.value / 2);
  const maxCorruptionPermanent = corruptionThreshold * 3;

  const remaining_corruption =
    maxCorruptionPermanent - character.corruption.permanent;
  const temporary_corruption = character.corruption.temporary;
  const clean_corruption = corruptionThreshold - temporary_corruption;

  const maxToughness =
    character.stats.strong.value < 10 ? 10 : character.stats.strong.value;
  const damage_toughness = character.damage;
  const remaining_toughness = maxToughness - character.damage;

  return (
    <Container src={CharacterPortraits[character.portrait]}>
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
          <ValueBoxRight
            onClick={handleAddCorruption}
            onContextMenu={(e) => {
              e.preventDefault();
              handleSubCorruption();
            }}
          >
            <h1>{remaining_corruption}</h1>
            <h2>
              {remaining_corruption}
              <Divider></Divider>
              {maxCorruptionPermanent}
            </h2>
          </ValueBoxRight>
        </Row>
        <Row
          onClick={handleSubToughness}
          onContextMenu={(e) => {
            e.preventDefault();
            handleAddToughness();
          }}
        >
          <ValueBoxLeft>
            <h1>{remaining_toughness}</h1>
            <h2>
              {remaining_toughness}
              <Divider></Divider>
              {maxToughness}
            </h2>
          </ValueBoxLeft>
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
