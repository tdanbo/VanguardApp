import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";
import { CharacterEntry } from "../Types";
import { GetMovementSpeed } from "../functions/RulesFunctions";
interface ColorTypeProps {
  $rgb: string;
}

interface PortraitProps {
  src: string;
}

const Container = styled.div<PortraitProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  border-radius: ${Constants.BORDER_RADIUS};
  max-height: 100px;
  min-height: 100px;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  background: linear-gradient(
      rgba(${Constants.COMBAT_BACKGROUND}, 0.925),
      rgba(${Constants.COMBAT_BACKGROUND}, 0.925)
    ),
    url(${(props) => props.src});
  background-size: cover;
  background-position: center 25%;
  border: 1px solid ${Constants.WIDGET_BORDER};
`;

const ColorBlock = styled.div<ColorTypeProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${(props) => props.$rgb};
  width: 20px;
  max-width: 20px;
  margin: 1px 1px 1px 1px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS} 0px 0px ${Constants.BORDER_RADIUS};
`;

const NameBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: ${Constants.BLUE};
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
`;

interface EncounterBoxProps {
  character: CharacterEntry;
}

const ModifierConverter: Record<number, number> = {
  20: -10,
  19: -9,
  18: -8,
  17: -7,
  16: -6,
  15: -5,
  14: -4,
  13: -3,
  12: -2,
  11: -1,
  10: 0,
  9: 1,
  8: 2,
  7: 3,
  6: 4,
  5: 5,
  4: 6,
  3: 7,
  2: 8,
  1: 9,
};

function EncounterCharacterEntry({ character }: EncounterBoxProps) {
  const title =
    "Initiative: " +
    character.details.initiative +
    "\n" +
    "Movement: " +
    GetMovementSpeed(character) +
    "\n" +
    "\n" +
    "Attack: " +
    ModifierConverter[
      character.stats.attack.value +
        character.stats.attack.mod +
        character.stats.attack.base
    ] +
    "\n" +
    "Defense: " +
    ModifierConverter[
      character.stats.defense.value +
        character.stats.defense.mod +
        character.stats.defense.base
    ] +
    "\n" +
    "\n" +
    "Cunning: " +
    ModifierConverter[
      character.stats.cunning.value +
        character.stats.cunning.mod +
        character.stats.cunning.base
    ] +
    "\n" +
    "Discreet: " +
    ModifierConverter[
      character.stats.discreet.value +
        character.stats.discreet.mod +
        character.stats.discreet.base
    ] +
    "\n" +
    "Persuasive: " +
    ModifierConverter[
      character.stats.persuasive.value +
        character.stats.persuasive.mod +
        character.stats.persuasive.base
    ] +
    "\n" +
    "Quick: " +
    ModifierConverter[
      character.stats.quick.value +
        character.stats.quick.mod +
        character.stats.quick.base
    ] +
    "\n" +
    "Resolute: " +
    ModifierConverter[
      character.stats.resolute.value +
        character.stats.resolute.mod +
        character.stats.resolute.base
    ] +
    "\n" +
    "Strong: " +
    ModifierConverter[
      character.stats.strong.value +
        character.stats.strong.mod +
        character.stats.strong.base
    ] +
    "\n" +
    "Vigilant: " +
    ModifierConverter[
      character.stats.vigilant.value +
        character.stats.vigilant.mod +
        character.stats.vigilant.base
    ] +
    "\n" +
    "Accurate: " +
    ModifierConverter[
      character.stats.accurate.value +
        character.stats.accurate.mod +
        character.stats.accurate.base
    ];
  return (
    <Container src={CharacterPortraits[character.portrait]} title={title}>
      <ColorBlock $rgb={Constants.BLUE} />
      <NameBox>{character.name}</NameBox>
    </Container>
  );
}

export default EncounterCharacterEntry;
