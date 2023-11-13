import styled from "styled-components";
import {
  AbilityEntry,
  ItemEntry,
  CreatureEntry,
  CreatureStats,
  modifiedCreature,
} from "../Types";
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
import { getAbility, getItem } from "../functions/UtilityFunctions";
import AbilityEntryItem from "./AbilityEntryItem";
import { getCreatureMovement } from "../functions/CharacterFunctions";
import { useEffect, useState, memo } from "react";
import { Berserker } from "../functions/CreatureRules/Berserker";
import { Marksman } from "../functions/CreatureRules/Marksman";
import { SixthSense } from "../functions/CreatureRules/SixthSense";
import { PolearmMastery } from "../functions/CreatureRules/PolearmMastery";
import { ManAtArms } from "../functions/CreatureRules/ManAtArms";
import { AlternativeDamage } from "../functions/CreatureRules/AlternativeDamage";
import { ShieldFighter } from "../functions/CreatureRules/ShieldFighter";
import { TwinAttack } from "../functions/CreatureRules/TwinAttack";
import { Tactician } from "../functions/CreatureRules/Tactician";
import { NaturalWarrior } from "../functions/CreatureRules/NaturalWarrior";
import { Dominate } from "../functions/CreatureRules/Dominate";
import { SurvivalInstinct } from "../functions/CreatureRules/SurvivalInstinct";
import {
  faCoins,
  faHeart,
  faShield,
  faSkull,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import Icon from "@mdi/react";
import { mdiSword, mdiSpear, mdiBowArrow } from "@mdi/js";
import { TwoHandedForce } from "../functions/CreatureRules/TwoHandedForce";
import { SteelThrow } from "../functions/CreatureRules/SteelThrow";

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

const ActiveEmptyBox = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 48px;
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
  creature: CreatureEntry;
  onDelete: (creature: CreatureEntry) => void;
  encounter: CreatureEntry[];
  setEncounter: React.Dispatch<React.SetStateAction<CreatureEntry[]>>;
}

function createTitleString(creature: modifiedCreature): string {
  let titleString = "";

  titleString += `${getCreatureMovement(creature)} Movement\n\n`;

  // Loop through each stat and append its name, value, and modifier to the title string
  for (const statName in creature.stats) {
    if (creature.stats.hasOwnProperty(statName)) {
      const value = creature.stats[statName as keyof CreatureStats];
      const modifier = ModifierConverter[value];
      titleString += `${statName}: ${value} (${
        modifier >= 0 ? "+" : ""
      }${modifier})\n`;
    }
  }

  return titleString.trim(); // trim() is used to remove the extra newline at the end
}

function EncounterCreatureEntry({
  creature,
  onDelete,
  encounter,
  setEncounter,
}: EncounterBoxProps) {
  console.log("Rendering EncounterCreatureEntry");
  const creatureClone = cloneDeep(creature);
  ExceptionalStats(creatureClone);

  const pain = Math.ceil(creatureClone.stats.strong / 2);
  const attack = ModifierConverter[creatureClone.stats.accurate];
  const defense = ModifierConverter[creatureClone.stats.quick];
  const hp = Math.max(creatureClone.stats.strong, 10);
  const [currentDamage, setCurrentDamage] = useState<number>(creature.damage!);
  const [modifiedCreature, setModifiedCreature] = useState<modifiedCreature>();

  const handleAdjustHp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault(); // Prevent the context menu from appearing on right-click

    // Determine the damage adjustment
    const damageAdjustment = event.button === 0 ? 1 : -1;

    const encounter_clone = [...encounter];

    const damage_calc = Math.max(0, currentDamage + damageAdjustment);

    encounter_clone.forEach((encounterCreature) => {
      if (encounterCreature.id === creature.id) {
        console.log("Adjusting damage");
        encounterCreature.damage = damage_calc;
      }
    });

    setCurrentDamage(damage_calc);
    setEncounter(encounter_clone);
  };

  const getAbilities = async (creatureClone: CreatureEntry) => {
    const integrated = [
      "Robust",
      "Armored",
      "Iron Fist",
      "Natural Weapon",
      "Natural Warrior",
      "Exceptionally Strong",
      "Berserker",
      "Sixth Sense",
      "Twin Attack",
      "Exceptionally Quick",
      "Exceptionally Accurate",
      "Exceptionally Resolute",
      "Exceptionally Vigilant",
      "Exceptionally Strong",
      "Exceptionally Persuasive",
      "Exceptionally Discreet",
      "Exceptionally Cunning",
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
    return abilityList;
  };

  const getWeapons = async (creatureClone: CreatureEntry) => {
    const weapons = [];
    for (const weapon of creatureClone.weapon) {
      const fetchedWeapon = await getItem(weapon);
      weapons.push(fetchedWeapon);
    }
    const weaponList = await Promise.all(weapons);
    return weaponList;
  };

  const getArmor = async (creatureClone: CreatureEntry) => {
    const fetchedArmor = await getItem(creatureClone.armor);
    return fetchedArmor;
  };

  const getModifiedCreature = async (creatureClone: CreatureEntry) => {
    const fetchedArmor: ItemEntry = await getArmor(creatureClone);
    const fetchedWeapons: ItemEntry[] = await getWeapons(creatureClone);
    const fetchedAbilities: AbilityEntry[] = await getAbilities(creatureClone);

    return {
      hp: hp,
      pain: pain,
      attack: attack,
      alt_attack: attack,
      weapon: fetchedWeapons,
      armor: fetchedArmor,
      defense: defense,
      stats: creatureClone.stats,
      abilities: fetchedAbilities,
      attacks: 1,
      attacks_mod: 0,
    };
  };

  useEffect(() => {
    console.log("Fetching modified creature");
    const fetchModifiedCreature = async () => {
      const result = await getModifiedCreature(creatureClone);
      setModifiedCreature(result);
    };

    fetchModifiedCreature();
  }, []);

  // UpdatedAbilities
  if (!modifiedCreature) {
    return <div>Loading...</div>;
  }

  if (!modifiedCreature.armor) {
    return <div>Error: Missing armor!</div>;
  }

  if (modifiedCreature.weapon.some((weapon) => !weapon)) {
    return <div>Error: Missing weapon!</div>;
  }
  const berserker = Berserker(modifiedCreature, creatureClone.abilities);
  const robust = Robust(berserker, creatureClone.abilities);
  const tactician = Tactician(robust, creatureClone.abilities);
  const armored = Armored(tactician, creatureClone.abilities);
  const ironfist = IronFist(armored, creatureClone.abilities);
  const naturalweapon = NaturalWeapon(ironfist, creatureClone.abilities);
  const naturalwarrior = NaturalWarrior(naturalweapon, creatureClone.abilities);
  const marksman = Marksman(naturalwarrior, creatureClone.abilities);
  const sixthsense = SixthSense(marksman, creatureClone.abilities);
  const polearmmastery = PolearmMastery(sixthsense, creatureClone.abilities);
  const manatarms = ManAtArms(polearmmastery, creatureClone.abilities);
  const steelthrow = SteelThrow(manatarms, creatureClone.abilities);
  const survivalinstinct = SurvivalInstinct(
    steelthrow,
    creatureClone.abilities,
  );
  const dominate = Dominate(survivalinstinct, creatureClone.abilities);
  const alternativedamage = AlternativeDamage(
    dominate,
    creatureClone.abilities,
  );
  const shieldfighter = ShieldFighter(
    alternativedamage,
    creatureClone.abilities,
  );

  const twinattack = TwinAttack(shieldfighter, creatureClone.abilities);
  const twohandedforce = TwoHandedForce(twinattack, creatureClone.abilities);

  const finalCreature = Feats(twohandedforce, creatureClone.abilities);

  const formatNumber = (num: number): string => {
    if (num > 0) return `+${num}`;
    return `${num}`;
  };

  console.log(finalCreature);

  return (
    <MainContainer>
      {hp - currentDamage <= 0 && (
        <DeadOverlay>
          <FontAwesomeIcon icon={faSkull} />
        </DeadOverlay>
      )}
      <Container src={CharacterPortraits["Character66"]}>
        <ColorBlock $rgb={Constants.BRIGHT_RED} />
        <ActiveBox>
          <ActiveStat
            title={`Pain Threshold ${finalCreature.pain}`}
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
        <ActiveBox>
          <ActiveStat
            title={`When this creature is being attacked ${formatNumber(
              finalCreature.defense,
            )} to targets attack`}
          >
            {formatNumber(finalCreature.defense)}
          </ActiveStat>
          <ActiveArmorSub>
            <FontAwesomeIcon icon={faShield} />
            {Math.ceil(finalCreature.armor.roll.dice / 2) +
              finalCreature.armor.roll.mod}
          </ActiveArmorSub>
        </ActiveBox>
        <NameContainer>
          <NameBox title={createTitleString(finalCreature)}>
            {creature.name}
          </NameBox>
          <ActiveSub>
            {creature.resistance} {creature.race}{" "}
            <FontAwesomeIcon icon={faCoins} title={creature.loot} />
          </ActiveSub>
        </NameContainer>
        {finalCreature.weapon.length < 2 && <ActiveEmptyBox />}
        {finalCreature.weapon.map((weapon, index) => {
          return (
            <ActiveBox>
              <ActiveStat
                key={`weapon-${weapon.name}-${index}`}
                title={`When this creature is attacking ${formatNumber(
                  index === 0 ? finalCreature.attack : finalCreature.alt_attack,
                )} to targets defense`}
              >
                {formatNumber(
                  index === 0 ? finalCreature.attack : finalCreature.alt_attack,
                )}
              </ActiveStat>
              <ActiveDamageSub key={"dmg" + index}>
                {weapon.type === "Ranged Weapon" ||
                weapon.type === "Throwing Weapon" ? (
                  <>
                    <Icon
                      path={mdiBowArrow}
                      size={0.75}
                      title={weapon.type} // Adjusted to display the type of the weapon
                      color={Constants.BRIGHT_RED}
                    />
                    {Math.ceil(weapon.roll.dice / 2) + weapon.roll.mod}
                  </>
                ) : weapon.type === "Long Weapon" ? (
                  <>
                    {finalCreature.attacks > 1 && (
                      <AttacksStat>2 x</AttacksStat>
                    )}
                    <Icon
                      path={mdiSpear}
                      size={0.75}
                      title="Long Weapon"
                      color={Constants.BRIGHT_RED}
                    />
                    {Math.ceil(weapon.roll.dice / 2) + weapon.roll.mod}
                    {finalCreature.attacks > 1 &&
                      ` / ${
                        Math.ceil(weapon.roll.dice / 2) +
                        weapon.roll.mod +
                        finalCreature.attacks_mod
                      }`}
                  </>
                ) : (
                  <>
                    {finalCreature.attacks > 1 && (
                      <AttacksStat>2 x</AttacksStat>
                    )}
                    <Icon
                      path={mdiSword}
                      size={0.75}
                      title="Melee Weapon"
                      color={Constants.BRIGHT_RED}
                    />
                    {Math.ceil(weapon.roll.dice / 2) + weapon.roll.mod}
                    {finalCreature.attacks > 1 &&
                      ` / ${
                        Math.ceil(weapon.roll.dice / 2) +
                        weapon.roll.mod +
                        finalCreature.attacks_mod
                      }`}
                  </>
                )}

                {weapon.type === "Melee Weapon" &&
                  finalCreature.attacks > 1 &&
                  ` / ${
                    Math.ceil(weapon.roll.dice / 2) +
                    weapon.roll.mod +
                    finalCreature.attacks_mod
                  }`}
              </ActiveDamageSub>
            </ActiveBox>
          );
        })}
        <DeleteBlock onClick={() => onDelete(creature)}>
          <FontAwesomeIcon icon={faXmark} />
        </DeleteBlock>
      </Container>
      <AbilityContainer>
        {finalCreature.abilities.map((ability, index) => {
          return (
            <AbilityEntryItem
              key={`ability-${ability.name}-${index}`}
              ability={ability}
              browser={false}
            />
          );
        })}
      </AbilityContainer>
    </MainContainer>
  );
}

export default memo(EncounterCreatureEntry);
