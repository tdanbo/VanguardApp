import { AbilityStatic } from "../../Types";

export const abilities_content: Record<string, AbilityStatic> = {
  "Agile Combat": {
    novice: {
      description:
        "Allows splitting movement around a combat action for tactical positioning (Move-Attack-Move). Incurs Free Attacks if moving through enemy melee range.",
      action: "passive",
      roll: [],
    },
    adept: {
      description:
        "Enables weapon switching during a combat action. (E.g. Start Melee-Move-Swap to Ranged-Fire-Swap Back to Melee-Finish Move)",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Provides a reroll on Defense tests against Free Attacks when retreating from melee. Also, retaliates with a Free Attack after each provoked Free Attack, with weapon switching allowed for these counters.",
      action: "reaction",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["support"],
    category: "ability",
    tags: ["movement", "wpn switch", "reroll"],
  },
  "Armored Mystic": {
    novice: {
      description:
        "The Impeding quality of medium armors (not armor accesories) no longer affects [Resolute], but still affects [Accurate, Quick, Defense, Discreet].",
      action: "passive",
      roll: [],
    },
    adept: {
      description:
        "The Impeding quality of heavy armors (not armor accesories) no longer affects [Resolute], but still affects [Accurate, Quick, Defense, Discreet].",
      action: "upgrade",
      roll: [],
    },
    master: {
      description: "Increases armor roll by +5.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ability",
    tags: ["med armor", "hvy armor", "armor"],
  },
  "Arrow Jab": {
    novice: {
      description:
        "In response to a melee attack, the character can draw an arrow or bolt and stab an enemy. They must succeed with a normal attack roll, dealing 1d6 damage.",
      action: "reaction",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    adept: {
      description: "Similar to the novice level, but deals 1d8 damage.",
      action: "passive",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 8,
        },
      ],
    },
    master: {
      description:
        "If the jab attack hits, the character gains a Free Attack with the bow. After stabbing with the projectile, they can load the bow for a normal ranged attack. If using a crossbow, it must already be loaded or the initial stab made with another bolt, or the character should possess a repeating crossbow.",
      action: "reaction",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 8,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["ranged"],
    category: "ability",
    tags: ["counter", "damage", "free attack"],
  },
  "Axe Artist": {
    novice: {
      description:
        "Thrust with the axes Short-end, dealing 1d6 damage. Then test [Accurate < Resolute] to stun and gain an immediate Free Attack.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    adept: {
      description:
        "Lowers damage rolls by -2 but you can perfrom two attacks in a single combat action.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    master: {
      description:
        "Increases melee damage roll by +5 - this only applies to a single axe hit per combat action.",
      action: "passive",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["immobilize", "extra attack", "damage", "accurate"],
  },
  Backstab: {
    novice: {
      description:
        "Increases damage roll by +5 for one attack per turn when at advantage. Can use [Discreet] instead of [Accurate] when at Advantage.",
      action: "reaction",
      roll: [],
    },
    adept: {
      description:
        "Backstab now causes a bleeding wound, dealing 1d4 damage every turn until healed.",
      action: "passive",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 4,
        },
      ],
    },
    master: {
      description:
        "Increases damage roll by +9 and allows unlimited Backstabs per turn, provided Advantage conditions are met.",
      action: "passive",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 4,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["melee", "ranged"],
    category: "ability",
    tags: ["flank", "dot", "damage", "discreet"],
  },
  Berserker: {
    novice: {
      description:
        "Increases melee damage roll by +7 - but limits your maximum Defense to 5.",
      action: "free",
      roll: [],
    },
    adept: {
      description: "Increases armor by +5 - while frenzied.",
      action: "reaction",
      roll: [],
    },
    master: {
      description:
        "Now, the Defense attribute is no longer effected and reduced, still maintaining enhanced damage and damage resistance.",
      action: "passive",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["damage", "-armor", "defense"],
  },
  "Blood Combat": {
    novice: {
      description:
        "The character draws strength from the blood it spills. When his or her Toughness has been halved, the character gains a second chance to succeed with all attack tests in melee combat.",
      action: "passive",
      roll: [],
    },
    adept: {
      description:
        "Increases melee damage roll by +9 when toughness has been more than halved.",
      action: "passive",
      roll: [],
    },
    master: {
      description:
        "The warrior is healed by the blood spilled by the enemy; half of the damage that the character deals in melee combat is added to the character's Toughness, rounded down.",
      action: "reaction",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ability",
    tags: [],
  },
  Bodyguard: {
    novice: {
      description:
        "Test [Resolute] to absorb attacks directed at an ally. You cannot defend, but armor still applies.",
      action: "reaction",
      roll: [],
    },
    adept: {
      description: "Can now defend yourself as usual.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Gain riposte: Counter each melee attack on your protectee with a free attack against the assailant. This occurs for every attack made against them.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["support"],
    category: "ability",
    tags: ["redirect", "defense", "counter", "resolute"],
  },
  Channeling: {
    novice: {
      description:
        "Can choose to absorb temporary corruption meant for others within sight.",
      action: "reaction",
      roll: [],
    },
    adept: {
      description:
        "Gain a reroll on corruption tests, including when absorbing for others, choosing the more favorable outcome. At Master level, higher outcomes are better; otherwise, lower is preferable.",
      action: "reaction",
      roll: [],
    },
    master: {
      description:
        "Transfer any received corruption to another with a [Resolute\u2190Resolute] test. On a fail, suffer half the corruption (rounded up), the rest dissipates, affecting the surrounding environment negatively.",
      action: "reaction",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["arcana"],
    category: "ability",
    tags: ["resolute"],
  },
  "Cheap Shot": {
    novice: {
      description:
        "Make a head-butt or groin kick for 1d6 damage. If the target is damaged gain a free attack.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    adept: {
      description:
        "If a normal melee attack deals damage, can add a trip or tackle on the target. Test [Cunning < Quick] to knock the target down.",
      action: "reaction",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    master: {
      description:
        "After every melee attack on you, perform a counter attack. A succesful counter attack deal 1d6 damage ignoring armor.",
      action: "passive",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: [
      "free attack",
      "extra attack",
      "ignore armor",
      "damage",
      "immobilize",
      "cunning",
    ],
  },
  Dominate: {
    novice: {
      description:
        "In social situations can intimidate to force obedience and/or extract secrets. May use [Persuasive] instead of [Accurate] in melee combat.",
      action: "passive",
      roll: [],
    },
    adept: {
      description:
        "Test [Persuasive < Resolute] to make an enemy hesitate in melee combat. Will instead target your ally if possible.",
      action: "free",
      roll: [],
    },
    master: {
      description:
        "Test [Persuasive < Resolute] to subdue a target. They can be made to stand down, negotiate, flee or surrender. In combat, the enemy must be wounded to be subdued.",
      action: "active",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["single target", "persuasive"],
  },
  Ensnare: {
    novice: {
      description:
        "Gain a second chance to ensnare a target using a weapon with the ensnaring quality.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Also gains a second chance to bring down an ensnared enemy using an ensnaring weapon.",
      action: "passive",
      roll: [],
    },
    master: {
      description:
        "When using an ensnaring weapon, attacks hit the target's neck, causing a strangling effect. Besides ensnaring and the chance to bring down the enemy, the target suffers 1d6 damage per turn (ignoring armor). If the target reaches 0 Toughness, choose to make it unconscious instead of dead/dying.",
      action: "reaction",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["ranged"],
    category: "ability",
    tags: ["immobilize", "ignore armor", "reroll"],
  },
  Equestrian: {
    novice: {
      description:
        "Increases damage by +7 after a movement action while mounted. You also have the ability to handle, soothe and quieten animals.",
      action: "reaction",
      roll: [],
    },
    adept: {
      description:
        "Allows splitting Move Action for a melee attack, avoiding melee lock-in. Enemies can only respond with Reactions or by using their Movement Action.",
      action: "active",
      roll: [],
    },
    master: {
      description:
        "Increases the damage roll by +11 after a movement action while mounted.",
      action: "passive",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["movement", "damage"],
  },
  "Exceptionally Accurate": {
    novice: {
      description:
        "The character has cultured one of its Attributes through hard work, which increases the Attributes base stat by 1.",
      action: "special",
      roll: [],
    },
    adept: {
      description:
        "As novice, but the ability increases the Attributes base stat by 2.",
      action: "special",
      roll: [],
    },
    master: {
      description:
        "As novice, but the ability increases the Attributes base stat by 3.",
      action: "special",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ability",
    tags: ["accurate base stat"],
  },
  "Exceptionally Cunning": {
    novice: {
      description:
        "The character has cultured one of its Attributes through hard work, which increases the Attributes base stat by 1.",
      action: "special",
      roll: [],
    },
    adept: {
      description:
        "As novice, but the ability increases the Attributes base stat by 2.",
      action: "special",
      roll: [],
    },
    master: {
      description:
        "As novice, but the ability increases the Attributes base stat by 3.",
      action: "special",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ability",
    tags: ["cunning base stat"],
  },
  "Exceptionally Discreet": {
    novice: {
      description:
        "The character has cultured one of its Attributes through hard work, which increases the Attributes base stat by 1.",
      action: "special",
      roll: [],
    },
    adept: {
      description:
        "As novice, but the ability increases the Attributes base stat by 2.",
      action: "special",
      roll: [],
    },
    master: {
      description:
        "As novice, but the ability increases the Attributes base stat by 3.",
      action: "special",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ability",
    tags: ["discreet base stat"],
  },
  "Exceptionally Persuasive": {
    novice: {
      description:
        "The character has cultured one of its Attributes through hard work, which increases the Attributes base stat by 1.",
      action: "special",
      roll: [],
    },
    adept: {
      description:
        "As novice, but the ability increases the Attributes base stat by 2.",
      action: "special",
      roll: [],
    },
    master: {
      description:
        "As novice, but the ability increases the Attributes base stat by 3.",
      action: "special",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ability",
    tags: ["persuasive base stat"],
  },
  "Exceptionally Quick": {
    novice: {
      description:
        "The character has cultured one of its Attributes through hard work, which increases the Attributes base stat by 1.",
      action: "special",
      roll: [],
    },
    adept: {
      description:
        "As novice, but the ability increases the Attributes base stat by 2.",
      action: "special",
      roll: [],
    },
    master: {
      description:
        "As novice, but the ability increases the Attributes base stat by 3.",
      action: "special",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ability",
    tags: ["quick base stat"],
  },
  "Exceptionally Resolute": {
    novice: {
      description:
        "The character has cultured one of its Attributes through hard work, which increases the Attributes base stat by 1.",
      action: "special",
      roll: [],
    },
    adept: {
      description:
        "As novice, but the ability increases the Attributes base stat by 2.",
      action: "special",
      roll: [],
    },
    master: {
      description:
        "As novice, but the ability increases the Attributes base stat by 3.",
      action: "special",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ability",
    tags: ["resolute base stat"],
  },
  "Exceptionally Strong": {
    novice: {
      description:
        "The character has cultured one of its Attributes through hard work, which increases the Attributes base stat by 1.",
      action: "special",
      roll: [],
    },
    adept: {
      description:
        "As novice, but the ability increases the Attributes base stat by 2.",
      action: "special",
      roll: [],
    },
    master: {
      description:
        "As novice, but the ability increases the Attributes base stat by 3.",
      action: "special",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ability",
    tags: ["strong base stat"],
  },
  "Exceptionally Vigilant": {
    novice: {
      description:
        "The character has cultured one of its Attributes through hard work, which increases the Attributes base stat by 1.",
      action: "special",
      roll: [],
    },
    adept: {
      description:
        "As novice, but the ability increases the Attributes base stat by 2.",
      action: "special",
      roll: [],
    },
    master: {
      description:
        "As novice, but the ability increases the Attributes base stat by 3.",
      action: "special",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ability",
    tags: ["vigilant base stat"],
  },
  "Feat of Strength": {
    novice: {
      description:
        "Toughness now treated as [Strong +5]. Pain Threshold remains based on Strong/2.",
      action: "passive",
      roll: [],
    },
    adept: {
      description:
        "If your Toughness is half or less, gain a reroll on all [Strong] tests, including attacks.",
      action: "reaction",
      roll: [],
    },
    master: {
      description:
        "Increases melee damage roll by +5 when at half or less Toughness.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["support"],
    category: "ability",
    tags: ["damage", "strong", "reroll", "healing"],
  },
  Feint: {
    novice: {
      description:
        "When using a Short or Precise melee weapon, you may use [Discreet] instead of [Accurate]. These attacks gain the same Advantage as if the opponent was surprised.",
      action: "passive",
      roll: [],
    },
    adept: {
      description: "You may defend with [Discreet] instead of [Quick].",
      action: "passive",
      roll: [],
    },
    master: {
      description:
        "Following a melee combat action, test [Discreet < Vigilant] to surprise an enemy during combat and gain a Free Attack.",
      action: "reaction",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["defense", "discreet"],
  },
  Flailer: {
    novice: {
      description:
        "Jointed weapons gain the Ensnaring quality, allowing for ensnaring enemies instead of normal attacks.",
      action: "passive",
      roll: [],
    },
    adept: {
      description: "Increases the damage roll of jointed weapons by +2.",
      action: "passive",
      roll: [],
    },
    master: {
      description:
        "Perform consecutive strikes on all enemies in melee-range, separate attack rolls for each.",
      action: "active",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["damage", "immobilize", "multi target"],
  },
  "Hammer Rhythm": {
    novice: {
      description:
        "If a shield fails to defend your hammer attack, [Strong < Quick] test to shatter wooden shields and disarm metal ones. The strike deals 1d6 damage.",
      action: "reaction",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    adept: {
      description:
        "When an enemy successfully defends against a hammer attack, make a [Strong←Strong] test. If you succeed, the opponent is pushed back one step, allowing the hammer fighter to make a Free Attack.",
      action: "reaction",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    master: {
      description:
        "Launch two hammer attacks against the same target in one action. If either attack is defended, the master may perform a hammer ram as described at the adept level. The ram can only be executed once per action.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["damage", "strong", "extra attack", "free attack"],
  },
  "Hunter's Instinct": {
    novice: {
      description:
        "Upon attacking, designate a target. Gain rerolls to failed ranged attacks against it until it is defeated or the scene ends.",
      action: "special",
      roll: [],
    },
    adept: {
      description: "Increases ranged weapon damage by +5.",
      action: "passive",
      roll: [],
    },
    master: {
      description:
        "Receive a free ranged attack on designated targets whenever they move, with each movement action triggering an additional free attack.",
      action: "reaction",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["ranged"],
    category: "ability",
    tags: ["reroll", "damage", "free attack"],
  },
  "Iron Fist": {
    novice: {
      description: "May use Strong instead of Accurate for melee attacks.",
      action: "passive",
      roll: [],
    },
    adept: {
      description: "Increases melee damage roll by +5.",
      action: "passive",
      roll: [],
    },
    master: {
      description:
        "Can increase melee damage by +5, on a single attack once per turn. (This bonus is on top of the passive bonus from Adept).",
      action: "special",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["strong", "damage", "Each Turn"],
  },
  Acrobatics: {
    novice: {
      description:
        "Test [Quick] to avoid Free Attacks in melee combat caused by movement. If failed, choose between staying in place or moving and suffering a Free Attack.",
      action: "reaction",
      roll: [],
    },
    adept: {
      description:
        "When knocked down, Test [Quick] to jump back up as a Free Action. If failed, use Movement Action as normal.",
      action: "free",
      roll: [],
    },
    master: {
      description:
        "In combat with multiple opponents, use an enemy as a shield once per turn. Test [Quick] to make the enemy take the hit, no defense, armor still applies.",
      action: "reaction",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["support"],
    category: "ability",
    tags: ["movement", "quick", "immobilize"],
  },
  "Knife Play": {
    novice: {
      description:
        "May attack with [Quick] instead of Accurate when using short, knife-like weapons",
      action: "passive",
      roll: [],
    },
    adept: {
      description:
        "Execute two knife attacks on the same target per combat action. Twin Attack, makes it a total of three attacks: two main hand, one off-hand.",
      action: "passive",
      roll: [],
    },
    master: {
      description:
        "Knife damage initiates close quarters comabt, gaining rerolls on Defense tests against the opponent's weapons and disabling their Long weapons completely. To disengage the opponent must win next turn's initiative or attempt withdrawal, inviting a Free Attack on them that, if successful, reinstates CQC.",
      action: "reaction",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["quick", "extra attack"],
  },
  Leader: {
    novice: {
      description:
        "Can seize command over groups, organize militias, and similar tasks. May use Persuasive in place of Resolute. Corruption threshold unaffected.",
      action: "passive",
      roll: [],
    },
    adept: {
      description:
        "Nominate a target as a focus for allies. Allies increases damage roll by +5 when attacking the target. Changing target requires a new action.",
      action: "free",
      roll: [],
    },
    master: {
      description:
        "Deliver a rousing speech, allowing allies to use the Leader's Persuasive instead of their own Resolute for the entire scene.",
      action: "active",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["support"],
    category: "ability",
    tags: ["persuasive"],
  },
  "Man-at-Arms": {
    novice: {
      description: "Increases armor roll by +2.",
      action: "passive",
      roll: [],
    },
    adept: {
      description:
        "The Impeding quality of armors (not armor accesories) no longer affects [Accurate, Quick, Defense], but still affects [Resolute, Discreet].",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Test [Defense] to counteract effects that reduce or ignore armor value and have armor protect as normal. Impeding of (not armor accesories) now only effects [Resolute].",
      action: "reaction",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["support"],
    category: "ability",
    tags: ["armor", "quick", "ignore armor"],
  },
  "Mantle Dance": {
    novice: {
      description:
        "Passive. The character's mantle, or some similar sheet of cloth held in the hand, gives a +1 bonus to Defense.",
      action: "",
      roll: [],
    },
    adept: {
      description:
        "Active. The mantle strikes at the enemy's eyes, temporarily blinding the target if the attack roll is successful. The character immediately gains a Free Attack against the target, an attack that the enemy must defend against as if blinded. Everyone attacking the blind target can take advantage of the situation for the duration of one turn.",
      action: "",
      roll: [],
    },
    master: {
      description:
        "Active. In the master's hands, the mantle is like a whip with the quality Ensnaring, making it possible to use it to trap the target. See the quality Ensnaring on page 118 for details.",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ability",
    tags: [],
  },
  Marksman: {
    novice: {
      description: "Increases the damage roll of bows and crossbows by +2.",
      action: "passive",
      roll: [],
    },
    adept: {
      description:
        "Add a crippling effect to projectiles. If the target is hit they are immobilized and must use a movement action to make a [Strong < Accurate] test to move. On success, effect is gone.",
      action: "active",
      roll: [],
    },
    master: {
      description:
        "Grant a projectile armor-piercing capabilities, targeting a weak spot to bypass the target's Armor entirely.",
      action: "active",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["ranged"],
    category: "ability",
    tags: ["damage", "ignore armor", "immobilize"],
  },
  Medicus: {
    novice: {
      description:
        "Test [Cunning] to heal 1d4 Toughness once per patient per day. Increases the healing roll of herbal cures by +2 and gives you the ability to diagnose diseases, poisons and experience in examining crime scenes or bodies.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "healing",
          value: 4,
        },
      ],
    },
    adept: {
      description:
        "Test [Cunning] to heal 1d6 Toughness once per patient per day.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "healing",
          value: 6,
        },
      ],
    },
    master: {
      description:
        "Test [Cunning] to heal 1d8 Toughness once per patient per day - will still heal half the roll rounded up if you fail the cunning test.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "healing",
          value: 8,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["support"],
    category: "ability",
    tags: ["healing"],
  },
  "Natural Warrior": {
    novice: {
      description: "Increases damage roll by +2 while unarmed.",
      action: "passive",
      roll: [],
    },
    adept: {
      description:
        "Perform a double strike against a single target, with each attack rolled separately.",
      action: "active",
      roll: [],
    },
    master: {
      description: "Increases damage roll by +7 while unarmed.",
      action: "passive",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["damage", "extra attack"],
  },
  Opportunist: {
    novice: {
      description:
        "Gain a reroll on free attacks when an enemy retreats from melee.",
      action: "reaction",
      roll: [],
    },
    adept: {
      description:
        "Use an active ability during free attacks on retreating enemies, (forfeits Novice chance to reroll).",
      action: "reaction",
      roll: [],
    },
    master: {
      description:
        "Rerolls now also available on active ability free attacks used with the Adept ability.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["support"],
    category: "ability",
    tags: ["reroll"],
  },
  "Parry mastery": {
    novice: {
      description:
        "Passive. The character can precisely hit and deflect incoming attacks in close combat. The character may use Accurate as their basis for Defense in melee, as long as they are holding a melee weapon or have the Natural Warrior ability.",
      action: "",
      roll: [],
    },
    adept: {
      description:
        "Reaction. The character follows their parry with a twisting move designed to liberate their opponent of their weapon. After a successful Defense in melee, the character can roll [Accurate < Strong] to disarm their opponent (no effect on unarmed enemies).",
      action: "",
      roll: [],
    },
    master: {
      description:
        "Passive. The character displays an almost preternatural ability to ward off danger with their weapon. The character may use Accurate for Defense even against ranged attacks, as long as they are holding a melee weapon. If the character also has the Natural Warrior ability, a successful Defense means that they catch the projectile in the air.",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ability",
    tags: [],
  },
  "Polearm mastery": {
    novice: {
      description: "Increases the damage roll of long weapons by +2.",
      action: "passive",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 8,
        },
        {
          source: "base",
          type: "buff",
          value: 8,
        },
      ],
    },
    adept: {
      description:
        "Grants a Free Attack on all enemies entering melee range regardless of engagement. Excludes those wielding Long weapons.",
      action: "reaction",
      roll: [],
    },
    master: {
      description:
        "On successful hits from free attacks on enemies entering melee range, attackers are pushed back, even if no damage is caused. This forces the targets outside melee range, triggering free attacks once again if they try to re-engage",
      action: "passive",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["damage", "free attack"],
  },
  Pyrotechnics: {
    novice: {
      description:
        "[Accurate > Quick] to use Flash Powder in melee. Deals 1d4 damage ignoring armor and blinds for 1d4 turns.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 4,
        },
      ],
    },
    adept: {
      description:
        "Smoke Bomb: Covers all in two movement radius. If ranged throw test [Accurate]; melee no test. Smoke blinds and test [Strong] else 1d4 damage per turn, ignores armor.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 4,
        },
      ],
    },
    master: {
      description:
        "Throw Thunder Ball: Affects all in 5-meter radius with 1d12 damage (ignores armor) and blinds. Test [Accurate\u2194Quick] to halve damage and avoid blindness.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 12,
        },
        {
          source: "base",
          type: "buff",
          value: 4,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["support"],
    category: "ability",
    tags: ["ignore armor", "damage", "immobilize", "accurate", "duration"],
  },
  "Defense Draw": {
    novice: {
      description:
        "Free. With a successful die roll against Defense, the character may unsheathe and draw a weapon as a Free Action, thereby being able to use the weapon as if it was already drawn. The character can also reload a crossbow as a Free Action with a successful Defense Test.",
      action: "",
      roll: [],
    },
    adept: {
      description:
        "Free. With a successful Defense test, the character may switch weapons as a Free Action, meaning that the character can sheathe one weapon and draw another in one fluid motion.",
      action: "",
      roll: [],
    },
    master: {
      description:
        "Free. The character handles elixirs swiftly and may with a successful Defense test pour one dose down its own or someone else's throat as a Free Action.",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ability",
    tags: [],
  },
  "Rapid Fire": {
    novice: {
      description:
        "Sacrifice movement action to shoot two arrows in a single combat action. Arrows can target the same or different enemies.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Shooting two arrows in one combat action is now possible without sacrificing movement.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Ability enhanced to fire three arrows within a single combat action.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["ranged"],
    category: "ability",
    tags: ["extra attack", "movement", "triple attack"],
  },
  "Rapid Reflexes": {
    novice: {
      description:
        "When hit by effects that assess full or half damage (like alchemical grenades or Brimstone Cascade), full damage becomes half, and half becomes none. E.g. if Brimstone Cascade directly hits, it deals 1d6 damage instead of 1d12, and a miss results in no damage at all.",
      action: "reaction",
      roll: [],
    },
    adept: {
      description:
        "After successfully defending a melee attack, you can switch places with the attacker, avoiding a free attack. You become unflanked, and the enemy becomes flanked if you were next to an ally.",
      action: "reaction",
      roll: [],
    },
    master: {
      description:
        "Act first in turn order, unless facing foe with higher Quick or Vigilant stats and this ability.",
      action: "passive",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["support"],
    category: "ability",
    tags: ["movement", "quick", "vigiilant", "defense"],
  },
  "Quick Draw": {
    novice: {
      description:
        "Test [Quick] to draw weapons or reload crossbows as a free action.",
      action: "free",
      roll: [],
    },
    adept: {
      description:
        "Test [Quick] to seamlessly switch weapons as a free action.",
      action: "free",
      roll: [],
    },
    master: {
      description:
        "Test [Quick] to swiftly administer elixirs to self/others as a free action.",
      action: "free",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["support"],
    category: "ability",
    tags: ["quick"],
  },
  Recovery: {
    novice: {
      description:
        "Test [Resolute] to regain 1d4 toughness. Multiple attempts allowed, but success limited to once per day.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 4,
        },
      ],
    },
    adept: {
      description: "Now regains 1d6 toughness.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "healing",
          value: 6,
        },
      ],
    },
    master: {
      description: "Regain further increases to 1d8 toughness.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 8,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["support"],
    category: "ability",
    tags: ["healing"],
  },
  "Rune Tattoo": {
    novice: {
      description:
        "Activating your rune increases armor roll by +5. Each successful hit grants 1 temporary corruption per attack. This reaction must be made before armor rolls.",
      action: "reaction",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 5,
        },
      ],
    },
    adept: {
      description: "Heal 1 Toughness/turn, incur 1 temporary corruption/turn.",
      action: "free",
      roll: [],
    },
    master: {
      description:
        "Increases damage roll by +5, but grants 1 temporary corruption.",
      action: "reaction",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 5,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["arcana"],
    category: "ability",
    tags: ["healing", "damage", "armor", "defense"],
  },
  "Shield Fighter": {
    novice: {
      description:
        "When holding a shield in the offhand, increases wielded weapon damage by one tier to 1d10 (1d8 for Short weapons). Shield defense stat is increased by +1.",
      action: "passive",
      roll: [],
    },
    adept: {
      description:
        "Successful attacks can be followed by a 1d4 damage shield bash, which with a successful [Strong < Strong] test knocks down the target.",
      action: "reaction",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 4,
        },
      ],
    },
    master: {
      description: "Shield bash damage increased to 1d8.",
      action: "passive",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 4,
        },
        {
          source: "base",
          type: "buff",
          value: 8,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["defense", "immobilize", "damage", "strong"],
  },
  "Sixth Sense": {
    novice: {
      description:
        "Navigate unhindered in dim light. In complete darkness maintain direction at a quarter of normal speed. Use [Vigilant] instead of [Accurate] for ranged weapon attacks.",
      action: "passive",
      roll: [],
    },
    adept: {
      description:
        "Use [Vigilant] instead of [Quick] for Initiative and Defense.",
      action: "passive",
      roll: [],
    },
    master: {
      description:
        "Move and fight unhindered when blinded, in complete darkness, or against invisible enemies.",
      action: "passive",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["ranged"],
    category: "ability",
    tags: ["vigiilant", "defense"],
  },
  Sorcery: {
    novice: {
      description: "Test [Resolute] to reduce any corruption you recieve to 1.",
      action: "special",
      roll: [],
    },
    adept: {
      description:
        "Reroll a failed mystical power by rolling against your Total Corruption. Success activates the power but incurs 1d4 temporary corruption.",
      action: "special",
      roll: [],
    },
    master: {
      description:
        "Target a creature's Shadow (Resolute - Your Total Corruption) rather than Resolute to affect them with powers. Highly corrupted creatures are immune, as if drawing strength from darkness.",
      action: "special",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["arcana"],
    category: "ability",
    tags: ["resolute", "corruption"],
  },
  "Staff Fighting": {
    novice: {
      description:
        "+1 Defense bonus if using a long weapon, +2 with a wooden or rune staff due to better balance.",
      action: "passive",
      roll: [],
    },
    adept: {
      description:
        "If your attack is defended against, you gain a Free Attack using the back end of the Long weapon, dealing 1d6 damage. Additionally, if you have a wooden or rune staff, you can riposte after each successful Defense against a melee attack.",
      action: "reaction",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    master: {
      description:
        "Trip enemies with an initial attack ([Accurate < Quick] test), then follow up with a Free Attack at Advantage.",
      action: "active",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["defense", "counter", "immobilize", "accurate"],
  },
  "Staff Magic": {
    novice: {
      description:
        "Absorb all permanent corruption from existing and future Staff Magic rituals and Novice mystical powers. Reduces existing permanent corruption by (1d6) once. Temporary corruption still applies  Permanent corruption from Adept Staff Magic powers also absorbed. Gain rerolls on temporary corruption tests for Staff Magic powers. Activate an elemental rune (choose fire, lightning, cold, acid) to add (+1d4) damage to attacks or powers with the staff.",
      action: "special",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 6,
        },
        {
          source: "base",
          type: "buff",
          value: 4,
        },
      ],
    },
    adept: {
      description:
        "Permanent corruption from Adept Staff Magic powers also absorbed. Gain rerolls on temporary corruption tests for Staff Magic powers.",
      action: "special",
      roll: [],
    },
    master: {
      description:
        "Permanent corruption from Master Staff Magic powers absorbed. Also absorbs all temporary corruption from Staff Magic powers and rituals.",
      action: "special",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["arcana"],
    category: "ability",
    tags: [],
  },
  Steadfast: {
    novice: {
      description:
        "Make a second attempt on [Strong] or [Resolute] tests to break ongoing physical effects (traps, elixirs, or manifested mystical powers).",
      action: "reaction",
      roll: [],
    },
    adept: {
      description:
        "Now also applies to resist powers affecting mental will or senses.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Failed mental attacks against you (attacks modified by [Resolute]) now cause a counterattack of 1d6 damage to attacker (ignores Armor).",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["support"],
    category: "ability",
    tags: [
      "free attack",
      "ignore armor",
      "reroll",
      "resolute",
      "damage",
      "strong",
    ],
  },
  "Steel Throw": {
    novice: {
      description: "Throwing weapon base damage increased to 1d8.",
      action: "passive",
      roll: [],
    },
    adept: {
      description:
        "Perform a double throw with a throwing weapon, attacks can target the same or different enemies. Melee weapons can now also be thrown as a ranged attack, but only one per Action. Damage is based on the melee weapon's base damage and any relevant passive abilities.",
      action: "active",
      roll: [],
    },
    master: {
      description: "Now performs a triple throw.",
      action: "passive",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["ranged"],
    category: "ability",
    tags: ["damage", "extra attack"],
  },
  Strangler: {
    novice: {
      description:
        "Attack when at advantage, dealing 1d6 damage/turn ignoring armour. Ongoing, test [Cunning > Cunning] to maintain. Target immobilized until hold breaks.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    adept: {
      description:
        "Test [Cunning > Quick] to throw choking spores at a target. Deals 1d4 damage/turn, ignores armour for 1d4 turns.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 4,
        },
      ],
    },
    master: {
      description:
        "Throw a choking spore bomb filling an area, test [Cunning] for accuracy. Same effects as Adept, but affects all caught in the cloud of gas.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 6,
        },
        {
          source: "base",
          type: "buff",
          value: 4,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["support"],
    category: "ability",
    tags: ["multi target", "ignore armor", "damage", "cunning", "duration"],
  },
  "Strong Gift": {
    novice: {
      description:
        "Select a known power, ritual, trait, or ability, including those of bound artefacts; reduce temporary corruption incurred from its use to 1. Cannot select Strong Gift.",
      action: "special",
      roll: [],
    },
    adept: {
      description:
        "Corruption threshold increased to your full Resolute value. Blight born status now reached at Resolute x2.",
      action: "passive",
      roll: [],
    },
    master: {
      description:
        "Cast any mystical power from any tradition at novice level rolling with disfavor, incur 1d8 temporary corruption.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 8,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["arcana"],
    category: "ability",
    tags: ["resolute", "corruption"],
  },
  "Sword Saint": {
    novice: {
      description:
        "Increases fencing sword damage to 1d10 when used with a parrying dagger. Twin Attack does not increase this damage further.",
      action: "passive",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 8,
        },
        {
          source: "base",
          type: "buff",
          value: 8,
        },
      ],
    },
    adept: {
      description:
        "Following a successful Defense once per turn, a Free Attack is granted against the attacker.",
      action: "reaction",
      roll: [],
    },
    master: {
      description:
        "Allows unlimited Free Attacks after each successful Defense. Fencing sword damage now 1d12.",
      action: "passive",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 12,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["damage", "free attack"],
  },
  Symbolism: {
    novice: {
      description:
        "Craft a power rune in a symbol (1 hour, no corruption) with a limit of one prepared symbol per power. Recharging a used symbol takes the same amount of time.Create temporary symbols on surfaces bypassing the one symbol per power limit.Once per turn activate any symbol with a word or physical Activate a symbol with a phrase, costs 1 temporary trigger, costs 1 temporary corruption. Can also erase a symbol by touching it.corruption, must be in sight or touch.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Create temporary symbols on surfaces bypassing the one symbol per power limit.Once per turn activate any symbol with a word or physical Activate a symbol with a phrase, costs 1 temporary trigger, costs 1 temporary corruption. Can also erase a symbol by touching it.",
      action: "free",
      roll: [],
    },
    master: {
      description:
        "No limit on the number of pre-prepared symbols per power. Draw and activate flaming runes in the air as a single combat action.",
      action: "active",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["arcana"],
    category: "ability",
    tags: [],
  },
  Tactician: {
    novice: {
      description:
        "Analyze tactical approaches to identify strengths and weaknesses for offensive or defensive strategies. Can use [Cunning] instead of [Quick] for Initiative.",
      action: "passive",
      roll: [],
    },
    adept: {
      description: "Can use [Cunning] instead of Quick for Defense.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Can use [Cunning] instead of [Accurate] when attacking with anything but heavy weapons. If the battlefield has been analyzed before combat, you gain a +2 bonus to attacks. If you have discussed strategy with your allies they receive a +1 bonus to attack.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["support"],
    category: "ability",
    tags: ["cunning", "defense"],
  },
  Theurgy: {
    novice: {
      description:
        "No permanent corruption from learning Theurgy rituals and Novice mystical powers. Temporary corruption still applies.",
      action: "special",
      roll: [],
    },
    adept: {
      description:
        "No permanent corruption from learning Adept Theurgy powers. All Theurgy power and ritual temporary corruption reduced to 1.",
      action: "special",
      roll: [],
    },
    master: {
      description:
        "No permanent corruption from learning Master Theurgy powers. Gain a +5 to rolls of all mystical powers withtin the theurgy catergory.",
      action: "special",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["arcana"],
    category: "ability",
    tags: ["novice", "adept", "master", "healing"],
  },
  Trapper: {
    novice: {
      description:
        "Test [Cunning] to deploy or disarm mechanical traps. Or take a whole turn to build an improvised trap; which deals 1d6 damage.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    adept: {
      description:
        "Can now handle alchemical mines safely and improvised traps deal 1d8 damage.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 8,
        },
      ],
    },
    master: {
      description:
        "Enhance traps and mines by one tier (weak count as moderate, moderate as strong and strong gains a re-roll). Re-roll applies only to initial explosion for alchemical traps. In addition improvised traps now deal 1d10 damage.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 10,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["exploration"],
    category: "mystical power",
    tags: ["trap", "alchemical", "enhanced damage", "cunning"],
  },
  "Trick Archery": {
    novice: {
      description:
        "The character precisely targets an enemy (e.g. shooting a weapon from hand, nailing a body part to a surface, aiming for eyes to blind). On hit, intended effect occurs, costs target a combat action to deal with the effect.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Ricochet projectiles off surfaces to hit targets behind cover. Line of sight isn\u2019t necessary, but you must know (such as with the use of an ability) or be able to predict the target\u2019s location. Targets that move twice cannot be predicted.",
      action: "active",
      roll: [],
    },
    master: {
      description:
        "Once per turn, when an ally is targeted by a melee attack or when a physical projectile is aimed at you or an ally, test [Accurate < Quick] to shoot an arrow to deflect it.",
      action: "reaction",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["ranged"],
    category: "ability",
    tags: [],
  },
  "Troll Singing": {
    novice: {
      description:
        "No permanent corruption from learning Troll Songs, rituals and Novice powers. Temporary corruption still applies. Gain a reroll once per scene on tests to influence minds (using Resolute), excludes creating or maintaining mystical effects.",
      action: "special",
      roll: [],
    },
    adept: {
      description:
        "No permanent corruption from learning Adept Troll Songs and powers. Reroll now includes creating or maintaining mystical effects.",
      action: "special",
      roll: [],
    },
    master: {
      description:
        "No permanent corruption from learning Master Troll Songs orpowers. Lifts the once per scene limit on rerolls for mind-altering success tests, now gain a reroll in each instance.",
      action: "special",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["arcana"],
    category: "ability",
    tags: [],
  },
  "Twin Attack": {
    novice: {
      description:
        "You can perform two attacks while dual wielding. Make two attacks against the same target at 1d8 main and 1d6 offhand base damage.+1 to Defense if dual wielding.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 8,
        },
        {
          source: "base",
          type: "buff",
          value: 6,
        },
      ],
    },
    adept: {
      description: "Attacks now both deal 1d8.",
      action: "passive",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 8,
        },
      ],
    },
    master: {
      description: "Attacks now deal 1d10 main and 1d8 offhand respectively.",
      action: "passive",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 8,
        },
        {
          source: "base",
          type: "buff",
          value: 8,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["-damage", "damage", "extra attack", "defense"],
  },
  "Two-handed Finesse": {
    novice: {
      description:
        "Two-handed swords gain the Long when you wield them, benefitting from Polearm Mastery.",
      action: "passive",
      roll: [],
    },
    adept: {
      description:
        "Upon missing an attack, the character can immediately attempt a second strike using the weapon's returning swing. New attack made, at 1d8 base damage.",
      action: "reaction",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 8,
        },
      ],
    },
    master: {
      description:
        "Performs a chain of attacks, striking successive enemies within reach. Each hit allows an immediate attack on another enemy, continuing until a strike fails.",
      action: "active",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["multi target", "extra attack"],
  },
  "Two-handed Force": {
    novice: {
      description: "+2 to damage of Heavy Weapons. ",
      action: "passive",
      roll: [],
    },
    adept: {
      description:
        "Missed attacks can be followed by a second attempt with the hilt, dealing 1d8 base damage.",
      action: "reaction",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 8,
        },
      ],
    },
    master: {
      description: "Make an attack that ignores targets armour.",
      action: "active",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: ["damage", "free attack", "ignore armor"],
  },
  Witchcraft: {
    novice: {
      description:
        "No permanent corruption from learning Witchcraft rituals and Novice mystical powers. Temporary corruption still applies.",
      action: "special",
      roll: [],
    },
    adept: {
      description:
        "No permanent corruption from learning Adept Witchcraft powers. All Witchcraft power and ritual temporary corruption reduced to 1.",
      action: "special",
      roll: [],
    },
    master: {
      description:
        "No permanent corruption from learning Master Witchcraft powers.",
      action: "special",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["arcana"],
    category: "ability",
    tags: [],
  },
  Wizardry: {
    novice: {
      description:
        "No permanent corruption from learning Theurgy rituals and Novice mystical powers. Temporary corruption still applies.",
      action: "special",
      roll: [],
    },
    adept: {
      description:
        "No permanent corruption from learning Adept Wizardry powers. All Wizardry power and ritual temporary corruption reduced to 1.",
      action: "special",
      roll: [],
    },
    master: {
      description:
        "No permanent corruption from learning Master Wizardry powers. May re-roll one failed test per turn when attempting to chain magic.",
      action: "special",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["arcana"],
    category: "ability",
    tags: [],
  },
  Wrestling: {
    novice: {
      description:
        "Wrestle target; successful attacks grip enemies, allowing a throw (1d4 damage, ignores armor, knocks down) or grip (immobilizes enemy, both you and them are at disadvantage). Test [Strong < Strong] each turn to maintain grip.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 4,
        },
      ],
    },
    adept: {
      description:
        "After defending a melee attack, test [Quick < Strong] to throw an attacker as in Novice ability, also knocking them out for a turn, unable to perform active actions.",
      action: "reaction",
      roll: [],
    },
    master: {
      description:
        "Now throws before the attack (if throw fails, then test defense as normal). Damage increased to 1d6 and grants a free attack.",
      action: "passive",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["melee"],
    category: "ability",
    tags: [
      "quick",
      "ignore armor",
      "extra attack",
      "damage",
      "immobilize",
      "strong",
      "duration",
    ],
  },
  "Survival Instinct": {
    novice: {
      description:
        "Free. Thanks to its explosive survival instinct, the character may perform one extra Movement Action once per scene.",
      action: "free",
      roll: [],
    },
    adept: {
      description: "Increases armor roll by +5",
      action: "passive",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 4,
        },
      ],
    },
    master: {
      description:
        "Free. There resides a powerful fighting spirit within each member of the character's race, and that spirit can show itself when the character is backed into a corner. The character has nurtured this hot-tempered aggression and may sacrifice a Movement Action once per scene to perform an extra Combat Action.",
      action: "free",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ability",
    tags: [],
  },
  Provocative: {
    novice: {
      description:
        "Free. With a successful [Resolute < Cunning] roll get an enemy unduly provoked, allowing a second chance to succeed in all Defense and resistance rolls against this enemy. Only one target at a time may be thrown off in this way. The effect persists for the rest of the battle without further rolls, but if you want to provoke another enemy this will require a new roll.",
      action: "",
      roll: [],
    },
    adept: {
      description:
        "Free. Your ability to infuriate the enemy gives them not only a second chance to successfully roll Defense and resistances but the enemy also becomes careless to incoming attacks; a successful [Resolute < Cunning] roll gives you a second chance to succeed with attack rolls against the offended enemy. This in addition to the effects of Level I, against one enemy at a time and for the rest of battle unless you want to change the target of their heckling.",
      action: "",
      roll: [],
    },
    master: {
      description:
        "Active. You can bring an entire group of enemies off balance with a successful [Cunning] roll. This turns all the enemies vermilion with unreasoning anger and you get a second chance on Defense and resistance, as well as attack, rolls against all affected enemies for the rest of the battle.",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ability",
    tags: [],
  },
};
