import {
  IconDefinition,
  faAnglesDown,
  faAnglesUp,
  faBurst,
  faCarrot,
  faDownLeftAndUpRightToCenter,
  faShield,
  faUpRightAndDownLeftFromCenter,
  faUserPlus,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";

export const EffectsIcons: {
  [key: string]: { icon: IconDefinition };
} = {
  Focused: {
    icon: faAnglesUp,
  },
  Unfocused: {
    icon: faAnglesDown,
  },
  Overburdened: {
    icon: faWeightHanging,
  },
  Flanked: {
    icon: faUpRightAndDownLeftFromCenter,
  },
  Flanking: {
    icon: faDownLeftAndUpRightToCenter,
  },
  Starving: {
    icon: faCarrot,
  },
  Accurate: {
    icon: faUserPlus,
  },
  Strong: {
    icon: faUserPlus,
  },
  Vigilant: {
    icon: faUserPlus,
  },
  Quick: {
    icon: faUserPlus,
  },
  Cunning: {
    icon: faUserPlus,
  },
  Discreet: {
    icon: faUserPlus,
  },
  Persuasive: {
    icon: faUserPlus,
  },
  Resolute: {
    icon: faUserPlus,
  },
  Damage: {
    icon: faBurst,
  },
  Armor: {
    icon: faShield,
  },
};
