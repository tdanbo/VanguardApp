import * as Constants from "../../Constants";
import styled from "styled-components";
import { CharacterEntry, SessionEntry } from "../../Types";
import { CharacterPortraits } from "../../Images";
import { update_session } from "../../functions/SessionsFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { GetMaxToughness } from "../../functions/RulesFunctions";
import {
  faCheck,
  faChevronRight,
  faSkull,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  min-height: 35px;
  max-height: 35px;
  align-items: center;
  justify-content: center;
  border-radius: ${Constants.BORDER_RADIUS};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  cursor: pointer;
  border: 1px solid ${Constants.WIDGET_BORDER};
`;

const LeftControl = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  width: 20px;
  max-width: 50px;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: ${Constants.WIDGET_BORDER};
`;

const RightControl = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  width: 20px;
  max-width: 50px;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: ${Constants.WIDGET_BORDER};
`;

interface PortraitCenterProps {
  src: string;
}

const PortraitCenter = styled.div<PortraitCenterProps>`
  font-size: 1rem;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  background: linear-gradient(
      rgba(${Constants.COMBAT_BACKGROUND}, 0.925),
      rgba(${Constants.COMBAT_BACKGROUND}, 0.925)
    ),
    url(${(props) => props.src});
  background-size: cover;
  background-position: center 25%;

  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

// const Toughness = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex-grow: 1;
//   background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
//   width: 20px;
//   max-width: 50px;
//   height: 100%;
//   align-items: center;
//   justify-content: center;
//   color: ${Constants.WIDGET_SECONDARY_FONT};
// `;

// const RightTickBar = styled.div<BgColor>`
//   display: flex;
//   flex-grow: 1;
//   background-color: ${(props) => props.$bgcolor};
//   border-right: 1px solid ${Constants.WIDGET_BORDER};
//   border-top: 1px solid ${Constants.WIDGET_BORDER};
//   border-bottom: 1px solid ${Constants.WIDGET_BORDER};
// `;

// const Divider = styled.div`
//   display: flex;
//   background-color: rgba(255, 255, 255, 0.5);
//   width: 2px;
//   height: 16px;
//   margin: 4px;
// `;

// const ValueBoxLeft = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: row;
//   flex-grow: 1;
//   justify-content: center;
//   background-color: ${Constants.WIDGET_BACKGROUND};

//   max-width: 60px;
//   min-width: 60px;
//   color: ${Constants.WIDGET_PRIMARY_FONT};
//   border: 1px solid ${Constants.WIDGET_BORDER};

//   border-top-right-radius: 0;
//   border-bottom-right-radius: 0;
//   border-top-left-radius: ${Constants.BORDER_RADIUS};
//   border-bottom-left-radius: ${Constants.BORDER_RADIUS};

//   h1,
//   h2 {
//     margin: 0;
//     padding: 0;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 100%;
//   }

//   h1 {
//     font-weight: bold;
//     font-size: 25px;
//   }

//   h2 {
//     display: none;
//     font-size: 18px;
//   }

//   &:hover h1 {
//     display: none;
//   }

//   &:hover h2 {
//     display: flex;
//   }
// `;

// const Row = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex: 1;
//   max-height: 35px;
//   min-height: 35px;
//   max-width: 200px;
//   background-color: ${Constants.BACKGROUND};
//   border-radius: ${Constants.BORDER_RADIUS};
// `;

interface SessionBoxProps {
  character: CharacterEntry;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
  session: SessionEntry;
  websocket: WebSocket;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  isCreature: boolean;
}

function CharacterBox({
  character,
  setCharacterName, // setCharacterLog,
  session,
  websocket,
  setIsCreature,
  isCreature,
}: SessionBoxProps) {
  // const { session } = useContext(SessionContext);

  const [killCharacter, setKillCharacter] = useState<boolean>(false);

  const handleOnClick = () => {
    setIsCreature(false);
    setCharacterName(character.name);
  };

  const handleDeleteCharacter = async () => {
    setKillCharacter(false);
    const updated_characters = session.characters.filter(
      (c: CharacterEntry) => character.name !== c.name,
    );
    session.characters = updated_characters;
    update_session(session, character, isCreature, websocket);
  };

  // const maxToughness = GetMaxToughness(character);

  // const damage_toughness = character.damage;
  // const remaining_toughness = maxToughness - character.damage;

  return (
    <Container>
      {killCharacter ? (
        <LeftControl
          onClick={() => setKillCharacter(false)}
          title={"Don't Kill " + character.name}
        >
          <FontAwesomeIcon
            icon={faXmark}
            style={{ fontSize: "12px", color: Constants.BRIGHT_RED }}
          />
        </LeftControl>
      ) : (
        <LeftControl
          onClick={() => setKillCharacter(true)}
          title={"Delete " + character.name}
        >
          <FontAwesomeIcon icon={faSkull} style={{ fontSize: "12px" }} />
        </LeftControl>
      )}
      {/* <Row>
        <ValueBoxLeft>
          <h1>{remaining_toughness}</h1>
          <h2>
            {remaining_toughness}
            <Divider></Divider>
            // {maxToughness}
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
      </Row> */}
      {killCharacter ? (
        <PortraitCenter
          onClick={handleOnClick}
          src={CharacterPortraits[character.portrait]}
        >
          Confirm Delete : {character.name}
        </PortraitCenter>
      ) : (
        <PortraitCenter
          onClick={handleOnClick}
          src={CharacterPortraits[character.portrait]}
        >
          {character.name}
        </PortraitCenter>
      )}
      {killCharacter ? (
        <RightControl onClick={handleDeleteCharacter}>
          <FontAwesomeIcon
            icon={faCheck}
            style={{ fontSize: "12px", color: Constants.BRIGHT_GREEN }}
            title={"Delete " + character.name}
          />
        </RightControl>
      ) : (
        <RightControl onClick={() => handleOnClick()}>
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{ fontSize: "12px", color: Constants.WIDGET_SECONDARY_FONT }}
            title={"Select " + character.name}
          />
        </RightControl>
      )}
    </Container>
  );
}

export default CharacterBox;
