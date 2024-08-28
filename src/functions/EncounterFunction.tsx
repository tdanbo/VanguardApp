import { cloneDeep, random } from "lodash";
import { CharacterEntry } from "../Types";
import {
  ConvertStatValue,
  GetMaxToughness,
  RulesItemDiceAdjust,
} from "./RulesFunctions";
import { IsArmor, IsWeapon } from "./UtilityFunctions";

// ATTACKER WITH -HEALTH SHOULD NOT BE PICKABLE!

export function SurvivalRate(
  character: CharacterEntry[],
  creatures: CharacterEntry[],
): number {
  let rounds = 50;
  let survival_rate = 0;

  for (let i = 0; i < rounds; i++) {
    console.log("--------------------------------");
    console.log("Itteration", i + 1);
    let combined_encounter = [
      ...character.map((c) => ({ ...c, creature: false })),
      ...creatures.map((c) => ({ ...c, creature: true })),
    ];

    let round = 0;

    let initiative_encounter = cloneDeep(
      combined_encounter.sort(
        (a, b) => b.details.initiative - a.details.initiative,
      ),
    );

    let winner_found = false;
    while (!winner_found) {
      console.log("---");
      const attacker = initiative_encounter[0];
      const defender = find_defender(attacker, initiative_encounter);

      round += 1;

      console.log("Round", round);

      if (defender) {
        const attack_test = random(1, 20);
        const attack_target =
          attacker.stats.attack.value +
          ConvertStatValue(defender.stats.defense.value);

        console.log("Attack Test", attack_test);
        console.log("Attack Target", attack_target);
        console.log(defender.stats.defense.value);
        console.log("Covert Modifier", ConvertStatValue(defender.stats.defense.value));

        let attack_success = attack_test <= attack_target;
        console.log(
          "Attacker", attacker.name, "(", current_health(attacker), "/", GetMaxToughness(attacker), ")",
          " / ", "Defender", defender.name, "(", current_health(defender), "/", GetMaxToughness(defender), ")"
        );

        if (attack_success) {
          console.log("Attack Success");
          let attacker_damage_value = 0;
          let defender_armor_value = 0;
          let attacker_damage = 0;
          let defender_armor = 0;

          attacker.inventory.forEach((item) => {
            if (item.equipped && IsWeapon(item)) {
              const item_dice_adjust = RulesItemDiceAdjust(attacker, item);
              item_dice_adjust.forEach((roll) => {
                attacker_damage_value += roll.value;
              });
            }
          });

          defender.inventory.forEach((item) => {
            if (item.equipped && IsArmor(item)) {
              const item_dice_adjust = RulesItemDiceAdjust(defender, item);
              item_dice_adjust.forEach((roll) => {
                defender_armor_value += roll.value;
              });
            }
          });

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

          console.log("Attacker Damage", attacker_damage);
          console.log("Defender Armor", defender_armor);
          const calculated_damage = Math.max(attacker_damage - defender_armor, 0);

          console.log("Final Damage", calculated_damage);

          defender.health.damage += calculated_damage;
          console.log("Defender Health", current_health(defender));
        } else {
          console.log("Attack Failed");
        }
      } else {
        console.log("Winner Found");
        let character_health = get_character_group_health(initiative_encounter, false);
        let creature_health = get_character_group_health(initiative_encounter, true);

        console.log("Character Health", character_health);
        console.log("Creature Health", creature_health);

        if (character_health <= 0) {
          console.log("Creatures Won");
          winner_found = true;
        } else if (creature_health <= 0) {
          console.log("Players Won");
          winner_found = true;
          survival_rate += 1;
        }
      }
      initiative_encounter = [...initiative_encounter.slice(1), attacker];
    }
  }
  console.log("---");
  console.log("Survival Rate", (survival_rate / rounds) * 100, "%");
  return (survival_rate / rounds) * 100;
}

function get_character_group_health(characters: CharacterEntry[], creature: boolean) {
  let total_damage = 0;
  let total_health = 0;
  const character_filtered = characters.filter((c) => c.creature === creature);
  character_filtered.forEach((character) => {
    total_damage += character.health.damage;
    total_health += GetMaxToughness(character);
  });
  return total_health - total_damage;
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
      current_health(character) > 0
    ) {
      lowest_damage = character.health.damage;
      new_defender = character;
    }
  });
  return new_defender;
}

function current_health(character: CharacterEntry) {
  return GetMaxToughness(character) - character.health.damage;
}
