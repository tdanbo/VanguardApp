import {
  IconDefinition,
  faAnglesDown,
  faAnglesUp,
  faCarrot,
  faCrosshairs,
  faDownLeftAndUpRightToCenter,
  faHammer,
  faHandFist,
  faHeartCrack,
  faShield,
  faUpRightAndDownLeftFromCenter,
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
  Focused: {
    icon: faAnglesUp,
  },
  Unfocused: {
    icon: faAnglesDown,
  },
  Overburden: {
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
};
