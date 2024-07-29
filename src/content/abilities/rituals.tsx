import { AbilityStatic } from "../../Types";

export const rituals_content: Record<string, AbilityStatic> = {
  "Soul Ward": {
    novice: {
      description:
        "The mystic performs a ritual creating a protective barrier around themselves and their allies. This barrier guards against mental intrusions, enveloping each individual's mind and soul to repel psychic attacks and prevent external entities from influencing them. Once established, the ward persists until the end of the day.",
      action: "",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ritual",
    tags: [],
  },
  Annoint: {
    novice: {
      description:
        "Annoint with holy oils, gaining +10 temporary Toughness, +1d4 protection over any Armor, and +1d4 damage on attacks. Damage is deducted from temporary Toughness first. However, cannot be healed and death tests always fail while the effect is active, lasting for a scene.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "ritual",
    tags: [],
  },
  Atonement: {
    novice: {
      description:
        "Advanced version of the Exorcism ritual. Reduce a non-possessed individual's permanent corruption by 1d4, provided they undertake a substantial, often beneficial task for the Sun Church or Prios. The task must be notably time-intensive, costly, or perilous. Completing the task triggers the corruption reduction. Performing this ritual requires sacrificing one point of Experience, chosen by either the confessor or the sinner.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "ritual",
    tags: [],
  },
  "Beast Companion": {
    novice: {
      description:
        "Advanced version of Familiar. The beast is bound to the mystic's body and soul, resurrecting at dawn after death. The mystic still suffers damage when the familiar dies. If the beast becomes fully corrupt, Blood Bond or otherwise, the bond is permanently broken.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "ritual",
    tags: [],
  },
  "Bewitching Landscape": {
    novice: {
      description:
        "Create an illusion over an area confusing and misleading all who enter, becoming disoriented and possibly starving. Those effected test [Resolute\u2190Cunning] to resist the rituals effect. If a target resists the spell, they give others a second chance to escape by testing [Persuasive], convincing them of the falsehood. The illusion is permenant unless you choose to cancel it. Anathema can temporarily dispel the illusion.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  "Black Sympathy": {
    novice: {
      description:
        "Test [Resolute] to create an effigy linked to a target through mystical link (hair, blood, or a cherished item). Harm the effigy to inflict distant, intense pain on the target, who cannot heal during this period, though they suffer no physical damage. No additional tests needed after creating the effigy. Use Break Link to terminate the effect. Black Sympathy cannot target the same link twice, and a new link cannot be used for 30 days.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy", "sorcery", "witchcraft"],
    category: "ritual",
    tags: [],
  },
  "Blood Bond": {
    novice: {
      description:
        "Test [Resolute] to transfer Corruption to a familiar. Success reduces the mystic's Corruption by 1d4 points and increases the familiar's Corruption by 1d6 points. If the familiar's Corruption leads it to become an abomination, it will attack the mystic. The ritual costs 1 Experience point, regardless of whether it succeeds or fails. It cannot be performed on behalf of others.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "ritual",
    tags: [],
  },
  "Blood Shrouding": {
    novice: {
      description:
        "The mystic wears the skin of a deceased to mimic their appearance, retaining their own voice and eyes, for 24 hours. Deception against those who knew the dead requires a [Discreet\u2190Vigilant] test. The disguise naturally deteriorates after 24 hours.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "ritual",
    tags: [],
  },
  "Blood Storm": {
    novice: {
      description:
        "Bind a storm. Activate by thrusting staff into the ground, impacting those outside melee range. Affected must make a [Vigilant] test to perform any action; successful actions are still rolled with disfavour, and victims suffer 1D4 damage/turn, ignoring armor. Effect maintained with [Resolute] test/turn; ends if targets enters melee, finds shelter, or you loose concentration.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["staff magic"],
    category: "ritual",
    tags: [],
  },
  "Borrow Beast": {
    novice: {
      description:
        "The ritual possesses and controls a small beast's body for an extended period, leaving the mystic's body in a trance. If the beast or mystic's body is harmed or experiences significant interference, the mystic's mind returns to its body. The trance lasts up to 24 hours, with a cooldown equal to the trance duration before Borrow Beast can be used again. Inside a Witch Circle, the trance has no duration limit, as the mystic's body is nourished by the ground.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "ritual",
    tags: [],
  },
  "Break Link": {
    novice: {
      description:
        "A mystic can sever mystical ties to objects or individuals by encircling them with runes and passing a Resolute test, blocking ritual contacts (e.g. Heretic's Trail, Summoning) and erasing location-based links (e.g. Clairvoyance and Seven-league Stride) until re-established. It also detaches targets from mystical artifacts.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  "Burdened by Fate": {
    novice: {
      description:
        "Test [Resolute] to bind a creature to a mission with a mystical link (hair, blood, or a cherished item). The creature knows its mission but not the binder. They gain a second chance to pass a test related to the mission per scene, but also risk a second chance to fail in unrelated scenes. Break Link dispels the effect.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "ritual",
    tags: [],
  },
  "Carve Rune Tattoo": {
    novice: {
      description:
        "Imbues a target with the Rune Tattoo ability through carving runes into the skin. 10 Experience or permanent corruption must be paid, can also be a mix of either. Cost is also shareable between target and symbolist.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["symbolism"],
    category: "ritual",
    tags: [],
  },
  Clairvoyance: {
    novice: {
      description:
        "This ritual allows a mystic to see and hear a distant location they've visited. Those present with Witchsight may detect surveillance with a successful [Resolute < Discreet] test. Clairvoyance is blocked by Sanctum, Sanctifying Rite, and Witch Circle rituals.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  "Command Confession": {
    novice: {
      description:
        "Compels a target to truthfully respond to yes/no inquiries. The mystic poses yes/no questions, each test [Resolute\u2190Resolute] for a truthful answer. Failure on any test ends the ritual, prohibiting further questions via this method.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "ritual",
    tags: [],
  },
  "Dance of Death": {
    novice: {
      description:
        "Summon compelling rhythms, affecting all within 100 meters unless they pass a [Resolute] test. Allies and direct enemies get a retest. The affected follow you, can be compelled to violence against non friends and loose 1d4 Toughness/hour. After violence or when injured re-test [Resolute] to end effect. Break Link ends ritual. Individuals can be freed by Exorcism or Anathema.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "ritual",
    tags: [],
  },
  "Death Divination": {
    novice: {
      description:
        "Higher level of Necromancy, gain a second chance to pass all tests to get answers from the spirits of the dead.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "ritual",
    tags: [],
  },
  "Death Lord": {
    novice: {
      description:
        "Higher version of Raise Undead. Summons a powerful Death Lord, loyal, smart, initiative-taking undead in soot-covered armor. Functions like a second character, gaining and using Experience like a player.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "ritual",
    tags: [],
  },
  "Dimension Walk": {
    novice: {
      description:
        "Grants passage to the Yonderworld, requiring an hour-long ritual, familiarity with the destination, or an object from there (e.g., urn of dust, daemon's gift). Use Teleport for safe site identification. Mystic and up to [Resolute/2] companions can travel. Repeat ritual neede for return. Stays last at least an hour, risking encounters determined by the GM or rolling 1d8 on the Yonderworld Events table every half hour.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "ritual",
    tags: [],
  },
  "Desecrating Rite": {
    novice: {
      description:
        "Taints a location, causing 1d6 temporary Corruption to those using external rituals (e.g., Clairvoyance, Summoning) on it, and 1d6 permanent Corruption for persistent attempts.. The site heals abominations and undead, 1d4 Toughness per hour. They and partially corrupted creatures are drawn to it. Can also desecrate melee weapons.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "ritual",
    tags: [],
  },
  Enslave: {
    novice: {
      description:
        "Enslave creatures with a rune carved on them, visible to Witchsight or Holy Smoke. Can be broken by Break Link, Exorcism, or removal (causing 1d6 damage and 1d4 permanent Corruption). Enslaved creatures obey commands, resisting escape attempts but can express emotional distress.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "ritual",
    tags: [],
  },
  "Exchange Shadow": {
    novice: {
      description:
        "Test [Resolute < Resolute] to swap shadows with another creature for 24 hours after. Requires a personal item (e.g., lock of hair, blood) to establish a connection. The change is unnoticed by the target but visible to those who can see Shadows (or tricked by it). Can be undone with Break Link or Exorcism.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ritual",
    tags: [],
  },
  Exorcism: {
    novice: {
      description:
        "The Mystic can banish a spirit possessing a creature or person. The Mystic gets three attempts to succeed with a [Casting < Casting] test; the test's resistance being the Casting of the possessing spirit. It only takes one successful test to banish the possessing force. Should the Mystic fail all three tests, then he or she is possessed by the spirit instead.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "ritual",
    tags: [],
  },
  "False Shape": {
    novice: {
      description:
        "Casts an illusion over the mystic or an ally, changing their appearance to a non-specific, typical member of another race. The illusion can include gender, hair color, voice, clothing, etc... doesn't alter stats, abilities, shadow or actual size. Illusion lasts a week. Attempting an action only possible by the assumed form also dispells the effect.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  "False Terrain": {
    novice: {
      description:
        "Create an illusion over a location to conceal its true appearance. Creatures approaching the illusion can see through it with a successful Resolute\u2190Resolute test. Direct contact or passing through the illusion also reveals it, though the illusion persists until it naturally fades, requiring monthly ritual renewal to maintain.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  Familiar: {
    novice: {
      description:
        "The mystic soul-binds with a beast using mystical energy, creating fierce loyalty,` a telepathic link for remote commands and sense sharing. Wounds can be mutually shared, with either taking half the other's damage at the player's discretion. If the familiar dies, the mystic incurs 1d8 damage, ignoring Armor. The familiar, managed by the player, gains and loses Experience like a character, but death tests are not permitted.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "ritual",
    tags: [],
  },
  "Faraway Writing": {
    novice: {
      description:
        "Enables distant inscription of symbols or messages on flat surfaces, capable of conveying short texts or activating Symbolism powers. Messages can be universally visible or appear only to specified individuals.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["symbolism"],
    category: "ritual",
    tags: [],
  },
  "Fata Morgana": {
    novice: {
      description:
        "The higher level ritual of False Terrain. Creates tangible illusions of terrain or small buildings (e.g., croft, stone fort) that exist for one moon cycle. Unlike False Terrain, these illusions cannot be seen through. If a building is formed it has half the Toughness of actual.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  "Flaming Servant": {
    novice: {
      description:
        "Binds a fire spirit to medium or heavy armor, creating a guardian for combat. Only one servant can be bound at a time. If it dies, the armor must be repaired before reusing the ritual. The servant is controlled like a player character, earns experience, and cannot make death tests - experience is lost if it dies.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  "Flesh Craft": {
    novice: {
      description:
        "Modifies a target to gain level I of the following monstrous traits, Acidic Blood, Acidic Attack, Armored, Corrupting Attack, Natural Weapon, Poisonous, Poison Spit, Regeneration, Robust, Wings. Traits can be improved by the target with experience later. For voluntary targets, new permanent corruption total becomes 1d4 if under 4; involuntary targets add 1d4 to their existing total.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "ritual",
    tags: [],
  },
  "Fortune-telling": {
    novice: {
      description:
        "Test [Resolute] to ask a yes/no question about the adventure. Fortune-telling is limited to once per adventure, with additional attempts allowed only after significant events, as determined by the Game Master.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "ritual",
    tags: [],
  },
  "Heretic's Trail": {
    novice: {
      description:
        "With a successful Casting test the Mystic can track an abomination or a tainted creature that the Mystic has met personally. The tracking is impeccable until the blighted one crosses water - if it does the ritual must be performed again on the far side of the stream. Should the Mystic fail the Casting test, he or she cannot try again until the next day. Also, it is harder to track a blight-stricken creature within larger settlements and in Davokar, giving the Mystic a second chance of failing the test. The player must roll twice and if one of those fails, so does the ritual.",
      action: "",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ritual",
    tags: [],
  },
  "Holy Smoke": {
    novice: {
      description:
        "Test [Cunning], the mystic uses incense to identify corruption levels among those present. Smoke congregates closer to individuals or objects based on their corruption degree, enabling clear identification of blight-stricken, blightmarked, or thoroughly corrupt states. This effect can be neutralized by the Exchange Shadow ritual.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "ritual",
    tags: [],
  },
  Illusion: {
    novice: {
      description:
        "Conjures a moving and speaking false image that dissolves upon touch by intelligent beings. It convincingly mimics reality, including sound and smell, but cannot inflict harm or physically interact with objects. The illusion is capable of simple actions such as appearing to guard or distract, lasts one scene or one hour, dissolving earlier if interacted with.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  "Judging Bonds": {
    novice: {
      description:
        "The Mystic lets pacifying light flow through chains or shackles holding a person. This prevents the bound person from using mystical powers and traits that demand a Casting test. The light evaporates from the shackles over time, though, and the effect must be maintained by a renewed ritual each month.",
      action: "",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ritual",
    tags: [],
  },
  "Life Extension": {
    novice: {
      description:
        "Allows you to delay aging by one year. Consumes one dose of Elixir of Life for each use. You must choose to spend either 1 Experience point or take on 1 point of permanent Corruption.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  "Living Fortress": {
    novice: {
      description:
        "Advanced ritual of Quick Growth creates a living fortress from trees and thorny bushes, counts as a Wooden Fort. You may grant access or provide allies with secret words for safe passage. Attackers make three [Quick\u2190Resolute] tests; failure results in 1d12 damage per failed test, ignoring armor. Lasts a season (three months).",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "ritual",
    tags: [],
  },
  "Magic Circle": {
    novice: {
      description:
        "Creates a permanent circle for telepathic communication across distances to other known circles. Only mystics who know the ritual can start conversations, but anyone in a circle can respond. Effective communication requires knowing another circle's location and having someone present there, with all participants in a receiving circle able to engage in the exchange equally.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  "Nature's Lullaby": {
    novice: {
      description:
        "Test [Resolute] to sing an aspect of dark Davokar to sleep, allowing the mystic and allies to pass unnoticed by a specific abomination. The effect lasts as long as the mystic sings and avoids aggressive actions. Using another mystical power or stopping the singing breaks the effect.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "ritual",
    tags: [],
  },
  Necromancy: {
    novice: {
      description:
        "May ask the dead questions by being near their body or grave, test [Resolute] per question for 'yes' or 'no' responses via knocks. Failure allows another attempt at risk of possession, requiring a [Resolute\u2190Resolute] test. Failure results in the mystic fulfilling the dead's final, often vengeful, wish.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "ritual",
    tags: [],
  },
  Oracle: {
    novice: {
      description:
        "Enables foresight into the adventure's potential outcomes. Test [Resolute], the mystic may pose one open question regarding the adventure's future. Limited to a single use per adventure. The Game Master provides a truthful, albeit possibly cryptic or limited, response.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "ritual",
    tags: [],
  },
  "Patron Saint": {
    novice: {
      description:
        "Gain a guardian spirit, visible to others only when you are in danger. Battles alongside the mystic loyally. The saint is player-controlled, accruing Experience like a player character, though it forfeits all Experience upon death. Limited to one Patron Saint at a time; a fallen saint necessitates summoning a new protector.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "ritual",
    tags: [],
  },
  Phylactery: {
    novice: {
      description:
        "Binds the mystic's soul to a vessel (e.g., figurine), allowing resurrection nearby within 1d12 days after death. Costs 1 experience or permanent corruption. Resurrection incurs 1d6 permanent corruption. Not viable for the thoroughly corrupt, who lack a soul to bind.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "ritual",
    tags: [],
  },
  "Piercing Gaze": {
    novice: {
      description:
        "Advanced ritual of Holy Smoke grants a second chance to succeed on all tests related to the Holy Smoke ritual. Furthermore, a successful Cunning test enables the Inquisitor to penetrate the veil of the Exchange Shadow ritual, uncovering the true shadow concealed beneath the false one.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "ritual",
    tags: [],
  },
  Possess: {
    novice: {
      description:
        "Test [Resolute < Resolute] using a personal item (e.g., lock of hair, blood) of a target to posess and completely control them for up to 24 hours. Victim remembers possession as a dream, can't be made to suicide. Shadow changes to yours. Ended with Exorcism or Break Link; Exorcism also prevents future possession. Your body remains in a trance; harm to it or the borrowed body ends the possession.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "ritual",
    tags: [],
  },
  "Purging Fire": {
    novice: {
      description:
        "Engage in song and prayers, then enter a flaming pyre to burn away Corruption. Each turn in the fire causes 1D6 damage and then tests [Resolute - Damage], success removes one point of permanent Corruption; failure ends the ritual abruptly. This ritual costs 1 Experience point, success or not, and is strictly self-applied for purification.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "ritual",
    tags: [],
  },
  Quake: {
    novice: {
      description:
        "Shock waves are generated by striking the ground, affecting those outside melee range with a [Resolute\u2190Quick] test; failure results in falling and 1D4 damage, ignoring armor. Targeting structures applies a razing effect like a battering ram, destroying or creating gaps in them. Usage incurs 1D6 Temporary Corruption.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["staff magic"],
    category: "ritual",
    tags: [],
  },
  "Defense Growth": {
    novice: {
      description:
        "The Mystic can have a seed grow into a full sized plant by using this ritual. The form of the plant is partially under the control of the Mystic, and a tree can become a bridge or smash a gate to splinters. However, the Mystic has no control over the seasons; the plant takes the form that it naturally has during the current season. The location where this seed is planted must meet the conditions required for the plant to grow to full size under natural circumstances. In other words, an oak cannot be planted in a dark cave without light and soil, but maybe vines can take root there and grow into lianas for people to climb. In a Witch Circle created by the same Mystic, the ritual Defense Growth can be performed regardless of the season.",
      action: "",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: [],
    category: "ritual",
    tags: [],
  },
  "Raise Undead": {
    novice: {
      description:
        "Revive a recently dead (up to 7 days) Target. Test [Resolute\u2190Resolute] to enslave target; otherwise, it gains free will. Undead must completely obey you only freed by your death. Target retains stats and gains Undead trait. Doesn't age. Each year test [Strong] to prevent decay (-1 Strong), when [Strong] reaches 0 target goes to final death.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "ritual",
    tags: [],
  },
  Restore: {
    novice: {
      description:
        "Mends damaged items to full functionality, preserving all qualities. Cannot generate new items.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["troll singing"],
    category: "ritual",
    tags: [],
  },
  Retrieve: {
    novice: {
      description:
        "Reveals the location of lost items, requiring detailed description by the mystic or associate of said item. Hidden items need a successful [Resolute\u2190Discreet] test to locate.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["troll singing"],
    category: "ritual",
    tags: [],
  },
  "Rune Guardian": {
    novice: {
      description:
        "Creates a guardian from a carved statue, imbued with life and loyalty runes. The guardian, can be increased in strength with the creator's own experience and also grows over time like a second character. It remains ever-vigilant, with a personality focused on duty. If destroyed, all progress is lost.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["symbolism"],
    category: "ritual",
    tags: [],
  },
  "Sanctifying Rite": {
    novice: {
      description:
        "Consecrate a space, offering protection from external mystical forces. Blocks rituals like Clairvoyance, Summoning and Heretic\u00b4s Trail within its bounds. Protection ends upon exiting. Abominations incur 1D4 damage per turn, ignoring armor on the site. Heavily corrupted individuals feel significant unease. Can sanctify a weapon for the Witch Hammer mystical power.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["theurgy"],
    category: "ritual",
    tags: [],
  },
  Sanctum: {
    novice: {
      description:
        "A mystic can shield a location (one large or several smaller rooms) with a magical barrier that blocks external mystical intrusions (e.g. Clairvoyance, Summoning, Heretic\u00b4s Trail). The protection ceases if a tracked individual leaves. Within this area, only the mystic who cast Sanctum can use a Magic Circle for communication or Seven-league Stride.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  "Sealing or Opening Rite": {
    novice: {
      description:
        "Allows sealing or opening doors, locks, or gates with song. Sealing is automatic; opening requires a [Resolute\u2190Difficulty] test, set by lock complexity or sealer's Resolute. Unpickable locks or password-secured mechanisms have a Difficulty of -8.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["troll singing"],
    category: "ritual",
    tags: [],
  },
  "Servant Daemon": {
    novice: {
      description:
        "The higher form of \u201cSummon Daemon\u201d binds a servant daemon permanently to the demonologist. Grows and functions as a second character for the player. Can be subjected to the Blood Bond ritual.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "ritual",
    tags: [],
  },
  "Seven-League Stride": {
    novice: {
      description:
        "Create a temporary magic circle that allows the mystic and an ally to teleport to a known, permanent Magic Circle. A circle becomes known to the mystic through prior visitation and study, ensuring precise and safe teleportation.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  "Soul Stone": {
    novice: {
      description:
        "Bind to a crystal with a trapped soul. Test [Resolute] to transfer 1D4 points of permanent Corruption to the soul stone. The stone can hold Corruption points up to half the mystic's Resolute value. Exceeding this limit causes the stone to explode, returning the Corruption to the mystic. The ritual costs 1 Experience, regardless of outcome. Initial soul stones are provided to wizards by their order; others must be purchased for 100 thaler.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  "Soul Trap": {
    novice: {
      description:
        "Captures a soul with a vessel (e.g., jeweled pendant) of a target that died within the last minute and the mystic is present or has the corpse. Prevents soul contact via Necromancy. Destroyed by breaking the vessel. Break Link/Exorcism frees the soul without damage to the vessel.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "ritual",
    tags: [],
  },
  "Spell Trap": {
    novice: {
      description:
        "Binds non-Symbolism powers to a location or object, requiring a trigger criteria (e.g., presence, movement) set on creation. Allies aren't exempt from triggering effect. Requires knowledge of, assistance from a user who knows, or scroll that describes the power. Removable with Anathema or Break Link. Lasts for years to centuries.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["symbolism"],
    category: "ritual",
    tags: [],
  },
  "Spell Tunnel": {
    novice: {
      description:
        "Enables mentalists to form a two-way mystical tunnel to a distant location, allowing ranged mystical powers to be used by both the caster, allies, and targets (physical projectiles cannot be used). Lasts for a scene, can be dispelled with Anathema.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  "Summon Daemon": {
    novice: {
      description:
        "To Summon a Daemon (Vindictive, Guardian or Knowledgeable) draw symbol on ground; Magic Circle adds safety. No test to summon but control requires [Resolute\u2190Resolute]. Sacrifice a Cultural Being for a retest, +1 bonus for an uncorrupted victim. Binds daemon for a task; failure frees it for 24 hours. Daemon cannot overstay or enter protected areas. Can only bind one of each type at once, new summon frees previous bound for 24 hours. Costs 1 Experience.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery"],
    category: "ritual",
    tags: [],
  },
  Summoning: {
    novice: {
      description:
        "Test [Resolute] to summon a creature using an item related to it (valuable object or physical part like blood or hair). The creature feels compelled to reach the summoning spot, not knowing why. To protect it, lead it into a mystically shielded area (Sanctifying Rite, Witch Circle, Sanctum) or use Break Link.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "ritual",
    tags: [],
  },
  "Tale of Ashes": {
    novice: {
      description:
        "Divine the history and events surrounding a burnt object through its remenant ashes. This ability grants the mystic sensory impressions from the time of the object's burning, including sights, sounds, and conversations of those present.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  "Telepathic Interrogation": {
    novice: {
      description:
        "Establish a mental conneection by physical touch to read a targets thoughts, obtaining yes/no answers through a successful [Resolute < Resolute] test. Failure severs the connection for the adventure and risks detection if a [Discreet < Vigilant] test fails. Helpless or bound victims cannot resist, while others may react, and those sleeping awaken on a failed attempt.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  Torment: {
    novice: {
      description:
        "Place a curse via a mystical link to the target, reducing their Toughness by one point weekly, preventing healing until lifted. Alternatives include causing warts, emitting a stench, or reversing sleep cycles, typically lasting a month. Break Link can stop the torment.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["sorcery", "witchcraft"],
    category: "ritual",
    tags: [],
  },
  Traceless: {
    novice: {
      description:
        "Eliminate all physical traces of the mystic and allies for 24 hours, affecting the past or future from the ritual's casting. Footprints, disturbed nature, and even disarranged items in civilization revert to their undisturbed state. This prevents tracking by physical means, including smell, but not by mystical methods.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "ritual",
    tags: [],
  },
  "Melodic Summoning": {
    novice: {
      description:
        "Uses ancient tunes to summon a family (e.g., Elves, Trolls, Undead) of creatures within a day's march. The mystic chooses a specific tune for the desired family. Summoned creatures may choose to respond or ignore the call. Specific families listed in Core Rulebook, table 30, page 209.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["troll singing"],
    category: "ritual",
    tags: [],
  },
  "The Raven's Doom": {
    novice: {
      description:
        "Bind dark spirits to an object, punishing those who tamper or steal it based on set conditions (i.e. object is moved or damaged. The caster and witnesses during the ritual are immune. Triggering the effect inflicts 1d10 temporary corruption on anyone within a Movement Action's reach. Only the caster and the immune can dispel it using the Break Link ritual.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "ritual",
    tags: [],
  },
  "Turn Weather": {
    novice: {
      description:
        "Alter local weather according to your needs\u2014create fog, storms, or calm them. The ritual takes an hour to perform, with effects lasting half a day before the weather reverts to normal.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "ritual",
    tags: [],
  },
  "Twin Servants": {
    novice: {
      description:
        "Advanced version of Flaming Servant. Allows the binding of two flaming servants simultaneously. Both servants are treated as separate, additional characters under the player's control, capable of gaining experience through adventuring.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["wizardry"],
    category: "ritual",
    tags: [],
  },
  "Witch Circle": {
    novice: {
      description:
        "Transform a location into a Witch Circle, hidden and protected from outside forces. Dictates growth and season, the Quick Growth ritual allows complete control. Finding it requires a [Vigilant\u2190Discreet] test, or creatures pass it unknowingly. The Alchemy ability gains and extra use inside the circle; Quick Growth grants another. The Borrow Beast ritual has no time limit.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "ritual",
    tags: [],
  },
  "Quick Growth": {
    novice: {
      description:
        "Rapidly grow a seed into a full-sized plant, with partial control over its shape, e.g. a tree as a bridge or using it to smash gates. Growth demands suitable conditions: an oak needs light and soil and won't grow in a dark cave, but vines might thrive and form lianas. Seasons also effect its form, in the mystic's Witch Circle, the ritual bypasses this.",
      action: "ritual",
      roll: [],
    },
    adept: {
      description: "",
      action: "",
      roll: [],
    },
    master: {
      description: "",
      action: "",
      roll: [],
    },
    xp_requirement: 0,
    tradition: ["witchcraft"],
    category: "ritual",
    tags: [],
  },
};
