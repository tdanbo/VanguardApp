import { CharacterEntry } from "./Types";

export const TempChar: CharacterEntry = {
  id: "1kzUu8JDjj",
  details: {
    movement: 35,
    name: "Vindica",
    xp_earned: 50,
    modifier: 0,
  },
  toughness: {
    max: { value: 0, mod: 0 },
    pain: { value: 0, mod: 0 },
    damage: { value: 4, mod: 0 },
  },
  stats: {
    accurate: { value: 7, mod: 0 },
    cunning: { value: 7, mod: 0 },
    discreet: { value: 7, mod: 0 },
    persuasive: { value: 9, mod: 0 },
    quick: { value: 9, mod: 0 },
    resolute: { value: 10, mod: 0 },
    strong: { value: 11, mod: 0 },
    vigilant: { value: 15, mod: 0 },
  },
  actives: {
    attack: { stat: "accurate", mod: 0 },
    defense: { stat: "quick", mod: 0 },
    casting: { stat: "resolute", mod: 0 },
    sneaking: { stat: "discreet", mod: 0 },
  },
  corruption: {
    permanent: 4,
    temporary: 3,
    threshold: 10,
  },
  abilities: [],
  inventory: [],
  rations: { food: 0, water: 0 },
  money: 0,
};
