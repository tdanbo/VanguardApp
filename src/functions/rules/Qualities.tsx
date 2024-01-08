export const Qualities: {
  [key: string]: { name: string; description: string };
} = {
  "Impeding 0": {
    name: "Impeding 0",
    description:
      "The armor hampers any agile movements and gives a penalty to tests against Defense, sneaking and the use of mystic powers. The penalty depends on whether the armor is light (-2), medium (-3) or heavy (-4).",
  },
  "Impeding 1": {
    name: "Impeding 1",
    description:
      "The armor hampers any agile movements and gives a penalty to tests against Defense, sneaking and the use of mystic powers. The penalty depends on whether the armor is light (-2), medium (-3) or heavy (-4).",
  },
  "Impeding 2": {
    name: "Impeding 2",
    description:
      "The armor hampers any agile movements and gives a penalty to tests against Defense, sneaking and the use of mystic powers. The penalty depends on whether the armor is light (-2), medium (-3) or heavy (-4).",
  },
  "Impeding 3": {
    name: "Impeding 3",
    description:
      "The armor hampers any agile movements and gives a penalty to tests against Defense, sneaking and the use of mystic powers. The penalty depends on whether the armor is light (-2), medium (-3) or heavy (-4).",
  },
  "Impeding 4": {
    name: "Impeding 4",
    description:
      "The armor hampers any agile movements and gives a penalty to tests against Defense, sneaking and the use of mystic powers. The penalty depends on whether the armor is light (-2), medium (-3) or heavy (-4).",
  },
  Flexible: {
    name: "Flexible",
    description:
      "The armor is unusually flexible and is less impeding than its protective capability would suggest. For this reason, a Flexible light armor has no penalty at all on Defense tests, sneaking, and the use of mystic powers. A Flexible medium armor has a (-1) penalty, and a Flexible heavy armor has a (-2) penalty. A Flexible shield can be carried strapped to the arm, ready to use, while at the same time allowing the bearer to use both hands for wielding a Long or Heavy weapon. Even ranged weapons can be used without a problem together with a Flexible shield.",
  },
  Reinforced: {
    name: "Reinforced",
    description:
      "The armor is tougher than other armor in the same category (light, medium, heavy), meaning that the wearer may add +1 to his or her armor rolls.",
  },
  "Balanced 1": {
    name: "Balanced 1",
    description:
      "The item is so well balanced that it is extra effective when blocking attacks. The item provides +1 in Defense.",
  },
  "Balanced 2": {
    name: "Balanced 2",
    description:
      "The item is so well balanced that it is extra effective when blocking attacks. The item provides +2 in Defense.",
  },
  Blunt: {
    name: "Blunt",
    description:
      "The weapon lacks either cutting or piercing abilities, and therefore uses one (1) Effect Die lower than other weapons of its kind. The quarterstaff, a Long weapon with the Blunt quality, deals 1D6 damage instead of 1D8, which is the usual damage for long weapons.",
  },
  Cumbersome: {
    name: "Cumbersome",
    description:
      "It is difficult to move around in this armor, and its impeding effect is therefore one point higher than usual. A Cumbersome light armor has a penalty of (-3), a medium of (-4), and a heavy of (-5).",
  },
  "Deep Impact": {
    name: "Deep Impact",
    description:
      "The weapon has qualities that make it even more deadly. Maybe its blade can pierce armor more easily or the weapon itself is so massive that it gets extra crushing power. Either way, the weapon deals +1 extra damage.",
  },
  Impeding: {
    name: "Impeding",
    description:
      "The armor hampers any agile movements and gives a penalty to tests against Defense, sneaking, and the use of mystic powers. The penalty depends on whether the armor is light (-2), medium (-3), or heavy (-4).",
  },
  Jointed: {
    name: "Jointed",
    description:
      "The weapon is jointed, letting the head of the weapon strike past or around blocking weapons or shields, making it harder to parry. The length of the chain also makes the attacks difficult to evade. Even if a parry is successful, the attack hits if the die lands on an odd number; in which case, the weapon deals 1D6 damage. This secondary damage is not affected by any abilities - it remains 1D6 regardless of the attacker's other abilities.",
  },
  Long: {
    name: "Long",
    description:
      "The weapon has the advantage of superior length and reach, giving the wielder one Free Attack each turn against an opponent that comes into range of melee combat, as long as said opponent is not also armed with a Long weapon.",
  },
  Precise: {
    name: "Precise",
    description:
      "The weapon is designed to be easy to wield and, therefore, gives +1 to attack tests.",
  },
  Short: {
    name: "Short",
    description:
      "The weapon can be drawn as a Free Action and can be used with the Feint ability.",
  },
  Flaming: {
    name: "Flaming",
    description:
      "The weapon glows and even sparks before bursting into flames when actively used. The weapon deals damage as usual, but the target starts to burn - dealing 1d4 damage for 1d4 turns, starting the turn after the initial hit. The fire is extinguished if the target uses a whole turn to roll on the ground and passes a Quick test.",
  },
  Unwieldy: {
    name: "Unwieldy",
    description:
      "The weapon is heavy or unbalanced in a way which makes it more difficult to swing and control during combat. An attack with the weapon requires a full turn; both the combat action and movement action are spent on the attack. In other words, the wielder cannot both attack and move during a single turn, but once he or she is in place it is possible to make an attack every turn.",
  },
  Massive: {
    name: "Massive",
    description:
      "The weapon makes other weapons look puny in comparison. The wielder has a second chance at the damage test; the damage die is rolled twice and the higher of the two outcomes is used. Note that this only applies to the damage die of the weapon, not of additional dice from abilities, powers and elixirs.",
  },
  Concealed: {
    name: "Concealed",
    description:
      "The item normally goes unnoticed, or is seen as something else than a protection or a weapon. If someone actively examines the owner/carrier, a test against [Discreet <- Vigilant] is rolled, otherwise it cannot be discovered. Other hidden items can be discovered at first glance with such a test.",
  },
  Hallowed: {
    name: "Hallowed",
    description:
      "The item is forged in hallowed fire and has extra power against corrupt creatures. A creature that is wounded must roll 1d20 over its total corruption value, or suffer +1d4 damage. When someone wearing Hallowed armor is hit by a successful attack, the attacker must roll 1d20 over its total corruption value; if the outcome is equal to or lower, the armor adds +1d4 protection against the attack. Thoroughly corrupt creatures always fail these tests, while beings with zero corruption always pass.",
  },
  Retributive: {
    name: "Retributive",
    description:
      "The armor is crafted with secret and retributive techniques that cause it to ooze acid. With each hit in melee combat, the attacker must pass a Quick test. If failed, the attacker is hit by an acid splash that deals 1d4 damage for 1d4 turns.",
  },
  Tackle: {
    name: "Tackle",
    description:
      "It is aimed at the target's legs or arms in order to hinder movement. Normally, it is thrown at the legs and the attack test is [Accurate &lt; Quick]; if the test succeeds, the target cannot move. It is harder to hit the arms of the target - this requires a passed [Accurate &lt; Quick+3] and if successful the target has a second chance to fail all success test involving the use of the arms. Removing the bolas counts as a combat action and requires a passed Quick test.",
  },
  Repeater: {
    name: "Repeater",
    description: "A weapon with repeater can reload as a free action.",
  },
  Ensnaring: {
    name: "Ensnaring",
    description:
      "a thin silk thread attached to the arrow make it possible to ensnare a target using this projectile. Pulling it out takes a movement action and requires a passed [Strong -Damage] test; if successful the target suffers 1d4 damage but the arrow is out. Moving around with a snaring arrow imbedded in one's flesh deals 1 damage per turn, ignoring armor.",
  },
  Snaring: {
    name: "Snaring",
    description:
      "A barbed arrowhead and a thin silk thread attached to the arrow make it possible to ensnare a target using this projectile. Pulling it out takes a movement action and requires a passed [Strong -Damage] test; if successful the target suffers 1d4 damage but the arrow is out. Moving around with a snaring arrow imbedded in one's flesh deals 1 damage per turn, ignoring armor.",
  },
  Stun: {
    name: "Stun",
    description:
      "After a successful hit, damage is rolled as usual, but the outcome is used to decide if the target is stunned [Strong -Damage]. If the target is stunned, he or she may not perform any kind of actions in the following turn.",
  },
  Cut: {
    name: "Cut",
    description:
      "A Y-shaped tip makes it possible to cut ropes. Hitting the rope is difficult (-5 on the attack test), but a success means that the rope is cut.",
  },
  Whistle: {
    name: "Whistle",
    description: "The arrow whistles while flying, as a signal to allies.",
  },
  Grapple: {
    name: "Grapple",
    description:
      "The arrow sends a grappling hook flying a maximum of ten vertical meters or thirty horizontal meters. A thin silk thread makes it possible to hoist a sturdier rope up to the grappling hook, and once this rope is latched onto the hook it can be used for climbing.",
  },
  "Blood-letting": {
    name: "Blood-letting",
    description:
      "The weapon causes wounds, open or internal, that bleed at a rate of 1 Toughness per turn. The bleeding starts on the turn after a damaging hit and the effect is cumulative: additional damaging hits increase the blood-letting effect by +1. First aid or other kinds of healing will stop the bleeding.",
  },
  "Bastard Weapon": {
    name: "Bastard Weapon",
    description:
      "The weapon can be wielded as One-hand or Two-hand, even if it only comes into its own when both hands are resting on the grip. The bastard weapon loses one or all of its qualities when used as One-hand, but can instead be combined with a shield, which may be preferable at times. Another upside is that it can be used while on horseback, wielded in one hand until the rider dismounts and can grip it in two.",
  },
  Returning: {
    name: "Returning",
    description:
      "The weapon is designed in a way so that a skilled user can make it return if an attack misses the target. A passed Accurate test is required, which counts as a free action.",
  },
  Recall: {
    name: "Returning",
    description:
      "As a free action, the master can recall the weapon, which will return it to its wielder's hand.",
  },
  "Area Effect (cone)": {
    name: "Area Effect (cone)",
    description:
      "The effect of the weapon affects an area and damages all who happen to be inside it. One test is made for each creature in the area; those who are hit suffer full damage while those who pass the Defense test suffer half damage. Ongoing secondary effects only affect those who suffer full damage from the initial effect. There are two types of Area Effects, radius and cone, and the former exist in two versions: Melee Range and Short.Melee Range Radius: 1–2 meters, meaning one creature and all others in its direct vicinity – those who are in melee combat with the target or who could be without having to spend a movement action.Short Radius: 10 meters, meaning all who are within a movement action from the targeted spot on the ground.Cone: Anyone present in front of the weapon is at risk of being hit when the weapon is fired. If movement by scale is used on a grid, the cone is as wide as the distance from the weapon. At melee range it is 1–2 meters wide, at short range it is approximately 10 meters wide, and at the maximum medium range it is about 20 meters wide.",
  },
  "Area Effect (radius)": {
    name: "Area Effect (cone)",
    description:
      "The effect of the weapon affects an area and damages all who happen to be inside it. One test is made for each creature in the area; those who are hit suffer full damage while those who pass the Defense test suffer half damage. Ongoing secondary effects only affect those who suffer full damage from the initial effect. There are two types of Area Effects, radius and cone, and the former exist in two versions: Melee Range and Short.Melee Range Radius: 1–2 meters, meaning one creature and all others in its direct vicinity – those who are in melee combat with the target or who could be without having to spend a movement action.Short Radius: 10 meters, meaning all who are within a movement action from the targeted spot on the ground.Cone: Anyone present in front of the weapon is at risk of being hit when the weapon is fired. If movement by scale is used on a grid, the cone is as wide as the distance from the weapon. At melee range it is 1–2 meters wide, at short range it is approximately 10 meters wide, and at the maximum medium range it is about 20 meters wide.",
  },
  Special: {
    name: "Special",
    description: "",
  },
  "Storage 3": {
    name: "Storage 3",
    description:
      "Increases the total number of items your character can carry by 2. Increases your daily food/water requirement by 1.",
  },
  "Storage 6": {
    name: "Storage 6",
    description:
      "Increases the total number of items your character can carry by 4. Increases your daily food/water requirement by 2.",
  },
  "Storage 9": {
    name: "Storage 9",
    description:
      "Increases the total number of items your character can carry by 6. Increases your daily food/water requirement by 3.",
  },
  "Storage 12": {
    name: "Storage 12",
    description:
      "Increases the total number of items your character can carry by 8. Increases your daily food/water requirement by 4.",
  },
  "Storage 15": {
    name: "Storage 15",
    description:
      "Increases the total number of items your character can carry by 10. Increases your daily food/water requirement by 5.",
  },
};
