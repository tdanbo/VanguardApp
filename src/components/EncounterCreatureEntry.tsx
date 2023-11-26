import styled from "styled-components";
import { CharacterEntry } from "../Types";
import * as Constants from "../Constants";
import { CharacterPortraits } from "../Images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cloneDeep } from "lodash";
import AbilityEntryItem from "./AbilityEntryItem";
import { useState, memo, useEffect } from "react";
import { useContext } from "react";
import { CharacterContext } from "../contexts/CharacterContext";
import {
  faHeart,
  faShield,
  faSkull,
  faXmark,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";

import Icon from "@mdi/react";
import { mdiSword } from "@mdi/js";

import { UpdateActives } from "../functions/ActivesFunction";

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
  setCreatureEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

function EncounterCreatureEntry({
  creature,
  onDeleteCreature,
  encounter,
  setCreatureEncounter,
  setCreatureEdit,
}: EncounterBoxProps) {
  console.log("Rendering EncounterCreatureEntry");
  const { setCharacter } = useContext(CharacterContext);

  const creatureClone = cloneDeep(creature);
  const actives = UpdateActives(creatureClone);

  const pain = Math.ceil(creatureClone.stats.strong.value / 2);
  const attack = ModifierConverter[actives.attack.value];
  const defense = ModifierConverter[actives.defense.value];
  const hp = Math.max(creatureClone.stats.strong.value, 10);
  const [currentDamage, setCurrentDamage] = useState<number>(creature.damage!);

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

  const HandleCharacterSheet = () => {
    setCharacter(creature);
    setCreatureEdit(true);
    console.log("HandleCharacterSheet");
  };

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
            {Math.ceil(actives.defense.dice / 2) + actives.defense.dice_mod}
          </ActiveArmorSub>
        </ActiveBox>
        <NameContainer onClick={HandleCharacterSheet}>
          <NameBox title={creatureClone.name}>{creature.name}</NameBox>
          <ActiveSub>
            {resistance} {creature.details.race}{" "}
            <FontAwesomeIcon icon={faCoins} title={loot} />
          </ActiveSub>
        </NameContainer>
        {actives.attack.dice1_name !== "Knuckles" ? (
          <ActiveBox key={`active-box-1`}>
            <ActiveStat
              title={`When this creature is attacking ${formatNumber(
                attack, // If alt attack is not a thing yet, this is sufficient
              )} to targets defense`}
            >
              {formatNumber(attack)}
            </ActiveStat>
            <ActiveDamageSub>
              <>
                {actives.attack.attacks > 1 ? (
                  <>
                    <AttacksStat>2 x</AttacksStat>
                    <Icon
                      path={mdiSword}
                      size={0.75}
                      title={actives.attack.dice1_name} // Adjusted to display the type of the weapon
                      color={Constants.BRIGHT_RED}
                    />
                    {Math.ceil(actives.attack.dice1 / 2) +
                      actives.attack.dice1_mod}
                    {" / " +
                      (Math.ceil(actives.attack.dice1 / 2) +
                        actives.attack.dice1_mod)}
                  </>
                ) : (
                  <>
                    <Icon
                      path={mdiSword}
                      size={0.75}
                      title={actives.attack.dice1_name} // Adjusted to display the type of the weapon
                      color={Constants.BRIGHT_RED}
                    />
                    {Math.ceil(actives.attack.dice1 / 2) +
                      actives.attack.dice1_mod}
                  </>
                )}
              </>
            </ActiveDamageSub>
          </ActiveBox>
        ) : null}
        {actives.attack.dice2_name !== "Knuckles" ? (
          <ActiveBox key={`active-box-1`}>
            <ActiveStat
              title={`When this creature is attacking ${formatNumber(
                attack, // If alt attack is not a thing yet, this is sufficient
              )} to targets defense`}
            >
              {formatNumber(attack)}
            </ActiveStat>
            <ActiveDamageSub>
              <>
                {actives.attack.attacks > 1 ? (
                  <>
                    <AttacksStat>2 x</AttacksStat>
                    <Icon
                      path={mdiSword}
                      size={0.75}
                      title={actives.attack.dice2_name} // Adjusted to display the type of the weapon
                      color={Constants.BRIGHT_RED}
                    />
                    {Math.ceil(actives.attack.dice2 / 2) +
                      actives.attack.dice1_mod}
                    {" / " +
                      (Math.ceil(actives.attack.dice2 / 2) +
                        actives.attack.dice1_mod)}
                  </>
                ) : (
                  <>
                    <Icon
                      path={mdiSword}
                      size={0.75}
                      title={actives.attack.dice2_name} // Adjusted to display the type of the weapon
                      color={Constants.BRIGHT_RED}
                    />
                    {Math.ceil(actives.attack.dice2 / 2) +
                      actives.attack.dice1_mod}
                  </>
                )}
              </>
            </ActiveDamageSub>
          </ActiveBox>
        ) : null}
        <DeleteBlock onClick={() => onDeleteCreature(creature)}>
          <FontAwesomeIcon icon={faXmark} />
        </DeleteBlock>
      </Container>
      <AbilityContainer>
        {creatureClone.abilities.map((ability, index) => {
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
