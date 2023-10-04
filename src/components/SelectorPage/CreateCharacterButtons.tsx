import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { SessionContext } from "../../contexts/SessionContext";
import { useContext } from "react";
import { CharacterEntry, EmptyArmor, EmptyWeapon } from "../../Types";
import { addNewCharacter } from "../../functions/CharacterFunctions";
import { useWebSocket } from "../../contexts/WebSocketContext";
import {
  ButtonContainer,
  LargeCircleButton,
  LargeCircleButtonDisabled,
} from "./SelectorStyles";
interface Stats {
  id: number;
  value: number;
  label: string;
}

interface CreateSessionsProps {
  setSelector: (selector: string) => void;
  character_name: string;
  stats: Stats[];
  portrait: string;
}

function CreateCharacterButtons({
  setSelector,
  character_name,
  stats,
  portrait,
}: CreateSessionsProps) {
  const { session } = useContext(SessionContext);
  const { sendRequest } = useWebSocket();

  const NewCharacterEntry: CharacterEntry = {
    name: character_name,
    id: session.id,
    portrait: portrait,
    details: {
      race: "",
      movement: 0,
      xp_earned: 50,
      modifier: 0,
    },
    damage: 0,
    stats: {
      accurate: { value: stats[0].value, mod: 0 },
      cunning: { value: stats[1].value, mod: 0 },
      discreet: { value: stats[2].value, mod: 0 },
      persuasive: { value: stats[3].value, mod: 0 },
      quick: { value: stats[4].value, mod: 0 },
      resolute: { value: stats[5].value, mod: 0 },
      strong: { value: stats[6].value, mod: 0 },
      vigilant: { value: stats[7].value, mod: 0 },
    },
    actives: {
      attack: {
        stat: "accurate",
        value: 0,
        dice1: 0,
        dice1_mod: 0,
        dice1_name: "damage",
        dice2: 0,
        dice2_mod: 0,
        dice2_name: "damage",
      },
      defense: {
        stat: "quick",
        value: 0,
        dice: 0,
        dice_mod: 0,
        dice_name: "armor",
      },
      casting: { stat: "resolute", value: 0 },
      sneaking: { stat: "discreet", value: 0 },
    },
    corruption: {
      permanent: 0,
      temporary: 0,
    },
    abilities: [],
    inventory: [],
    equipment: {
      main: EmptyWeapon,
      off: EmptyWeapon,
      armor: EmptyArmor,
    },
    rations: { food: 0, water: 0 },
    money: 0,
  };

  const handlePostCharacter = async () => {
    setSelector("characterSelect");
    await addNewCharacter(NewCharacterEntry);
    sendRequest("characters"); // asking websocket to update session characters for all clients
  };

  return (
    <ButtonContainer>
      <LargeCircleButton onClick={() => setSelector("session")}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </LargeCircleButton>

      {character_name === "" ? (
        <LargeCircleButtonDisabled>
          <FontAwesomeIcon icon={faCheck} />
        </LargeCircleButtonDisabled>
      ) : (
        <LargeCircleButton onClick={handlePostCharacter}>
          <FontAwesomeIcon icon={faCheck} />
        </LargeCircleButton>
      )}
    </ButtonContainer>
  );
}
export default CreateCharacterButtons;
