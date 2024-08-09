import { AbilityStatic } from "../../Types";

export const mystical_powers_content: Record<string, AbilityStatic> = {
  Anathema: {
    novice: {
      description:
        "Test [Resolute < Resolute] to disperse a power's ongoing effects on a target or the mystic itself (if capable of magic). The opposing mystic's Resolute acts as resistance.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Now can disperse effects on multiple targets, with tests made sequentially for each target.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Can dispel all mystical effects, including those from summoned effects and creatures, with a successful [Resolute] test.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy", "wizardry"],
    category: "mystical power",
    tags: ["resolute", "multi target", "single target"],
  },
  Silence: {
    novice: {
      description:
        "Reaction. As a reaction to a successfully cast spell or ongoing effect, and by making a successful roll against [Resolute < Resolute], the Mystic deals 1d4 temporary corruption to the caster.",
      action: "",
      roll: [],
    },
    adept: {
      description:
        "Reaction. The same as Novice, but the ongoing effect is dispersed or the spell is countered.",
      action: "",
      roll: [],
    },
    master: {
      description:
        "Reaction. The same as Adept, but the target is also disarmed. Look at the disarm rules.",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "mystical power",
    tags: [],
  },
  "Banishing Seal": {
    novice: {
      description:
        "On seal creation choose from the following type Beasts, Abominations, Cultural Beings or Undead. On release Test [Resolute\u2190Resolute] to banish nearest target of chosen type. Continues in chain effect until test fails. Banished must leave and can't return until scene ends.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Failed banishings now deal 1d4 damage, ignoring Armor, affected may choose to flee to avoid damage, can't return til scene end.",
      action: "upgrade",
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
        "Damage increases to 1d8, and those that flee now still take 1d4.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 4,
        },
        {
          source: "base",
          type: "damage",
          value: 8,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["symbolism"],
    category: "mystical power",
    tags: ["banish", "damage", "enhanced damage", "resolute"],
  },
  "Bend Will": {
    novice: {
      description:
        "Test [Resolute < Resolute] to control target creature. Controlled target can only use 1 action/turn and cannot use active abilities or powers. [Resolute < Resolute] test each turn maintains effect. Failing concentration ends effect.",
      action: "active",
      roll: [],
    },
    adept: {
      description: "No longer requires concentration.",
      action: "passive",
      roll: [],
    },
    master: {
      description:
        "Controlled target now has 2 actions/turn and can utilize abilities and powers.",
      action: "passive",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery", "wizardry, witchcraft"],
    category: "mystical power",
    tags: ["resolute", "single target", "duration"],
  },
  "Black Bolt": {
    novice: {
      description:
        "Test [Resolute < Quick], deal 1d6 damage ignoring Armor, ensnaring targets. Trapped targets cannot act, may test [Resolute] each turn to escape. Failing concentration ends all snares. Cannot cast another bolt if a target is already trapped.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 6,
        },
      ],
    },
    adept: {
      description:
        "Can now strike multiple targets in a chain effect with each hit until you miss. If one trapped enemy escapes, all do.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 6,
        },
      ],
    },
    master: {
      description: "Ensnared targets must escape individually.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 6,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "mystical power",
    tags: ["ignore armor", "multi target", "immobilize", "resolute"],
  },
  "Black Breath": {
    novice: {
      description:
        "If you are permanently corrupt you can spew darkness at a target. They roll 1d4 against their total corruption. If the roll \u2264 total corruption, it heals equal to the roll; if the roll > total corruption, they suffer that much temporary corruption.",
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
      description: "Increases the roll to 1d6.",
      action: "passive",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 6,
        },
      ],
    },
    master: {
      description:
        "Can now strike multiple targets in a chain effect causing temporary corruption until a target is healed by the effect.",
      action: "passive",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "mystical power",
    tags: ["multi target", "corruption", "single target", "damage", "healing"],
  },
  "Blessed Shield": {
    novice: {
      description:
        "Test [Resolute] to create a mystical shield. Gain +5 to armor and deal 1d4 damage (ignoring armor) to any abomination or undead attacking the mystic in melee. Shield lasts until the end of the scene.",
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
        "Enhance armor to +7 and the retaliatory damage is now 1d6. An ally within sight can also be shielded.",
      action: "upgrade",
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
        "Armor is now +9 and retaliation damage now 1d8 and can include two allies in the shield's protection.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 8,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "mystical power",
    tags: ["armor", "counter", "damage"],
  },
  "Blinding Symbol": {
    novice: {
      description:
        "Triggering emits bright light affecting the nearest target. Test [Resolute\u2190Resolute] to blind target, continues in chain effect until test fails. Blinding lasts for one turn. Effect can be ended with Eye Drops.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Blinding effect can now be maintained with a [Resolute] test each turn. Concentration loss ends effect.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "The blindness is now more permanent, victims must recover Toughness through healing powers or elixirs before they see again.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["symbolism"],
    category: "mystical power",
    tags: ["blind", "maintained effect", "permanent effect", "resolute"],
  },
  "Brimstone Cascade": {
    novice: {
      description:
        "Project fire at a target. A successful [Resolute < Quick] test deals 1d12 damage; failure results in 1d6 damage.",
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
          value: 6,
        },
      ],
    },
    adept: {
      description:
        "Can now chain the fire to another target with each consecutive successful [Resolute < Quick] test, until a test fails.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 12,
        },
        {
          source: "base",
          type: "buff",
          value: 6,
        },
        {
          source: "base",
          type: "buff",
          value: 12,
        },
      ],
    },
    master: {
      description:
        "The cascade now continues even after a failed test, until a second test fails.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 12,
        },
        {
          source: "base",
          type: "buff",
          value: 6,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "mystical power",
    tags: ["resolute", "damage", "multi target", "single target"],
  },
  "Combat Hymn": {
    novice: {
      description:
        "Sing to enhance combat ability of you and your allies, gain +1 bonus to [Quick], [Strong], or [Accurate] (chosen by each individual). Effect ends if song stops, if another mystical power is used or loses concentration.",
      action: "free",
      roll: [],
    },
    adept: {
      description:
        "+1 bonus now applies to all three stats, Quick, Strong, and Accurate.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Once per scene, when the song begins individuals recover 1d6 toughness.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 6,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["troll singing"],
    category: "mystical power",
    tags: ["buff", "enhanced buff", "healing", "quick", "strong", "accurate"],
  },
  Confusion: {
    novice: {
      description:
        "Test [Resolute < Resolute] to confuse an enemy. Each turn roll 1d6 to determine effect: 1-2, target is inactive; 3-4, attacks its nearest ally; 5-6, attacks its nearest enemy. [Resolute < Resolute] test each turn maintains effect. Failing concentration ends effect.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 6,
        },
      ],
    },
    adept: {
      description: "Concentration is no longer required.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Can now confuse multiple targets in chain effect with successive [Resolute < Resolute] tests. Only a single test is needed each turn to maintain all effects.",
      action: "active",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "mystical power",
    tags: [
      "multi target",
      "single target",
      "resolute",
      "immobilize",
      "duration",
    ],
  },
  Curse: {
    novice: {
      description:
        "Once/turn curse an enemy within line of sight. Cursed targets get a second chance to fail all success tests against the Mystic. [Resolute] test each turn maintains effect.",
      action: "free",
      roll: [],
    },
    adept: {
      description:
        "Cursed targets' second chance to fail all success tests now apply to Mystic's allies as well.",
      action: "passive",
      roll: [],
    },
    master: {
      description:
        "Inflict a death curse on an enemy. Each action they take causes 1d6 damage, ignoring Armor. No effect if they remain inactive. [Resolute] test each turn maintains effect.",
      action: "active",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery", "witchcraft"],
    category: "mystical power",
    tags: ["reroll", "single target", "ignore armor", "duration", "resolute"],
  },
  "Dancing Weapon": {
    novice: {
      description:
        "Control a weapon with thought. Use [Resolute] for attack and defense. Cannot use other powers or abilities during effect. Weapon maintains its inherent qualities. Cannot use melee combat abilities during power.",
      action: "active",
      roll: [],
    },
    adept: {
      description: "Can now use powers and abilities (excluding melee).",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Weapon now automatically engages and no longer requires an action.",
      action: "free",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["staff magic", "troll singing"],
    category: "mystical power",
    tags: ["weapon control", "enhanced control", "auto engagement", "resolute"],
  },
  "Draining Glyph": {
    novice: {
      description:
        "Trigger affects enemies within sight of the glyph. Enemies each test [Resolute > Strong], dealing 1d4 damage, ignore Armor. Effect maintained with a [Resolute] test each turn. Concentration loss ends effect.",
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
      description: "Concentration no longer required.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Added ability to heal the mystic or ally for 1d4 Toughness/turn from the drained life-force of enemies.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "healing",
          value: 4,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["symbolism"],
    category: "mystical power",
    tags: ["area effect", "damage", "healing", "resolute", "strong"],
  },
  "Entangling Vines": {
    novice: {
      description:
        "Test [Resolute] to ensnare a target. Ensnared targets are limited to only ranged abilities. Targets may attempt to escape the vines with a [Resolute > Strong] test each turn.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Can now ensnare multiple targets in chain effect with successive [Resolute] tests.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description: "Ensnared targets now take 1d6 damage/turn ignoring armor.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 6,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "mystical power",
    tags: ["immobilize", "multi target", "ignore armor", "resolute", "strong"],
  },
  Exorcize: {
    novice: {
      description:
        "Test [Resolute < Resolute], banish target to the Yonderworld for one turn. Failed test summons a daemon. Targets in Yonderworld take 1d4 damage, ignoring Armor and 1d4 temporary corruption each turn they are trapped.",
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
        "Effect now ongoing, targets must now test [Resolute] each turn to return. If banish fails can prevent daemon with [Resolute] test. For each turn rift is open, must test [Resolute] to stop daemon summons.",
      action: "passive",
      roll: [],
    },
    master: {
      description:
        "Once per turn when attacked in melee. Test [Resolute < Resolute] to banish attacker to Yonderworld for 1 turn. Failing test does not summon a daemon.",
      action: "reaction",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "mystical power",
    tags: [
      "corruption",
      "ignore armor",
      "single target",
      "resolute",
      "duration",
    ],
  },
  "Fire Soul": {
    novice: {
      description:
        "Increases armor roll by +7 against fire damage. Flames retaliate against melee attackers.",
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
      description: "Retaliatory and protective effects increase to 1d10.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 10,
        },
      ],
    },
    master: {
      description:
        "Immune to fire and convert half of potential fire damage to heal Toughness. Retaliatory flames now effect ranged attackers. Does not react to purely mental powers.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "mystical power",
    tags: ["damage", "armor", "free attack", "healing"],
  },
  "Flame Wall": {
    novice: {
      description:
        "Summon a linear wall of flame at melee range: requires two movements to go around, one to fly over. Blocks flammable projectiles, inflicts 1d12 fire damage to anyone caught in flame. Can be placed atop enemies. [Resolute] test each turn maintains effect.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 12,
        },
      ],
    },
    adept: {
      description:
        "Flames can now be shaped into a circle around the mystic and allies at melee range.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 12,
        },
      ],
    },
    master: {
      description:
        "Walls can now form a burning dome, protecting or enclosing the mystic and allies.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 12,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "mystical power",
    tags: ["resolute", "damage", "duration"],
  },
  "Heroic Hymn": {
    novice: {
      description:
        "Sing to enhance the courage and vigor of you and your allies, gain +1 bonus to Cunning, Resolute or Persuasive (chosen by each individual). Effect ends if song stops, if another mystical power is used or loses concentration.",
      action: "free",
      roll: [],
    },
    adept: {
      description:
        "+1 bonus now applies to all three stats, Cunning, Resolute or Persuasive.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Once per scene, when the song begins reduce temporary corruption of individuals by 1d4.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 4,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["troll singing"],
    category: "mystical power",
    tags: [
      "buff",
      "enhanced buff",
      "corruption reduction",
      "cunning",
      "resolute",
      "persuasive",
    ],
  },
  "Holy Aura": {
    novice: {
      description:
        "Test [Resolute] to create a holy aura that damages abominations and undead within sight for 1d6 points, ignoring Armor. [Resolute] test each turn maintains effect. Failing concentration ends effect.",
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
        "Damage increased to 1d8. Also, living creatures within sight now heal 1d4 Toughness each turn.",
      action: "upgrade",
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
        "Damage to abominations and undead further increases to 1d10. Living allies now heal 1d6 points of Toughness each turn.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 10,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "mystical power",
    tags: ["undead", "healing", "damage", "resolute"],
  },
  "Illusory Correction": {
    novice: {
      description:
        "Test [Resolute] once per turn to potentially revise reality, allowing a re-roll of a failed Defense test.",
      action: "reaction",
      roll: [],
    },
    adept: {
      description:
        "Can now reroll any test that affected you and surpass the once per turn limit.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description: "Can now also re-roll tests for others.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "mystical power",
    tags: ["resolute", "reroll", "defense"],
  },
  "Inherit Wound": {
    novice: {
      description:
        "Test [Resolute] to transfer 1d6 damage from a target to yourself, healing them equivalently.",
      action: "free",
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
        "Now transfers 1d8 Toughness and also absorbs poison and bleeding and you only suffer half the transferred damage.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "healing",
          value: 8,
        },
      ],
    },
    master: {
      description:
        "A target in sight takes the untransferred half of the damage ignoring armor.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 8,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["theurgy", "witchcraft"],
    category: "mystical power",
    tags: ["healing", "poison", "ignore armor", "resolute"],
  },
  "Larvae Boils": {
    novice: {
      description:
        "Plant larvae in an enemy's body, causing 1d4 damage each turn, ignoring Armor. [Resolute < Strong] test each turn maintains effect.",
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
      description: "Now causes 1d6 damage each turn.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 6,
        },
      ],
    },
    master: {
      description: "Damage increases to 1d8 each turn.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 8,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["sorcery", "witchcraft"],
    category: "mystical power",
    tags: ["ignore armor", "damage", "damage", "resolute"],
  },
  "Lay on Hands": {
    novice: {
      description:
        "Test [Resolute] to heal 1d6 points of a target's Toughness through touch. This ability can be used on the mystic itself.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "healing",
          value: 6,
        },
      ],
    },
    adept: {
      description:
        "Now heals 1d8 points of Toughness and stops ongoing effects of poisons and bleeding.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "healing",
          value: 8,
        },
      ],
    },
    master: {
      description:
        "Can now heal a creature within sight. If touching the target, heal increases to 1d12.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "healing",
          value: 12,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["theurgy", "witchcraft"],
    category: "mystical power",
    tags: ["healing", "poisons", "range"],
  },
  Levitate: {
    novice: {
      description:
        "Test [Resolute] to levitate, can move 1 stride per turn, immune to melee but vulnerable to ranged/flying attacks. Concentration fail ends effect forcing a fall, causing 1d6 damage ignoring armor.",
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
        "Test [Resolute < Strong] to levitate an ally. Same conditions and limitations as self-levitation apply.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 6,
        },
      ],
    },
    master: {
      description:
        "Can now levitate self and a chain of allies in a single action. Same conditions and limitations as previously mentioned.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy", "wizardry"],
    category: "mystical power",
    tags: ["resolute", "multi target", "ignore armor", "duration"],
  },
  Lifegiver: {
    novice: {
      description:
        "Heal 1d4 temporary corruption from target, excess heals Toughness. Can target self.",
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
        "Now all allies and self in sight are healed in a single action.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "healing",
          value: 4,
        },
      ],
    },
    master: {
      description:
        "If an ally in sight uses an artifact or mystical power, the corruption suffered is reduced by 1d4. Excess reduction grants no benefit.",
      action: "reaction",
      roll: [
        {
          source: "base",
          type: "healing",
          value: 4,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "mystical power",
    tags: ["multi target", "single target", "healing", "-corruption"],
  },
  "Mind-throw": {
    novice: {
      description:
        "Test [Resolute < Quick] to hurl an object to deal 1d8 damage.\nOr use an object as a shield. Test [Resolute < Accurate] for physical attacks, [ < Resolute] for magic attacks. Object is destroyed after 1 block/hit.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 8,
        },
      ],
    },
    adept: {
      description:
        "Test [Resolute < Strong] to lift and throw an enemy, causing 1d8 damage. Target lands a Movement Action away, and tests [Quick] else lands prone on their back.",
      action: "active",
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
        "Throw multiple targets in chain effect with successive [Resolute < Strong] tests until fail.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 8,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "mystical power",
    tags: ["multi target", "single target", "resolute", "damage", "defense"],
  },
  Mirroring: {
    novice: {
      description:
        "Test [Resolute] to create 1d4 mirror copies of yourself. Each illusion has a chance to be hit instead of you. If a copy is hit, it is destroyed. Area effects cause direct damage to the mystic and eliminate all mirror copies.",
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
        "Now creates 1d6 copies. Damage from area effects still hits the mystic but only destroys one mirror copy.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 6,
        },
      ],
    },
    master: {
      description:
        "If the mystic is successfully hit by an attack or spell, they can swap places with one of the mirror copies before damage is dealt. No damage is shared between the mirrors and the caster.",
      action: "free",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 8,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "mystical power",
    tags: ["resolute", "defense"],
  },
  "Nature's Embrace": {
    novice: {
      description:
        "Test [Resolute] to sink into the earth, becoming invulnerable but unable to act. [Resolute] test each turn to maintain effect; failure returns the mystic to the surface.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "[Resolute] test no longer required to maintain effect and can use mystical powers on self.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Can now also move underground to reappear elsewhere and use powers on allies and see them through the earth.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "mystical power",
    tags: ["invulnerable", "self buff", "movement", "resolute"],
  },
  "Prios' Burning Glass": {
    novice: {
      description:
        "Test [Resolute] to direct holy light, inflicting 1d6 damage, 1d8 against abominations/undead.",
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
          value: 8,
        },
      ],
    },
    adept: {
      description:
        "Now effects all visible enemies, dealing 1d8 damage or 1d12 to abominations/undead.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 8,
        },
        {
          source: "base",
          type: "buff",
          value: 12,
        },
      ],
    },
    master: {
      description:
        "Now all corrupt/undead enemies are stunned for a turn with a successful [Resolute < Resolute] test.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 8,
        },
        {
          source: "base",
          type: "buff",
          value: 12,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "mystical power",
    tags: ["multi target", "single target", "resolute", "damage", "immobilize"],
  },
  "Protective Runes": {
    novice: {
      description:
        "Increases armor roll by +5. Effect maintained with a [Resolute] test each turn. Concentration loss ends effect.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Runes now add a retaliation effect, dealing 1d4 damage, ignoring armor, to each enemy whenever they cause you harm.",
      action: "upgrade",
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
        "Increases both protective and retaliatory effects to 1d6. Concentration no longer required.",
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
    tradition: ["symbolism", "staff magic"],
    category: "mystical power",
    tags: ["armor", "retaliation", "enhanced effect", "resolute"],
  },
  "Psychic Thrust": {
    novice: {
      description: "During a melee attack, gain a second chance to succeed.",
      action: "reaction",
      roll: [],
    },
    adept: {
      description:
        "Can now also test [Resolute < Resolute] on the attack to have it automatically hit.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "If the attack automatically hits, it also deals 1d4 damage ignoring armor.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 4,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["mentalist"],
    category: "mystical power",
    tags: ["resolute", "damage", "ignore armor", "reroll"],
  },
  Purgatory: {
    novice: {
      description:
        "Target tests [Resolute < Temporary Corruption] or get incapacitated for a turn and receive 1d4 damage ignoring armour.",
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
      description: "All enemies in sight now affected.",
      action: "upgrade",
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
        "If an enemy takes corruption, you may deal an equal amount of physical damage to them, ignoring armor.",
      action: "reaction",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "mystical power",
    tags: [
      "multi target",
      "free attack",
      "corruption",
      "ignore armor",
      "single target",
      "damage",
    ],
  },
  Retribution: {
    novice: {
      description:
        "Test [Resolute < Resolute] to curse a target, all attacks against them gain a re-roll for the scene. One enemy at a time, cursing a new target, removes the old curse.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "When damaged, test [Resolute < Resolute] to create a death link with the attacker, mirroring all received damage to them. Only one link at a time; can switch to another. Pain Threshold calculated individually. Link ends if you die; the fatal attack's damage isn\u2019t mirrored.",
      action: "reaction",
      roll: [],
    },
    master: {
      description:
        "Can now bind multiple attackers with death links simultaneously, with no limit to number of links.",
      action: "passive",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery", "troll singing"],
    category: "mystical power",
    tags: ["resolute", "multi target", "single target", "duration"],
  },
  "Mark of Torment": {
    novice: {
      description:
        "Triggering induces severe stomach pain affecting the nearest target. Test [Resolute < Resolute] to prevent target from taking any active actions for 1 turn, continues in chain effect until test fails.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Victims now also roll disfavour on reactive actions (i.e. Defense).",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Escalates pain to cause physical damage, dealing 1d6 to Toughness (ignores Armor).",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 6,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["symbolism"],
    category: "mystical power",
    tags: ["stun", "disfavour", "damage", "resolute"],
  },
  "Revenant Strike": {
    novice: {
      description: "Increases damage roll by +5, until next rest.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Enemies defeated by the weapon resurrect as loyal Dragouls on the next turn, returning to true death when the scene concludes.",
      action: "reaction",
      roll: [],
    },
    master: {
      description:
        "Increases damage roll by +9, now activates as a free action.",
      action: "free",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "mystical power",
    tags: ["damage", "duration"],
  },
  Shapeshift: {
    novice: {
      description:
        "Test [Resolute] to transform into a small beast (mammal or reptile). Retains Attributes but gains re-rolls on Discreet and Quick tests. No Free Attacks from enemies. Test [Resolute] to revert. Counts as a beast. If targeted by beast effecting powers can revert instead.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Can become a battle beast (e.g., wild boar, wolf), retaining mystic's Attributes and gaining Armored I and Natural Weapon I.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Now transforms into a superior battle beast, adding Regeneration (I) and Robust (I) as well.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "mystical power",
    tags: [
      "beast form",
      "battle beast",
      "superior beast",
      "resolute",
      "discreet",
      "quick",
    ],
  },
  "Battle Symbol": {
    novice: {
      description:
        "Triggers a berserk rage in the nearest target. Test [Resolute\u2190Resolute] to compel the affected to attack the nearest being, ally or enemy for 1 turn. Continues in chain effect until test fails.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Effect now maintained with a [Resolute] test each turn. Concentration loss ends effect.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Enhances effect, leaving the enraged unable to defend; attacks against them automatically succeed.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["symbolism"],
    category: "mystical power",
    tags: ["berserk", "maintained effect", "defense debuff", "resolute"],
  },
  Sphere: {
    novice: {
      description:
        "Rapidly spin a melee weapon to create a spherical shield. Defend with [Resolute] instead of [Quick] against melee/ranged attacks. No protection against mystical powers and area effects. Only basic movement for the duration of the effect. Effect ends by choice, if another power is used or if dispelled by Anathema.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Now automatically succeed all melee/ranged attack defense tests.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Now forms sphere hands free, can use non-combat actions (e.g., elixir, bandaging) and also include an ally within. Cannot interact outside the sphere, can maintain already active mystical effects.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["staff magic"],
    category: "mystical power",
    tags: ["shield", "automatic defense", "buff ally", "resolute", "quick"],
  },
  "Spirit Walk": {
    novice: {
      description:
        "Test [Resolute], you can move in spirit form, can pass through solid objects and enemies. Only harmed by mystical powers or artifacts for half damage. Movement is the only action.",
      action: "movement",
      roll: [],
    },
    adept: {
      description:
        "Upon being attacked, may test [Resolute - Damage] instead of Defense to temporarily enter spirit form, negating the attack's damage. Mystical powers and artifacts still inflict half damage.",
      action: "reaction",
      roll: [],
    },
    master: {
      description:
        "Test [Resolute] to make an attack temporarily in spirit form, bypassing enemy Armor.",
      action: "reaction",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "mystical power",
    tags: ["movement", "ignore armor", "defense", "resolute"],
  },
  "Staff Projectile": {
    novice: {
      description:
        "Throw staff, may use [Resolute] instead of [Accurate]. Deals 1d8 damage, elemental rune effects apply.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 8,
        },
      ],
    },
    adept: {
      description:
        "Increases damage roll of staffs by +2, you can hit around corners and partial hidden targets.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Staff can now hit up to five targets in sequence with diminishing damage roll of -2, -4, -6, -8, -10, missing doesn't break the chain but does still reduce next targets damage.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["staff magic"],
    category: "mystical power",
    tags: [
      "ranged attack",
      "enhanced damage",
      "multi target",
      "resolute",
      "accurate",
    ],
  },
  "Storm Arrow": {
    novice: {
      description:
        "Test [Resolute] to enchant up to five arrows, which float by the mystic for the scene. Can fire one storm arrow per turn, hitting automatically and dealing 1d6 damage. Arrow qualities are retained.",
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
        "Arrows now deal 1d8. Can fire two arrows at the same or different targets, replacing the Free Action for that turn.",
      action: "active",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 8,
        },
      ],
    },
    master: {
      description: "Now fires 3 arrows.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 8,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "mystical power",
    tags: ["self buff", "multi shot", "damage", "resolute"],
  },
  Teleport: {
    novice: {
      description:
        "Test [Resolute] to teleport within two movements' range, taking 1d4 damage from the journey, ignoring Armor. Doesn't provoke Free Attacks. Must see destination. Failure summons a daemon.",
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
        "No damage from teleporting. If Teleport fails can prevent abomination with [Resolute] test. Option to let the daemon through.",
      action: "passive",
      roll: [],
    },
    master: {
      description:
        "Can now bring along a companion within melee range. Test [Resolute < Resolute] for unwilling targets. Companions take 1d4 damage and 1d4 temporary corruption.",
      action: "passive",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 4,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "mystical power",
    tags: ["multi target", "-damage", "ignore armor", "resolute", "movement"],
  },
  "Thorn Cloak": {
    novice: {
      description:
        "Increases armor by +5 or +7 if the mystic does not move for a whole turn. The effect last till you rest.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Increases armor by +5 for allies within melee range. Protection ends if either party moves out of melee.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "The vines now lash out against melee attackers. Retaliatory strikes deal 1d10 damage, ignoring Armor.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 10,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "mystical power",
    tags: ["self buff", "ally buff", "retaliation", "resolute"],
  },
  "Tormenting Spirits": {
    novice: {
      description:
        "Summons spirits to target an enemy. Target automatically fails concentration tests and all other tests have a second chance to fail. [Resolute < Resolute] test each turn maintains effect.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Spirits now deal 1d4 damage to [Resolute] ignoring armour but requires concentration to maintain effect. At 0 Resolute the target dies or goes insane.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 4,
        },
      ],
    },
    master: {
      description: "Increase spirit damage to 1d6.",
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
    tradition: ["witchcraft"],
    category: "mystical power",
    tags: ["debuff", "damage", "enhanced damage", "resolute"],
  },
  "True Form": {
    novice: {
      description:
        "Test [Resolute < Resolute] to unveil the true nature of all within sight, illusions disappear and while transformations remain, you can see through them.",
      action: "reaction",
      roll: [],
    },
    adept: {
      description:
        "Force a chain of creatures to their original states with successive [Resolute < Resolute] tests. Creatures may retransform later.",
      action: "active",
      roll: [],
    },
    master: {
      description:
        "Also prevents retransformation, requiring transformed beings to test [Resolute < Resolute] against the mystic to change form again.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy", "wizardry"],
    category: "mystical power",
    tags: ["resolute", "multi target"],
  },
  "Unholy Aura": {
    novice: {
      description:
        "Test [Resolute], emit an aura dealing 1d6 damage per turn, ignoring Armor, to all cultural beings and beasts within sight, friend or foe. [Resolute] test each turn maintains effect. Losing concentration ends effect.",
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
        "Can now exclude living allies from the aura's damaging effect.",
      action: "passive",
      roll: [],
    },
    master: {
      description:
        "Damage increases to 1d8. Nearby allied abominations and undead now also heal 1d8 points of Toughness per turn.",
      action: "passive",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 8,
        },
        {
          source: "base",
          type: "healing",
          value: 8,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "mystical power",
    tags: ["resolute", "duration", "healing"],
  },
  Unnoticeable: {
    novice: {
      description:
        "Test [Resolute < Resolute] to become invisible to one creature. Invisibility lasts until you attack or are damaged.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Only [Resolute] test now needed and all nearby enemies affected.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Can now include an ally to also become invisible. Invisibility for each persists independently until either attacks or is damaged.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "mystical power",
    tags: ["resolute", "multi target", "single target"],
  },
  "Weakening Hymn": {
    novice: {
      description:
        "Sing to weaken enemies with a debilitating song. Test [Persuasive < Resolute] to give wounded enemies a re-roll to fail success tests during the hymn; one test is made per enemy. Effect ends if song stops, if another mystical power is used or loses concentration.",
      action: "free",
      roll: [],
    },
    adept: {
      description: "Now affects all enemies, wounded or not.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Enemies failing success tests now take 1d4 damage, ignoring armor, as lyrics manifest physical effects.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "damage",
          value: 4,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["troll singing"],
    category: "mystical power",
    tags: ["debuff", "enhanced debuff", "damage", "persuasive", "resolute"],
  },
  "Last Stand": {
    novice: {
      description:
        "You sacrifice yourself to heal all visible allies for 1d20 Toughness, including downed allies. As a result, you die.",
      action: "reaction",
      roll: [
        {
          source: "base",
          type: "healing",
          value: 20,
        },
      ],
    },
    adept: {
      description:
        "You sacrifice yourself to heal all visible allies for 1d20 Toughness, including downed allies, and cleanse all ongoing effects, such as poisons. As a result, you die.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "healing",
          value: 20,
        },
      ],
    },
    master: {
      description:
        "You sacrifice yourself to heal all visible allies for 1d20 Toughness and 1d10 Corruption, including downed allies, and cleanse all ongoing effects such as poisons. As a result, you die.",
      action: "upgrade",
      roll: [
        {
          source: "base",
          type: "buff",
          value: 20,
        },
      ],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "mystical power",
    tags: ["healing", "death", "multi target"],
  },
  "Wild Hunt": {
    novice: {
      description:
        "Summons 1 weak beast to aid in combat. The beast type is influenced by the local environment and is an ally.",
      action: "active",
      roll: [],
    },
    adept: {
      description:
        "Can now summon either 1 ordinary beast or 1d4 weak beasts to assist in combat.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Allows for the summoning of 1 challenging beast, 1d4 ordinary beasts, or 1d6 weak beasts to support in combat.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "mystical power",
    tags: ["summoning", "multi summon", "enhanced summon"],
  },
  "Witch Hammer": {
    novice: {
      description:
        "Increase attack damage by +5 or +7 against abominations/undead. Ongoing until the next rest.",
      action: "free",
      roll: [],
    },
    adept: {
      description: "Increase damage against abominations/undead to +9.",
      action: "upgrade",
      roll: [],
    },
    master: {
      description:
        "Further enhances damage against abominations/undead to +11.",
      action: "upgrade",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "mystical power",
    tags: ["undead", "damage", "damage"],
  },
};
