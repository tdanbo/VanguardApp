import { AbilityStatic } from "../../Types";

export const utility_content: Record<string, AbilityStatic> = {
  "Absolute Memory": {
    novice: {
      description:
        "You come from a culture that relies on advanced memory techniques over writing, allowing you to recall everything you've seen or heard. You can query the Game Master about any detail your character has experienced in past adventures, and the Game Master will provide comprehensive answers.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  Archivist: {
    novice: {
      description:
        "You are trained to organize and search for information. Gains a +1 bonus when researching in archives and libraries.",
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
    tradition: ["arcana"],
    category: "utility",
    tags: [],
  },
  Augur: {
    novice: {
      description:
        "A keen intuition for discerning subtle signs and hidden omens grants a +1 bonus on tests for rituals that delve into the realms of fate and concealed knowledge such as Fortune-telling, Holy Smoke, and Oracle.",
      action: "passive",
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
    tradition: ["arcana"],
    category: "utility",
    tags: [],
  },
  "Beast Tongue": {
    novice: {
      description:
        "The character can converse with Beasts, asking about creatures in the vicinity, their numbers (one, two, or many), and engage in simple exchanges about other details. While Beasts won't perform tasks, they engage in conversation as equals.",
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
    tradition: ["exploration"],
    category: "utility",
    tags: [],
  },
  "Green Thumb": {
    novice: {
      description:
        "The character's innate bond with nature grants a +1 bonus on wilderness-related tests, including navigation, foraging, shelter seeking, and evading natural hazards. This bonus extends to all Alchemy tests as well. Can retake boon twice more, each adding an extra +1 bonus.",
      action: "passive",
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
    tradition: ["exploration"],
    category: "utility",
    tags: [],
  },
  "Blood Ties": {
    novice: {
      description:
        "A special bond with a creature from a different race, allows the use Experience points to acquire a trait from that race. This connection might be with a being from another culture or even with beasts and other creatures, highlighting your unique background and perspectives.",
      action: "passive",
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
    tradition: ["arcana"],
    category: "utility",
    tags: [],
  },
  Bloodhound: {
    novice: {
      description:
        "With a keen sense for tracking, gain a +1 bonus on [Vigilant] and [Cunning] tests to find and follow tracks or to deduce hiding spots, whether through ground traces, lairs, or belongings. Can retake boon twice more, each adding an extra +1 bonus.",
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
    tradition: ["exploration"],
    category: "utility",
    tags: [],
  },
  Cartographer: {
    novice: {
      description:
        "Gain a +1 bonus on tests for orientation and locating positions, applicable both on the surface and in the Underworld. Can retake boon twice more, each adding an extra +1 bonus.",
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
    tradition: ["exploration"],
    category: "utility",
    tags: [],
  },
  "Cat Burglar": {
    novice: {
      description:
        "You are highly skilled at lock-picking. Receive a +1 bonus on all tests related to picking locks. Test [Quick] if in a hurry. Test [Discreet] if you do not want to alert anyone. If you want to hide the fact that the lock has been picked test [Discreet]. Can retake boon twice more, each adding an extra +1 bonus.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  Cheat: {
    novice: {
      description:
        "You excel at cheating in games and avoiding detection, gain +1 on [Cunning] tests in gambling. To cheat undetected, pass a [Discreet\u2190Vigilant] test against the most [Vigilant] opponent, with one reroll allowed. Combines with Gambler for more bonuses. Can retake boon twice more, each adding an extra +1 bonus.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  "Commanding Voice": {
    novice: {
      description:
        "Skilled at intimidation, using threats to momentarily sway others to your will. You receive a +1 bonus on [Persuasive] tests involving threats, interrogation, and coercion. Effect is temporary, and there may be repercussions later. Can retake boon twice more, each adding an extra +1 bonus.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  "Con Artist ": {
    novice: {
      description:
        "You excel in bending the truth, skilled in both crafting and detecting lies, gaining a +1 bonus on [Persuasive] and [Vigilant] tests related to lying. Lies are quickly uncovered, necessitating swift action to capitalize on them. Can retake boon twice more, each adding an extra +1 bonus.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  Contacts: {
    novice: {
      description:
        "Your past roles or travels have created a vast network of contacts. Test [Persuasive] to recall a contact for assistance or information, although their availability varies. Potential contacts include the Queen's Army, Queen's Rangers, Witches, Ordo Magica, Church of Prios, Noble Houses, and Treasure Hunters.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  Dexterous: {
    novice: {
      description:
        "You receive a +1 bonus on all [Discreet] tests for stealing or concealing items due to your nimble fingers. Can retake boon twice more, each adding an extra +1 bonus.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  "Double-tongue": {
    novice: {
      description:
        "Double-tongue, a language of the Thieves Guild in Yndaros, allows for coded communication, enabling secret conversations in public. If known among several characters, it permits safe exchange of secrets unless eavesdroppers also understand Double-tongue.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  "Enduring March": {
    novice: {
      description:
        "Seasoned by extensive marches in military formations or through untamed landscapes, you can sustain Death March speeds without needing to test for endurance. Healing proceeds normally during Forced Marches. This proficiency extends to companions, granting them a reroll for enduring Death March strains and allowing a Strong test to determine natural healing during Forced Marches.",
      action: "special",
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
    tradition: ["exploration"],
    category: "utility",
    tags: [],
  },
  Enterprise: {
    novice: {
      description:
        "You own a business, like a tavern, store, or artisan service, which may be stationary or mobile. Once per adventure (or in-between) test [Cunning] (artisans) or [Persuasive] (services) for a profit of 10+1d10 thaler after expenses. If multiple owners have Enterprise each rolls for profit individually.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  "Escape Artist": {
    novice: {
      description:
        "You possess flexible joints and have honed your skills to escape bonds and navigate tight spaces. You can also break free from an enemy's grasp or evade traps like nets and snares. In these scenarios, you receive a second chance to pass any required test, regardless of the attribute involved.",
      action: "special",
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
    tradition: ["exploration"],
    category: "utility",
    tags: [],
  },
  "False Identity": {
    novice: {
      description:
        "You maintain a meticulously crafted false identity, supported by appropriate attire, gear, and documentation. This identity remains secure unless revealed by its creator or through your actions that blatantly contradict it.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  "Fire Forged": {
    novice: {
      description:
        "Marked by their birth under a radiant celestial event or as the sole survivor of a fierce fire, the character gains a mystical +1 protection against fire. Additionally, they gain a +1 bonus on all tests involving the use of or resistance to fire and flames, reflecting their profound connection to the element of fire.",
      action: "passive",
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
    tradition: ["arcana"],
    category: "utility",
    tags: [],
  },
  "Fleet-footed": {
    novice: {
      description:
        "The creature or person moves at an unusually high speed. In situations where precision counts, the character can move 2 extra squares, and received will always be up one in the flight and hunt rules when fleeing.",
      action: "special",
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
    tradition: ["exploration"],
    category: "utility",
    tags: [],
  },
  "Forbidden Knowledge": {
    novice: {
      description:
        "Through mentorship under a well-traveled Master espionage, you have acquired knowledge of the mystical secrets of alchemy and artifact crafting. This grants them the ability to create any elixir or artifact belonging to any tradition.",
      action: "free",
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
    category: "utility",
    tags: [],
  },
  Gambler: {
    novice: {
      description:
        "You receive a +1 bonus on all [Cunning] tests when gambling or playing strategic games like Prios' Sun, and a +1 bonus on [Vigilant] to spot cheats. Can retake boon twice more, each adding an extra +1 bonus. Gambler synergizes with Cheat for extra bonuses.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  "Green Fingers": {
    novice: {
      description:
        "The character has a mystical connection to all growing things and has a +1 bonus on tests related to challenges in the wilds, such as orienting in the woods, finding food and shelter, and detecting/avoiding natural traps. The bonus also applies to all Alchemy tests. Green Fingers can be acquired multiple times, up to a maximum bonus of +3 on relevant tests.",
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
    category: "utility",
    tags: [],
  },
  Heirloom: {
    novice: {
      description:
        "You inherit a family heirloom, selecting a non-mystical weapon or armor from the Core Rulebook or Advanced Player's Guide options.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  Hideouts: {
    novice: {
      description:
        "You're privy to and can access a network of hideouts linked to a specific contact (e.g. Queen's Rangers, Witches, a Guild), useful for laying low and replenishing equipment. Test [Cunning] to locate a nearby hideout equipped with items worth up to 10 thaler. Users are expected to replenish or report taken items.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  Horrifying: {
    novice: {
      description:
        "Your clear and authoritative voice stands out, even in the turmoil of battle, providing a +1 bonus to [Persuasive] tests when giving direct commands to allies. Can retake boon twice more, each adding an extra +1 bonus.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  Impressionist: {
    novice: {
      description:
        "Gain a +1 bonus on [Discreet] tests for impersonations. Acting as a general type (i.e. town guard) grants a reroll for success; mimicking another race reroll for failure. No reroll for specific individuals, specific individuals from other races cannot be impersonated. Can retake boon twice more, each adding an extra +1 bonus.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  Manipulator: {
    novice: {
      description:
        "Gifted in manipulation, you gain a +1 bonus on [Persuasive] tests against a specific individual per scene. Requires a scene's duration of manipulation but has a lasting effect, with the target adopting and defending these influenced beliefs. Can retake boon twice more, each adding an extra +1 bonus.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  Medium: {
    novice: {
      description:
        "Raised among ghosts, the character gains a +1 bonus on [Vigilant], [Resolute], and [Persuasive] tests related to detecting, engaging, or calming spirits. This bonus extends to resisting spirits' powers targeting them. Can retake boon twice more, each adding an extra +1 bonus.",
      action: "passive",
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
    tradition: ["arcana"],
    category: "utility",
    tags: ["vigilant", "persuasive", "resolute"],
  },
  Mirage: {
    novice: {
      description:
        "Can craft temporary illusions (e.g., harmless flames or making pebbles appear as coins) lasting until the scene ends. Test [Persuasive] to convince others to accept illusory goods up to 100 thaler in value. Additionally, receive a +1 bonus to [Persuasive] when inciting magical threats, illusionary or otherwise.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  Musician: {
    novice: {
      description:
        "You are a skilled musician, and gain a +1 bonus on all [Persuasive] tests to yourself or your allies through your art. In addition your music can pacify Beasts with a [Persuasive\u2190Resolute] test, allowing safe withdrawal if unthreatened. Can retake boon twice more, each adding an extra +1 bonus.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  "Pack-mule": {
    novice: {
      description:
        "The character excels at bearing heavy burdens, with their carrying capacity calculated at 1.5 times their Strong.",
      action: "special",
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
    tradition: ["exploration"],
    category: "utility",
    tags: [],
  },
  Pathfinder: {
    novice: {
      description:
        "Increased senses for spotting and following tracks, both below ground and on the surface. Gain a second chance to pass all [Vigilant] tests when trying to follow a trail or find the way to, or back from, a place.",
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
    tradition: ["exploration"],
    category: "utility",
    tags: [],
  },
  Pet: {
    novice: {
      description:
        "You have a loyal pet, such as a jakaar or mare cat (weak resistance). This pet will not have precense in combat encounter, but can help in situations outside of combat.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  "Poison Resilient": {
    novice: {
      description:
        "With repeated exporsure you have gained resistance to toxins, reducing poison effects by one tier: strong to moderate, moderate to weak, and weak poisons deal just 1 damage per turn. Duration stays the same, but damage is lessened. For non-damaging toxin effects, the character gets a reroll on resistance tests.",
      action: "special",
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
    tradition: ["arcana"],
    category: "utility",
    tags: ["reroll"],
  },
  Servant: {
    novice: {
      description:
        "You have a personal aide, (e.g. an attendant or chamber boy) who is loyal but limited in skills (weak resistance). They can handle basic tasks like chores, night watch, or message delivery but won't assist in perilous scenarios. The Game Master controls the servant, who will have a distinct personality.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  "Shadow Spawn": {
    novice: {
      description:
        "Born during a solar eclipse, the character has a natural affinity with shadows, receiving a +1 bonus on [Discreet] tests for sneaking or hiding, making them adept at moving unseen. Can retake boon twice more, each adding an extra +1 bonus.",
      action: "passive",
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
    tradition: ["arcana"],
    category: "utility",
    tags: ["discreet"],
  },
  Soulmate: {
    novice: {
      description:
        "You have a soulmate with whom you can telepathically share simple messages and emotions. You always know their approximate location and if they're in trouble. Can be a non-player character or another player's character, requiring agreement within your gaming group. Only one character needs this boon for mutual communication.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  Storyteller: {
    novice: {
      description:
        "You excel at storytelling, captivating audiences with your tales and earning a +1 bonus on [Persuasive] tests . when crafting a credible story to impress listeners. Also, once per adventure (or between), test [Persuasive] to earn 1d10 thaler through storytelling. Can retake boon twice more, each adding an extra +1 bonus.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  Telltale: {
    novice: {
      description:
        "You possess an aptitude for gossip, able to discover and spread rumors effectively. Gain a +1 bonus on all tests related to hearing, disseminating, or discerning the truth behind rumors. Can retake boon twice more, each adding an extra +1 bonus.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  Tough: {
    novice: {
      description:
        "The character's resilience, both physical and spiritual, allows them to endure where others falter. With the Tough boon, death tests are rolled with two dice, letting the player choose the better result.",
      action: "special",
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
    tradition: ["support"],
    category: "utility",
    tags: ["reroll"],
  },
  Privileged: {
    novice: {
      description:
        "Belonging to a high-status group within your society, you gain advantages in social situations, needing to roll only for actions that are questionable or nearly impossible. In such cases, you receive a reroll. Additionally, you start with 50 thaler.",
      action: "special",
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
    tradition: ["social"],
    category: "utility",
    tags: [],
  },
  "Long-lived": {
    novice: {
      description:
        "Once adulthood is reached, the aging process of the character slows down. The character can live up to two or even three centuries if its life is not shortened by violence, poison or disease. The creature's long lifespan makes it prone to do things at a slow pace, but this is compensated by the attitude that what is worth doing is worth doing well, which over time results in a considerable degree of expertise. Long-lived has no effect besides what it implies in terms of playing the role.",
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
    category: "utility",
    tags: [],
  },
  "Short-lived": {
    novice: {
      description:
        "The character's life is short, even under favorable living conditions. All members of its race tend to reach adulthood in a handful of years, after which they start to lose their youthful vigor so that only a few ever live to see the age of forty. On the other hand, they are Defense to learn and adapt to new surroundings, and they are often ready to face the world at the age of five. Short-lived has no effect besides what it implies in terms of playing the role.",
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
    category: "utility",
    tags: [],
  },
  "Earth Bound": {
    novice: {
      description:
        "The creature is bound to the world in an intimate way, as if originating from the bones of the world and still being part of its foundation. It has no soul and suffers damage instead of corruption; temporary corruption causes bleeding wounds on its body. Permanent corruption instead causes a permanent reduction to the basis for calculating the creatures Pain Threshold. In practice, this means that the Pain Threshold is reduced by 1 for every other point the creature suffers in permanent corruption. Its Toughness is not affected. If the Pain Threshold is reduced to zero, the creature dies of internal bleeding and failing organs. Once dead, the creature cannot become undead and it cannot be contacted with the ritual Necromancy. The corpse decays and reunites with the slop and dust of creation, without leaving any kind of spiritual trace behind.",
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
    category: "utility",
    tags: [],
  },
  Shapeshifter: {
    novice: {
      description:
        "The character, as a Changeling, possesses the innate ability to shapeshift. This capability allows them to borrow the appearance of others, altering their form, appearance, voice, and even clothes. Initially, young changelings might find it difficult to control this trait, often unintentionally adopting the manners and appearance of those around them. As they mature, they gain greater control over their abilities. With a successful Casting test, the character can adopt a non-specific false shape or even the form of specific individuals they have met. The illusion can be maintained for the duration of a scene or a short period, respectively. However, maintaining the form requires concentration and effort, especially in combat. The changeling must pass a Casting test each turn and when suffering damage, to keep up the illusion. In combat, the convincing nature of the shapeshift may cause enemies to mistakenly target their own ally instead of the changeling.",
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
    category: "utility",
    tags: [],
  },
  "Wisdom of the Ages": {
    novice: {
      description:
        "Active. The character can enter a trance, brief or deep, to tap into the collective memory of the elves. With a successful Casting test, the character gains access to an optional ability, either at the novice or adept level, with Mystical traditions, Ritualist, and Mystical Power excluded. This acquired ability can be used for the rest of the day before fading from memory. The depth of the trance and level of the ability accessed determines the duration and complexity of the trance.",
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
    category: "utility",
    tags: [],
  },
  Witchsight: {
    novice: {
      description:
        "The character can use Witchsight to gain understanding and knowledge about mystical powers and corruption. By making a roll against [Vigilant < Sneaking], the character can see the dominant Shadow, as well as all other Shadows, of a creature, location, or object, including their respective strengths. Each use of Witchsight subjects the character to a d4 temporary Corruption, reflecting the mental and spiritual risk involved in tapping into this deep and often dark insight.",
      action: "free",
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
    tradition: ["arcana"],
    category: "utility",
    tags: [],
  },
  Loremaster: {
    novice: {
      description:
        "A Loremaster can attempt a Cunning check to understand and converse in any language, including those of ancient or mystical origin. Additionally, this ability allows the character to recall specific knowledge about the lore, legends, and history of the continent. For understanding simple phrases in any language, no test is required, but engaging in complex conversations or deciphering intricate texts, as well as recalling detailed historical knowledge, necessitates a successful Cunning roll.",
      action: "free",
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
    tradition: ["arcana"],
    category: "utility",
    tags: [],
  },
  "Beast Lore": {
    novice: {
      description:
        "The character has studied monsters and can make a Cunning Test to recognize or recollect a monster's strengths and weaknesses. Upon a successful Cunning Test, the character not only learns these details but also gains a +5 to any vigilant check in attempting to surprise the identified creature.",
      action: "free",
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
    tradition: ["exploration"],
    category: "utility",
    tags: [],
  },
  Alchemy: {
    novice: {
      description:
        "Through their mastery of alchemy, characters have tapped into the essence of Davokar's flora. Once per day, they use their Cunning to locate Night Caps, key ingredients for elixir enhancement. In the sunlit groves of Bright Davokar, they can gather up to d8 Night Caps. The untamed expanses of Wild Davokar yield up to d10, and the deep, shadowy reaches of Dark Davokar may provide as many as d12.\nThese Night Caps serve a dual purpose in alchemy. Spending 5 Night Caps allows a character to either add 1 quantity to a weak elixir or upgrade it to a moderate elixir. With 10 Night Caps, they can add 1 quantity to a moderate elixir or upgrade it to a strong elixir. For strong elixirs, 15 Night Caps can be used to add 1 quantity",
      action: "active",
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
    tradition: ["arcana"],
    category: "utility",
    tags: ["crafting"],
  },
  Blacksmith: {
    novice: {
      description:
        "Special. Upon mastering the blacksmith's art, with a successful Cunning test the blacksmith can melt down normal and quality weapons and armor (not projectiles). Melting a normal weapon/armor yields d8 Iron Fragments, while a quality weapon provide d10, and quality armor d12 - this can be done once a day. These fragments are essential for crafting the standard repair kits : 5 for a normal repair kit, 10 for a moderate repair kit, and 15 for a strong repair kit. Iron Fragments are also used in modifying items: transferring a quality from a normal item costs 5 fragments (destroying the source), from a quality item costs 10 (also destroying the source), and 15 fragments can remove a quality from any item. Items can only be transfered between the same category, weapon to weapon, and armor to armor.",
      action: "active",
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
    tradition: ["arcana"],
    category: "utility",
    tags: ["crafting"],
  },
  "Artifact Crafting": {
    novice: {
      description:
        "Special. An Artifact Crafter has the expertise to melt down treasures into Relic Shards, a process that permanently destroys the original item. Through a successful Cunning check, they can obtain d8 Relic Shards from a normal treasure, d10 from mystical treasures, and d12 from an artifact or unique. This ability can be utilized once per day. The Relic Shards are crucial for creating artifact repair kits: requiring 5 for a normal kit, 10 for a moderate kit, and 15 for a strong kit. Furthermore, with 10 Relic Shards at their disposal, an Artifact Crafter can attempt to craft a new artifact by rolling on the treasure table, though this carries the risk of turning the shards into debris. Additionally, Artifact Crafters are immune to the permanent corruption that typically accompanies the handling unique artifacts.",
      action: "active",
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
    tradition: ["arcana"],
    category: "utility",
    tags: ["crafting"],
  },
  "Siege Expert": {
    novice: {
      description:
        "Special. Siege Experts, skilled in infusing oak to create Flame Oak, can perform this task once per day in different regions of Davokar: d8 Bright Oak in Bright Davokar, d10 Wild Oak in Wild Davokar, and d12 Dark Oak in Dark Davokar. Flame Oak is essential for alchemical weapons; with 5 Flame Oak, a Siege Expert can either add 1 quantity to a weak alchemical weapon or upgrade it to a moderate weapon. Using 10 Flame Oak, they can add 1 quantity to a moderate weapon or upgrade it to a strong weapon. For strong weapons, 15 Flame Oak adds 1 quantity. For crafting the formidable firetube, 30 Flame Oak is needed for the initial weak version, which can then be upgraded to a moderate version with an additional 15 Flame Oak, and further to a strong version with another 15. Crafting firetube charges costs 5 Flame Oak. Siege Experts are also proficient in fortifying structures, significantly enhancing their defensive capabilities. They are uniquely qualified to safely handle alchemical weapons, preventing the risks of accidental detonations common with inexperienced handlers",
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
    category: "utility",
    tags: [],
  },
  Bushcraft: {
    novice: {
      description:
        "Special. Bushcraft Masters excel in foraging for Darkland Yield, a crucial resource found in the depths of Davokar. By passing a Vigilant test, they efficiently gather these materials: d8 in Bright Davokar, d10 in Wild Davokar, and d12 in Dark Davokar. Their expertise extends to resourceful purification, allowing them to convert 1 Darkland Yield into both a food and a water ration. Additionally, a Bushcrafter can transform 5 Darkland Yields into any category of adventuring gear, demonstrating their versatility in using natural resources. Bushcrafters are unmatched guides in the dense forests. Their profound knowledge of the wilderness reduces their own need for food and water, consuming 1 less of each per day. And are always allowed a truthful when asking the Game Master about direction in areas traveled previously.",
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
    tradition: ["exploration"],
    category: "utility",
    tags: [],
  },
  Poisoner: {
    novice: {
      description:
        "Special. A Poisoner, adept in extracting Primal Venom, turns this skill into a crucial part of crafting poisons. With a successful Cunning test, they can gather Primal Venom from beasts in Davokar: d8 in Bright Davokar, d10 in Wild Davokar, and d12 in Dark Davokar. This venom is vital for enhancing poisons: 5 Primal Venom can be used to add 1 quantity to a normal poison or upgrade it to a moderate poison. Similarly, using 10 Primal Venom allows the addition of 1 quantity to a moderate poison or its upgrade to a strong poison. For strong poisons, 15 Primal Venom adds 1 quantity, amplifying their lethality. Additionally, a skilled Poisoner's expertise is crucial in safely applying these poisons to weapons or aiding others in their effective use, ensuring precision and safety in handling these dangerous substances.",
      action: "active",
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
    tradition: ["arcana"],
    category: "utility",
    tags: ["crafting"],
  },
  Ritualist: {
    novice: {
      description:
        "Special. A Ritualist possesses the arcane skill to extract Corrupted Blood from deceased cultural beings found in Davokar. This extraction can be performed once per day through a successful Cunning test, yielding different amounts based on the region: d8 Corrupted Blood in Bright Davokar, d10 in Wild Davokar, and d12 in Dark Davokar. Corrupted Blood serves as a vital component for the Ritualist's craft. With 5 Corrupted Blood, they can learn or unlearn a ritual from a ritual scroll. Additionally, 5 Corrupted Blood can be spend as a material requirement for casting a ritual, making it an essential resource for the practice of their mystical arts.",
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
    category: "utility",
    tags: [],
  },
};
