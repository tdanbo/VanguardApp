import {
  faCoins,
  faHeart,
  faShield,
  faSkull,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mdiBowArrow, mdiKnife, mdiSpear, mdiSword } from "@mdi/js";
import Icon from "@mdi/react";
import { cloneDeep, random, sum } from "lodash";
import { memo, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";
import {
  GetCreatureArmor,
  GetItemDiceSum,
} from "../functions/CharacterFunctions";

import {
  CharacterEntry,
  ItemEntry,
  SessionEntry,
  ResourceItem,
  AbilityEntry,
  DisplayType,
} from "../Types";
import AbilityEntryItem from "../components_browser/AbilityEntryItem";
import {
  GetMaxToughness,
  GetMovementSpeed,
  RulesItemDiceAdjust,
} from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";
import CreatureHealthAdjuster from "./CreatureHealthAdjuster";
import { IsWeapon } from "../functions/UtilityFunctions";
import { GetAttackStat, GetDefenseStat } from "../functions/CharacterFunctions";

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

const ControlBlock = styled.div`
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

const DeleteBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 20px;
  max-width: 20px;
  height: 100%;
  margin: 1px 1px 1px 1px;
  justify-content: center;
  align-items: center;
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
  const weapons: ItemEntry[] = [];
  creature.inventory.forEach((item) => {
    if (item && IsWeapon(item) && item.equipped) {
      weapons.push(item);
    }
  });
  return weapons;
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
  session: SessionEntry;
  websocket: Socket;
  isCreature: boolean;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreature: React.Dispatch<React.SetStateAction<boolean>>;
  onCreatureDelete: (id: string) => void;

  setCharacterId: React.Dispatch<React.SetStateAction<string>>;

  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
}

function EncounterCreatureEntry({
  creature,
  session,
  websocket,
  isCreature,
  setIsCreature,
  onCreatureDelete,
  setCharacterId,
  setDisplay,
}: EncounterBoxProps) {
  const creatureClone = cloneDeep(creature);

  const attack_base_stat =
    creatureClone.stats[GetAttackStat(creatureClone)].value;
  const defense_base_stat =
    creatureClone.stats[GetDefenseStat(creatureClone)].value;

  const attack =
    ModifierConverter[
      attack_base_stat +
        creatureClone.stats.attack.mod +
        creatureClone.stats.attack.base
    ];
  const defense =
    ModifierConverter[
      defense_base_stat +
        creatureClone.stats.defense.mod +
        creatureClone.stats.defense.base
    ];

  console.log(attack);
  console.log(defense);
  const hp = GetMaxToughness(creatureClone);
  const [currentDamage, setCurrentDamage] = useState<number>(
    creature.health.damage!,
  );

  const formatNumber = (num: number): string => {
    if (num > 0) return `+${num}`;
    return `${num}`;
  };

  const SubmitAdjustedHp = (damageAdjustment: number) => {
    const damage_calc = Math.max(0, currentDamage + damageAdjustment);

    creature.health.damage = currentDamage + damageAdjustment;

    setCurrentDamage(damage_calc);
    update_session(session, websocket);
  };

  const [resistance, setResistance] = useState<string>("Weak");

  useEffect(() => {
    if (creatureClone.details.xp_earned < 50) {
      setResistance("Weak");
    } else if (creatureClone.details.xp_earned < 150) {
      setResistance("Ordinary");
    } else if (creatureClone.details.xp_earned < 300) {
      setResistance("Challenging");
    } else if (creatureClone.details.xp_earned <= 600) {
      setResistance("Strong");
    } else if (creatureClone.details.xp_earned <= 1200) {
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
    setCharacterId(creatureClone.id);
    setDisplay("character");
  };

  const title =
    "Initiative: " +
    creatureClone.details.initiative +
    "\n" +
    "Movement: " +
    GetMovementSpeed(creatureClone) +
    "\n" +
    "\n" +
    "Attack: " +
    ModifierConverter[
      creatureClone.stats.attack.value +
        creatureClone.stats.attack.mod +
        creatureClone.stats.attack.base
    ] +
    "\n" +
    "Defense: " +
    ModifierConverter[
      creatureClone.stats.defense.value +
        creatureClone.stats.defense.mod +
        creatureClone.stats.defense.base
    ] +
    "\n" +
    "\n" +
    "Cunning: " +
    ModifierConverter[
      creatureClone.stats.cunning.value +
        creatureClone.stats.cunning.mod +
        creatureClone.stats.cunning.base
    ] +
    "\n" +
    "Discreet: " +
    ModifierConverter[
      creatureClone.stats.discreet.value +
        creatureClone.stats.discreet.mod +
        creatureClone.stats.discreet.base
    ] +
    "\n" +
    "Persuasive: " +
    ModifierConverter[
      creatureClone.stats.persuasive.value +
        creatureClone.stats.persuasive.mod +
        creatureClone.stats.persuasive.base
    ] +
    "\n" +
    "Quick: " +
    ModifierConverter[
      creatureClone.stats.quick.value +
        creatureClone.stats.quick.mod +
        creatureClone.stats.quick.base
    ] +
    "\n" +
    "Resolute: " +
    ModifierConverter[
      creatureClone.stats.resolute.value +
        creatureClone.stats.resolute.mod +
        creatureClone.stats.resolute.base
    ] +
    "\n" +
    "Strong: " +
    ModifierConverter[
      creatureClone.stats.strong.value +
        creatureClone.stats.strong.mod +
        creatureClone.stats.strong.base
    ] +
    "\n" +
    "Vigilant: " +
    ModifierConverter[
      creatureClone.stats.vigilant.value +
        creatureClone.stats.vigilant.mod +
        creatureClone.stats.vigilant.base
    ] +
    "\n" +
    "Accurate: " +
    ModifierConverter[
      creatureClone.stats.accurate.value +
        creatureClone.stats.accurate.mod +
        creatureClone.stats.accurate.base
    ];

  for (const item of creatureClone.inventory) {
    const dice = RulesItemDiceAdjust(creatureClone, item);
  }

  const AddItemLoot = () => {
    for (const item of creature.inventory) {
      const did_it_drop = random(1, 2);
      if (did_it_drop === 1) {
        continue;
      }
      const new_loot_item = cloneDeep(item);
      new_loot_item.equipped = false;
      new_loot_item.id = uuidv4();
      session.loot.drops.push(new_loot_item);
    }

    if (creature.rations > 0) {
      const DropsRations = session.loot.drops.find(
        (item) => item.name === "Ration",
      );
      if (DropsRations) {
        DropsRations.quantity += random(1, creature.rations);
      } else {
        const ration = cloneDeep(ResourceItem);
        ration.name = "Ration";
        ration.quantity = random(1, creature.rations);
        ration.id = uuidv4();
        session.loot.drops.push(ration);
      }
    }

    if (creature.coins > 0) {
      const DropsCoins = session.loot.drops.find(
        (item) => item.name === "Thaler",
      );
      if (DropsCoins) {
        DropsCoins.quantity += creature.coins;
      } else {
        const coins_item = cloneDeep(ResourceItem);
        coins_item.name = "Thaler";
        coins_item.quantity = random(1, creature.coins);
        coins_item.id = uuidv4();
        session.loot.drops.push(coins_item);
      }
    }

    update_session(session, websocket);
  };

  const sortList = (a: AbilityEntry, b: AbilityEntry) => {
    const categoryComparison =
      Constants.TYPE_FILTER.indexOf(a.static.category) -
      Constants.TYPE_FILTER.indexOf(b.static.category);

    if (categoryComparison !== 0) {
      return categoryComparison;
    }

    return 0;
  };

  const sorted_abilities = [...creatureClone.abilities].sort(sortList);

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
          <CreatureHealthAdjuster
            creature={creatureClone}
            session={session}
            websocket={websocket}
            submit_adjust_hp={SubmitAdjustedHp}
          />
          <ActiveSub>
            <FontAwesomeIcon icon={faHeart} />
            HP
          </ActiveSub>
        </ActiveBox>
        <ActiveBox>
          <ActiveStat
            title={`When this creature is being attacked ${formatNumber(
              defense,
            )} to targets attack`}
          >
            {formatNumber(defense)}
          </ActiveStat>
          <ActiveArmorSub>
            <FontAwesomeIcon icon={faShield} />
            {GetCreatureArmor(creatureClone)}
          </ActiveArmorSub>
        </ActiveBox>
        <NameContainer onClick={GoToSheet}>
          <NameBox title={title}>{creature.name}</NameBox>
          <ActiveSub>
            {resistance} {creature.details.race}{" "}
            <FontAwesomeIcon icon={faCoins} title={loot} />
          </ActiveSub>
        </NameContainer>
        {GetWeapons(creatureClone).map((weapon, index) => {
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
                  weapon.static.category !== "ranged weapon" ? (
                    <>
                      <AttacksStat>2 x</AttacksStat>
                      <Icon
                        path={
                          weapon.static.category === "ranged weapon"
                            ? mdiBowArrow
                            : weapon.static.category === "long weapon"
                            ? mdiSpear
                            : weapon.static.category === "short weapon"
                            ? mdiKnife
                            : mdiSword
                        }
                        size={0.75}
                        title={weapon.name}
                        color={Constants.BRIGHT_RED}
                      />
                      {Math.ceil(GetItemDiceSum(weapon) / 2)} + {" / "} +
                      {Math.ceil(GetItemDiceSum(weapon) / 2)}
                    </>
                  ) : (
                    <>
                      <Icon
                        path={
                          weapon.static.category === "ranged weapon"
                            ? mdiBowArrow
                            : weapon.static.category === "long weapon"
                            ? mdiSpear
                            : weapon.static.category === "short weapon"
                            ? mdiKnife
                            : mdiSword
                        }
                        size={0.75}
                        title={weapon.name}
                        color={Constants.BRIGHT_RED}
                      />
                      {Math.ceil(GetItemDiceSum(weapon) / 2)}
                    </>
                  )}
                </>
              </ActiveDamageSub>
            </ActiveBox>
          );
        })}
        <ControlBlock>
          <DeleteBlock
            className={"button-hover"}
            onClick={() => onCreatureDelete(creatureClone.name)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </DeleteBlock>
          <DeleteBlock className={"button-hover"} onClick={() => AddItemLoot()}>
            <FontAwesomeIcon icon={faCoins} />
          </DeleteBlock>
        </ControlBlock>
      </Container>
      <AbilityContainer>
        {sorted_abilities.map((ability, index) => {
          // Ensure both conditions are correctly evaluated together
          const isNotIntegratedOrUtility =
            !Constants.INTEGRATED_ABILITIES.includes(
              ability.name.toLowerCase(),
            ) &&
            ability.static.category.toLowerCase() !== "utility" &&
            ability.static.category.toLowerCase() !== "ritual";

          return isNotIntegratedOrUtility ? (
            <AbilityEntryItem
              websocket={websocket}
              character={creature}
              session={session}
              key={`ability-${ability.name}-${index}`}
              ability={ability}
              browser={false}
              isCreature={isCreature}
              state="drop"
            />
          ) : null;
        })}
      </AbilityContainer>
    </MainContainer>
  );
}

export default memo(EncounterCreatureEntry);
