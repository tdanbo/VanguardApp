import styled from "styled-components";
import { AbilityEntry, CreatureEntry } from "../Types";
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
import { getAbility } from "../functions/UtilityFunctions";
import AbilityEntryItem from "./AbilityEntryItem";
import { getCreatureMovement } from "../functions/CharacterFunctions";
import { useEffect, useState } from "react";
import {
  faCoins,
  faCrosshairs,
  faHeart,
  faShield,
  faSkull,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface ColorTypeProps {
  $rgb: string;
}

interface PortraitProps {
  src: string;
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DeadOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(19, 23, 22, 0.95);
  pointer-events: none; // This makes it non-blocking for clicks
  z-index: 10; // To ensure it's above the other content
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  color: rgba(255, 255, 255, 0.1);
  border-radius: ${Constants.BORDER_RADIUS};
`;

const Container = styled.div<PortraitProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${Constants.BORDER_RADIUS};
  max-height: 75px;
  min-height: 75px;
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

const AbilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 5px;
  border-radius: ${Constants.BORDER_RADIUS};
  border: 1px solid ${Constants.WIDGET_BORDER};
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
  user-select: none;
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

const ActiveArmorSub = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  gap: 5px;
  margin: 5px;
  color: ${Constants.BLUE};
  font-weight: bold;
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
`;

const ActiveDamageSub = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  gap: 5px;
  margin: 5px;
  color: ${Constants.BRIGHT_RED};
  font-weight: bold;
  text-shadow: 2px 2px 2px ${Constants.BACKGROUND};
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
  const [abilities, setAbilities] = useState<AbilityEntry[]>([]);
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

  const getAbilities = async (creatureClone: CreatureEntry) => {
    const integrated = [
      "Robust",
      "Armored",
      "Iron Fist",
      "Natural Weapon",
      "Exceptionally Strong",
    ];
    const abilities = [];

    for (const [abilityName, value] of Object.entries(
      creatureClone.abilities,
    )) {
      if (integrated.includes(abilityName)) {
        continue;
      }
      const ability = await getAbility(abilityName);
      if (value === 1) {
        ability.level = "Novice";
      } else if (value === 2) {
        ability.level = "Adept";
      } else if (value === 3) {
        ability.level = "Master";
      }
      abilities.push(ability);
    }

    const abilityList = await Promise.all(abilities);
    console.log(abilityList);
    return abilityList;
  };

  useEffect(() => {
    const fetchAbilities = async () => {
      const fetchedAbilities = await getAbilities(creatureClone);
      setAbilities(fetchedAbilities);
    };

    fetchAbilities();
  }, [creature]);

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
    abilities: getAbilities(creatureClone),
  };

  // UpdatedAbilities
  Feats(modifiedCreature);
  Robust(modifiedCreature, creature.abilities);
  Armored(modifiedCreature, creature.abilities);
  IronFist(modifiedCreature, creature.abilities);
  NaturalWeapon(modifiedCreature, creature.abilities);

  console.log(creature);

  const [currentHp, setCurrentHp] = useState<number>(hp);

  const handleAdjustHp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault(); // prevent the context menu from appearing on right-click

    if (event.button === 0) {
      // left-click
      setCurrentHp((prevHp) => Math.max(prevHp - 1, 0)); // decrease HP, but don't go below 0
    } else if (event.button === 2) {
      // right-click
      setCurrentHp((prevHp) => Math.min(prevHp + 1, hp)); // increase HP, but don't go above initial HP
    }
  };

  const formatNumber = (num: number): string => {
    if (num > 0) return `+${num}`;
    return `${num}`;
  };

  return (
    <MainContainer>
      {currentHp === 0 && (
        <DeadOverlay>
          <FontAwesomeIcon icon={faSkull} />
        </DeadOverlay>
      )}
      <Container src={CharacterPortraits["Character66"]}>
        <ColorBlock $rgb={Constants.BRIGHT_RED} />
        <ActiveBox>
          <ActiveStat
            title={`Pain Threshold ${modifiedCreature.pain}`}
            onClick={handleAdjustHp}
            onContextMenu={handleAdjustHp}
          >
            {currentHp}
          </ActiveStat>
          <ActiveSub>
            <FontAwesomeIcon icon={faHeart} />
            HP
          </ActiveSub>
        </ActiveBox>
        <ActiveBox>
          <ActiveStat>{getCreatureMovement(modifiedCreature)}</ActiveStat>
          <ActiveSub>Move</ActiveSub>
        </ActiveBox>
        <NameContainer>
          <NameBox>{creature.name}</NameBox>
          <ActiveSub>
            {creature.resistance} {creature.race}{" "}
            <FontAwesomeIcon icon={faCoins} title={creature.loot} />
          </ActiveSub>
        </NameContainer>

        <ActiveBox>
          <ActiveStat
            title={`When this creature is attacking ${formatNumber(
              modifiedCreature.attack,
            )} to targets defense`}
          >
            {formatNumber(modifiedCreature.attack)}
          </ActiveStat>
          <ActiveDamageSub>
            <FontAwesomeIcon icon={faCrosshairs} />
            {modifiedCreature.damage}
          </ActiveDamageSub>
        </ActiveBox>

        <ActiveBox>
          <ActiveStat
            title={`When this creature is being attacked ${formatNumber(
              modifiedCreature.defense,
            )} to targets attack`}
          >
            {formatNumber(modifiedCreature.defense)}
          </ActiveStat>
          <ActiveArmorSub>
            <FontAwesomeIcon icon={faShield} />
            {modifiedCreature.armor}
          </ActiveArmorSub>
        </ActiveBox>
        <DeleteBlock>
          <FontAwesomeIcon icon={faXmark} />
        </DeleteBlock>
      </Container>
      <AbilityContainer>
        {abilities.map((ability, index) => {
          return (
            <AbilityEntryItem key={index} ability={ability} browser={false} />
          );
        })}
      </AbilityContainer>
    </MainContainer>
  );
}

export default EncounterCreatureEntry;
