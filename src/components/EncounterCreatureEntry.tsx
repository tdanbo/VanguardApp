import styled from "styled-components";
import { CharacterEntry, CreatureEntry } from "../Types";
import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Robust } from "../functions/CreatureRules/Robust";
import { Armored } from "../functions/CreatureRules/Armored";
import { NaturalWeapon } from "../functions/CreatureRules/NaturalWeapon";
import { IronFist } from "../functions/CreatureRules/IronFist";
import { Feats } from "../functions/CreatureRules/Feats";
import { ExceptionalStats } from "../functions/CreatureRules/ExceptionalStats";
import { cloneDeep } from "lodash";
import {
  faCrosshairs,
  faShield,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

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
  justify-content: center;
  align-items: center;
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
  gap: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
`;

const ColorBlock = styled.div<ColorTypeProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${(props) => props.$rgb};
  width: 20px;
  max-width: 20px;
  height: 100%;
  margin: 1px 1px 1px 1px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS} 0px 0px ${Constants.BORDER_RADIUS};
`;

const DeleteBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: ${Constants.WIDGET_BACKGROUND};
  width: 20px;
  max-width: 20px;
  height: 100%;
  margin: 1px 1px 1px 1px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: 0px ${Constants.BORDER_RADIUS} ${Constants.BORDER_RADIUS} 0px;
  justify-content: center;
  align-items: center;
  color: ${Constants.WIDGET_BACKGROUND};
`;

const InnnerContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NameBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: ${Constants.BRIGHT_RED};
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
`;

const HpBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  max-width: 45px;
  height: 45px;
`;

const PainBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  max-width: 45px;
  height: 45px;
`;

const ActiveStat = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
  min-width: 45px;
  height: 40px;
`;

const NameContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
`;

const ActiveBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActiveSub = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  gap: 5px;
  margin: 5px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

const ModifierConverter: Record<number, number> = {
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
};

const DamageConverter: Record<string, number> = {
  natural: 2,
  short: 3,
  onehand: 4,
  long: 4,
  heavy: 5,
};

const ArmorConverter: Record<string, number> = {
  natural: 0,
  light: 2,
  medium: 3,
  heavy: 4,
};

interface EncounterBoxProps {
  creature: CreatureEntry;
}

function EncounterCreatureEntry({ creature }: EncounterBoxProps) {
  console.log(creature.stats.strong);
  const creatureClone = cloneDeep(creature);

  ExceptionalStats(creatureClone);

  const hp = Math.max(creatureClone.stats.strong, 10);
  const pain = Math.ceil(creatureClone.stats.strong / 2);
  const attack = ModifierConverter[creatureClone.stats.accurate];
  const defense = ModifierConverter[creatureClone.stats.quick];

  const [damageType, damageFeat] = Object.entries(creatureClone.damage)[0];
  const [armorType, armorFeat] = Object.entries(creatureClone.armor)[0];

  const damage = DamageConverter[damageType];
  const armor = ArmorConverter[armorType];

  const modifiedCreature = {
    hp: hp,
    pain: pain,
    attack: attack,
    damage: damage,
    damage_type: damageType,
    damage_feat: damageFeat,
    defense: defense,
    armor: armor,
    armor_type: armorType,
    armor_feat: armorFeat,
    stats: creatureClone.stats,
  };

  // UpdatedAbilities
  Feats(modifiedCreature);
  Robust(modifiedCreature, creature.abilities);
  Armored(modifiedCreature, creature.abilities);
  IronFist(modifiedCreature, creature.abilities);
  NaturalWeapon(modifiedCreature, creature.abilities);

  console.log(creature);
  return (
    <Container src={CharacterPortraits["Character66"]}>
      <ColorBlock $rgb={Constants.BRIGHT_RED} />
      <ActiveBox>
        <ActiveStat>{modifiedCreature.hp}</ActiveStat>
        <ActiveSub>HP</ActiveSub>
      </ActiveBox>
      <ActiveBox>
        <ActiveStat>{modifiedCreature.pain}</ActiveStat>
        <ActiveSub>PAIN</ActiveSub>
      </ActiveBox>
      <NameContainer>
        <NameBox>{creature.name}</NameBox>
        <ActiveSub>
          {creature.resistance} {creature.race}
        </ActiveSub>
      </NameContainer>

      <ActiveBox>
        <ActiveStat>{modifiedCreature.attack}</ActiveStat>
        <ActiveSub>
          <FontAwesomeIcon icon={faCrosshairs} />
          {modifiedCreature.damage}
        </ActiveSub>
      </ActiveBox>

      <ActiveBox>
        <ActiveStat>{modifiedCreature.defense}</ActiveStat>
        <ActiveSub>
          <FontAwesomeIcon icon={faShield} />
          {modifiedCreature.armor}
        </ActiveSub>
      </ActiveBox>
      <DeleteBlock>
        <FontAwesomeIcon icon={faXmark} />
      </DeleteBlock>
    </Container>
  );
}

export default EncounterCreatureEntry;
