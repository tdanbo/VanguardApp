import * as Constants from "../Constants";
import { RestCharacter, GetBurnRate } from "../functions/CharacterFunctions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useRoll } from "../functions/CombatFunctions";
import { CharacterEntry, SessionEntry } from "../Types";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Navigator = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  color: ${Constants.WIDGET_PRIMARY_FONT};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BACKGROUND_EMPTY};
  &:hover {
    background-color: ${Constants.WIDGET_BACKGROUND};
    color: ${Constants.WIDGET_PRIMARY_FONT};
    border: 1px solid ${Constants.WIDGET_BORDER};
  }
  height: 33px;
  width: 48px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const Divider = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.25);
  width: 2px;
  height: 16px;
  margin: 5px;
  background-color: ${Constants.WIDGET_BACKGROUND};
`;

interface RestBoxProps {
  character: CharacterEntry;
  session: SessionEntry;
}

function RestBox({ character, session }: RestBoxProps) {
  const onRollDice = useRoll(); // Moved this outside the HandleRest function

  const HandleRest = () => {
    const updatedCharacter = RestCharacter(character);
    if (updatedCharacter) {
      // setCharacter(updatedCharacter);
    }

    // Using the handleRoll function here doesn't make much sense unless you are planning to call this function somewhere else.
    // Otherwise, you can directly call onRollDice with the required parameters.
    const handleRoll = () => {
      onRollDice({
        session,
        character,
        dice: 20,
        modifier: 20,
        count: 0,
        target: 0,
        source: character.name,
        active: "Resting",
        add_mod: false,
      });
    };

    handleRoll(); // If you wish to execute the roll immediately after updating the character
  };

  return (
    <OuterContainer>
      <Navigator onClick={HandleRest}>
        <Container>{GetBurnRate(character)}</Container>
        <Divider />
        <Icon>
          <FontAwesomeIcon icon={faMoon} />
        </Icon>
      </Navigator>
    </OuterContainer>
  );
}

export default RestBox;
