import {
  IconDefinition,
  faAnglesDown,
  faAnglesUp,
  faCarrot,
  faCross,
  faCrosshairs,
  faDownLeftAndUpRightToCenter,
  faGavel,
  faHammer,
  faHandFist,
  faHeartCrack,
  faShield,
  faUpRightAndDownLeftFromCenter,
  faUserMinus,
  faUserPlus,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";

export const EffectsIcons: {
  [key: string]: { icon: IconDefinition };
} = {
  "Blessed Shield": {
    icon: faShield,
  },
  "Witch Hammer": {
    icon: faHammer,
  },
  "Witch Hammer Undead": {
    icon: faGavel,
  },
  Theurgy: {
    icon: faCross,
  },
  Focused: {
    icon: faAnglesUp,
  },
  Unfocused: {
    icon: faAnglesDown,
  },
  Overburdened: {
    icon: faWeightHanging,
  },
  "Iron Fist": {
    icon: faHandFist,
  },
  "Hunter's Instinct": {
    icon: faCrosshairs,
  },
  Flanked: {
    icon: faUpRightAndDownLeftFromCenter,
  },
  Flanking: {
    icon: faDownLeftAndUpRightToCenter,
  },
  "Critical Strike": {
    icon: faHeartCrack,
  },
  Starving: {
    icon: faCarrot,
  },
  "Enhanced Accurate": {
    icon: faUserPlus,
  },
  "Enhanced Strong": {
    icon: faUserPlus,
  },
  "Enchanced Vigilant": {
    icon: faUserPlus,
  },
  "Enchanced Quick": {
    icon: faUserPlus,
  },
  "Enchanced Cunning": {
    icon: faUserPlus,
  },
  "Enchanced Discreet": {
    icon: faUserPlus,
  },
  "Enchanced Persuasive": {
    icon: faUserPlus,
  },
  "Enchanced Resolute": {
    icon: faUserPlus,
  },
  "Weakened Accurate": {
    icon: faUserMinus,
  },
  "Weakened Strong": {
    icon: faUserMinus,
  },
  "Weakened Vigilant": {
    icon: faUserMinus,
  },
  "Weakened Quick": {
    icon: faUserMinus,
  },
  "Weakened Cunning": {
    icon: faUserMinus,
  },
  "Weakened Discreet": {
    icon: faUserMinus,
  },
  "Weakened Persuasive": {
    icon: faUserMinus,
  },
  "Weakened Resolute": {
    icon: faUserMinus,
  },
};
