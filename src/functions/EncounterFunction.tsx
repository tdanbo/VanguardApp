import { cloneDeep, forEach, random } from "lodash";
import { CharacterEntry } from "../Types";
import {
  ConvertStatValue,
  GetMaxToughness,
  RulesItemDiceAdjust,
} from "./RulesFunctions";
import { IsArmor, IsWeapon } from "./UtilityFunctions";
import { CheckAbility } from "./ActivesFunction";

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

    let initiative_encounter: CharacterEntry[] = cloneDeep(
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

      if (defender && attacker) {
        const attack_count = GetAttackCount(attacker);
        const advantage = GetAttackAdvantage(attacker);
        for (let i = 0; i < attack_count; i++) {
          attack_target(attacker, defender, advantage);
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
      initiative_encounter = [...initiative_encounter.slice(1), attacker].filter((c) => current_health(c) > 0);
    }
  }
  console.log("---");
  console.log("Survival Rate", (survival_rate / rounds) * 100, "%");
  return (survival_rate / rounds) * 100;
}

function attack_target(attacker: CharacterEntry, defender: CharacterEntry, advantage: number) {
  let attack_test = random(1, 20);
  const attack_test_advantage = random(1, 20);

  if (advantage === 2 && attack_test_advantage < attack_test) {
    console.log("Attacking with advantage")
    attack_test = attack_test_advantage
  }

  if (advantage === 0 && attack_test < attack_test_advantage) {
    console.log("Attacking with disadvantage")
    attack_test = attack_test_advantage
  }

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
    let attacker_damage_value = GetAttackerDamage(attacker)
    let defender_armor_value = 0;
    let attacker_damage = 0;
    let defender_armor = 0;



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
  attacker: CharacterEntry | undefined,
  initiative_encounter: CharacterEntry[],
): CharacterEntry | undefined {
  let new_defender: CharacterEntry | undefined;
  let lowest_damage = 1;

  if (!attacker) {
    return undefined
  }

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

function GetAttackCount(attacker: CharacterEntry) : number {
  let attack_count = 1
  // knife play, twin attack, two-handed force, two-handed finesse, natural weapon, rapid fire
  const twin_attack = CheckAbility(attacker, "twin attack", "novice")
  const rapid_fire_2 = CheckAbility(attacker, "rapid fire", "adept")
  const rapid_fire_3 = CheckAbility(attacker, "rapid fire", "master")
  const knife_play = CheckAbility(attacker, "rapid fire", "adept")
  const natural_warrior = CheckAbility(attacker, "natural warrior", "adept")
  if (twin_attack || rapid_fire_2 || natural_warrior || knife_play) {
    attack_count = 2
  } 

  if ( rapid_fire_3 ) {
    attack_count = 3
  }

  return attack_count
  
}

function GetAttackAdvantage(attacker: CharacterEntry) : number {
  let advantage = 1
  const hunter_instinct = CheckAbility(attacker, "hunter's instinct", "novice")
  const two_handed_force  = CheckAbility(attacker, "two-handed force", "adept")
  const two_handed_finesse = CheckAbility(attacker, "two-handed finesse", "adept") 

  if (hunter_instinct || two_handed_force || two_handed_finesse) {
    advantage = 2
  } 

  return advantage

}
function GetAttackerDamage(attacker: CharacterEntry): number {
  console.log("Getting Attack Damage");

  let attacker_damage_value = 0;

  attacker.inventory.some((item) => {
    if (item.equipped && IsWeapon(item)) {
      const item_dice_adjust = RulesItemDiceAdjust(attacker, item);
      item_dice_adjust.forEach((roll) => {
        attacker_damage_value += roll.value;
      });
      return true; // Stop iterating after finding the first equipped weapon
    }
    return false;
  });

  return attacker_damage_value;
}