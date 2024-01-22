import {
  faCoins,
  faHeart,
  faShield,
  faSkull,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdiSword } from "@mdi/js";
import Icon from "@mdi/react";
import { cloneDeep } from "lodash";
import { memo, useEffect, useState } from "react";
import styled from "styled-components";
import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";
import { CharacterEntry, ItemEntry, SessionEntry } from "../Types";
import { GetActives } from "../functions/ActivesFunction";
import AbilityEntryItem from "./Entries/AbilityEntryItem";
import { IsArmor, IsWeapon } from "../functions/UtilityFunctions";
import { NaturalWeapon_dice } from "../functions/rules/NaturalWeapon";
import { NaturalWarrior_dice } from "../functions/rules/NaturalWarrior";
import { Berserker_dice } from "../functions/rules/Berserker";
import { ManAtArms_dice } from "../functions/rules/ManAtArms";
import { SteelThrow_dice } from "../functions/rules/SteelThrow";
import { PolearmMastery_dice } from "../functions/rules/PolearmMastery";
import { ShieldFighter_dice } from "../functions/rules/ShieldFighter";
import { ArmoredMystic_dice } from "../functions/rules/ArmoredMystic";
import { Marksman_dice } from "../functions/rules/Marksman";
import { TwohandedForce_dice } from "../functions/rules/TwohandedForce";
import { Armored_dice } from "../functions/rules/Armored";
import { IronFist_dice } from "../functions/rules/IronFist";
import { Robust_dice } from "../functions/rules/Robust";
import { TwinAttack_dice } from "../functions/rules/TwinAttack";
import { ItemRulesDice } from "../functions/rules/ItemRulesDice";

import { Socket } from "socket.io-client";

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

const NameContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  font-size: 18px;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  cursor: pointer;
  user-select: none;
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

const AttacksStat = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: ${Constants.WIDGET_PRIMARY_FONT};
  user-select: none;
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

function GetWeapons(creature: CharacterEntry) {
  let weapons: ItemEntry[] = [];
  creature.inventory.forEach((item) => {
    if (IsWeapon(item) && item.equip.equipped) {
      weapons.push(item);
    }
  });
  return weapons;
}

function GetArmor(creature: CharacterEntry) {
  let armor: ItemEntry[] = [];
  creature.inventory.forEach((item) => {
    if (IsArmor(item) && item.equip.equipped) {
      armor.push(item);
    }
  });
  return armor;
}

function GetAttacks(creature: CharacterEntry) {
  let attacks = 1;
  creature.abilities.forEach((ability) => {
    if (ability.name === "Twin Attack") {
      attacks = 2;
    } else if (
      ability.name === "Two-handed Force" &&
      (ability.level === "Adept" || ability.level === "Master")
    ) {
      attacks = 2;
    } else if (
      ability.name === "Natural Warrior" &&
      (ability.level === "Adept" || ability.level === "Master")
    ) {
      attacks = 2;
    }
  });
  return attacks;
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

interface EncounterBoxProps {
  creature: CharacterEntry;
  onDeleteCreature: (creature: CharacterEntry) => void;
  encounter: CharacterEntry[];
  setCreatureEncounter: React.Dispatch<React.SetStateAction<CharacterEntry[]>>;
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  setGmMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
}

function GetDice(creature: CharacterEntry, item: ItemEntry) {
  let dice = item.roll.dice;
  dice += NaturalWeapon_dice(creature, item);
  dice += NaturalWarrior_dice(creature, item);
  dice += Berserker_dice(creature, item);
  dice += ManAtArms_dice(creature, item);
  dice += SteelThrow_dice(creature, item);
  dice += PolearmMastery_dice(creature, item);
  dice += ShieldFighter_dice(creature, item);
  dice += ArmoredMystic_dice(creature, item);
  dice += Marksman_dice(creature, item);
  dice += TwohandedForce_dice(creature, item);
  dice += Armored_dice(creature, item);
  dice += IronFist_dice(creature, item);
  dice += Robust_dice(creature);
  dice += TwinAttack_dice(creature, item);
  dice += ItemRulesDice(creature, item);
  return dice;
}

function EncounterCreatureEntry({
  creature,
  onDeleteCreature,
  encounter,
  setCreatureEncounter,
  session,
  websocket,
  isCreature,
  setGmMode,
  setCharacterName,
  setIsCreature,
}: EncounterBoxProps) {
  const creatureClone = cloneDeep(creature);
  const character_actives = GetActives(creatureClone);
  const pain = Math.ceil(creatureClone.stats.strong.value / 2);
  const attack = ModifierConverter[character_actives.attack.value];
  const defense = ModifierConverter[character_actives.defense.value];
  const hp = Math.max(creatureClone.stats.strong.value, 10);
  const [currentDamage, setCurrentDamage] = useState<number>(
    creature.health.damage!,
  );

  const handleAdjustHp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent the context menu from appearing on right-click

    // Determine the damage adjustment
    const damageAdjustment = event.button === 0 ? 1 : -1;

    const encounter_clone = [...encounter];

    const damage_calc = Math.max(0, currentDamage + damageAdjustment);

    encounter_clone.forEach((encounterCreature) => {
      if (encounterCreature.id === creature.id) {
        encounterCreature.health.damage = damage_calc;
      }
    });

    setCurrentDamage(damage_calc);
    setCreatureEncounter(encounter_clone);
  };

  const formatNumber = (num: number): string => {
    if (num > 0) return `+${num}`;
    return `${num}`;
  };

  const [resistance, setResistance] = useState<string>("Weak");

  useEffect(() => {
    if (creatureClone.details.xp_earned === 0) {
      setResistance("Weak");
    } else if (creatureClone.details.xp_earned <= 50) {
      setResistance("Ordinary");
    } else if (creatureClone.details.xp_earned <= 150) {
      setResistance("Challenging");
    } else if (creatureClone.details.xp_earned <= 300) {
      setResistance("Strong");
    } else if (creatureClone.details.xp_earned <= 600) {
      setResistance("Mighty");
    } else {
      setResistance("Legendary");
    }
  }, []); // Add creatureClone.details.xp_earned as a dependency

  const [loot, setLoot] = useState<string>("");

  useEffect(() => {
    const lootString = creatureClone.inventory
      .map((item) => item.name)
      .join(", ");
    setLoot(lootString);
  }, []);

  const GoToSheet = () => {
    setIsCreature(true);
    console.log(creature.name);
    // This is a little dodgy removing the last two letter to get rid of the A,B,C on the creatures.
    setCharacterName(creature.name.slice(0, -2));
    setGmMode(false);
  };

  const title =
    "Cunning " +
    ModifierConverter[creatureClone.stats.cunning.value] +
    "\n" +
    "Discreet " +
    ModifierConverter[creatureClone.stats.discreet.value] +
    "\n" +
    "Persuasive " +
    ModifierConverter[creatureClone.stats.persuasive.value] +
    "\n" +
    "Quick " +
    ModifierConverter[creatureClone.stats.quick.value] +
    "\n" +
    "Resolute " +
    ModifierConverter[creatureClone.stats.resolute.value] +
    "\n" +
    "Strong " +
    ModifierConverter[creatureClone.stats.strong.value] +
    "\n" +
    "Vigilant " +
    ModifierConverter[creatureClone.stats.vigilant.value] +
    "\n" +
    "Accurate " +
    ModifierConverter[creatureClone.stats.accurate.value];

  return (
    <MainContainer>
      {hp - currentDamage <= 0 && (
        <DeadOverlay>
          <FontAwesomeIcon icon={faSkull} />
        </DeadOverlay>
      )}
      <Container src={CharacterPortraits[creatureClone.portrait]}>
        <ColorBlock $rgb={Constants.BRIGHT_RED} />
        <ActiveBox>
          <ActiveStat
            title={`Pain Threshold ${pain}`}
            onClick={handleAdjustHp}
            onContextMenu={handleAdjustHp}
          >
            {hp - currentDamage}
          </ActiveStat>
          <ActiveSub>
            <FontAwesomeIcon icon={faHeart} />
            HP
          </ActiveSub>
        </ActiveBox>
        {GetArmor(creatureClone).map((armor, index) => (
          <ActiveBox key={index}>
            <ActiveStat
              title={`When this creature is being attacked ${formatNumber(
                defense,
              )} to targets attack`}
            >
              {formatNumber(defense)}
            </ActiveStat>
            <ActiveArmorSub>
              <FontAwesomeIcon icon={faShield} />
              {Math.ceil(GetDice(creature, armor) / 2) + armor.roll.mod}
            </ActiveArmorSub>
          </ActiveBox>
        ))}
        <NameContainer onClick={GoToSheet}>
          <NameBox title={title}>{creature.name}</NameBox>
          <ActiveSub>
            {resistance} {creature.details.race}{" "}
            <FontAwesomeIcon icon={faCoins} title={loot} />
          </ActiveSub>
        </NameContainer>
        {GetWeapons(creatureClone).map((item, index) => {
          return (
            <ActiveBox key={`active-box-${index}`}>
              <ActiveStat
                title={`When this creature is attacking ${formatNumber(
                  attack,
                )} to targets defense`}
              >
                {formatNumber(attack)}
              </ActiveStat>
              <ActiveDamageSub>
                <>
                  {GetAttacks(creature) > 1 &&
                  item.category !== "ranged weapon" ? (
                    <>
                      <AttacksStat>2 x</AttacksStat>
                      <Icon
                        path={mdiSword}
                        size={0.75}
                        title={item.name}
                        color={Constants.BRIGHT_RED}
                      />
                      {Math.ceil(GetDice(creature, item) / 2) + item.roll.mod}
                      {" / " +
                        (Math.ceil(GetDice(creature, item) / 2) +
                          item.roll.mod)}
                    </>
                  ) : (
                    <>
                      <Icon
                        path={mdiSword}
                        size={0.75}
                        title={item.name}
                        color={Constants.BRIGHT_RED}
                      />
                      {Math.ceil(GetDice(creature, item) / 2) + item.roll.mod}
                    </>
                  )}
                </>
              </ActiveDamageSub>
            </ActiveBox>
          );
        })}
        <DeleteBlock onClick={() => onDeleteCreature(creature)}>
          <FontAwesomeIcon icon={faXmark} />
        </DeleteBlock>
      </Container>
      <AbilityContainer>
        {creatureClone.abilities.map((ability, index) => {
          return (
            <AbilityEntryItem
              websocket={websocket}
              character={creature}
              session={session}
              key={`ability-${ability.name}-${index}`}
              ability={ability}
              browser={false}
              isCreature={isCreature}
            />
          );
        })}
      </AbilityContainer>
    </MainContainer>
  );
}

export default memo(EncounterCreatureEntry);
