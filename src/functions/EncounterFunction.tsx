import { cloneDeep, random } from "lodash";
import { CharacterEntry } from "../Types";
import {
  ConvertStatValue,
  GetMaxToughness,
  RulesItemDiceAdjust,
} from "./RulesFunctions";
import { IsArmor, IsWeapon } from "./UtilityFunctions";

export function SurvivalRate(
  character: CharacterEntry[],
  creatures: CharacterEntry[],
) {
  let combined_encounter = [
    ...character.map((c) => ({ ...c, creature: false })),
    ...creatures.map((c) => ({ ...c, creature: true })),
  ];

  let initiative_encounter = cloneDeep(
    combined_encounter.sort(
      (a, b) => b.details.initiative - a.details.initiative,
    ),
  );

  let winner_found = false;
  while (!winner_found) {
    const attacker = initiative_encounter[0];
    const defender = find_defender(attacker, initiative_encounter);

    if (defender) {
      const attack_test = random(1, 20);
      const attack_target =
        attacker.stats.attack.value +
        ConvertStatValue(defender.stats.defense.value);

      let attack_success = attack_test <= attack_target;
      console.log("Attacker", attacker.name, "Defender", defender.name);
      if (attack_success) {
        let attacker_damage_value = 0;
        let defender_armor_value = 0;
        let attacker_damage = 0;
        let defender_armor = 0;

        attacker.inventory.forEach((item) => {
          if (item.equipped && IsWeapon(item)) {
            const item_dice_adjust = RulesItemDiceAdjust(attacker, item);
            console.log("Weapon", item.name);
            item_dice_adjust.forEach((roll) => {
              attacker_damage_value += roll.value;
            });
          }
        });

        defender.inventory.forEach((item) => {
          if (item.equipped && IsArmor(item)) {
            const item_dice_adjust = RulesItemDiceAdjust(defender, item);
            console.log("Armor", item.name);
            item_dice_adjust.forEach((roll) => {
              defender_armor_value += roll.value;
            });
          }
        });

        console.log("---");
        console.log("Attacker Damage Value", attacker_damage_value);
        console.log("Defender Armor Value", defender_armor_value);

        if (attacker.creature) {
          attacker_damage = Math.ceil(attacker_damage_value / 2);
          if (defender_armor_value > 0) {
            defender_armor = random(1, defender_armor_value);
          }
        } else {
          if (attacker_damage_value > 0) {
            attacker_damage = random(1, attacker_damage_value);
          }
          defender_armor = Math.ceil(defender_armor_value / 2);
        }

        console.log("---");
        console.log("Attacker Damage", attacker_damage);
        console.log("Defender Armor", defender_armor);
        const calculated_damage = Math.max(attacker_damage - defender_armor, 0);

        console.log("---");
        console.log("Final Damage", calculated_damage);

        defender.health.damage += calculated_damage;
      } else {
        console.log("Attack Failed");
      }
    } else {
      console.log("Winner Found");
      winner_found = true;
    }

    initiative_encounter = [...initiative_encounter.slice(1), attacker];
  }
}

function find_defender(
  attacker: CharacterEntry,
  initiative_encounter: CharacterEntry[],
): CharacterEntry | undefined {
  let new_defender: CharacterEntry | undefined;
  let lowest_damage = 1;

  initiative_encounter.forEach((character) => {
    if (
      attacker.creature !== character.creature &&
      character.health.damage < GetMaxToughness(character)
    ) {
      lowest_damage = character.health.damage;
      new_defender = character;
    }
  });

  return new_defender;
}
