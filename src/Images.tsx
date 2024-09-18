// Race images
import RollA from "./assets/sounds/RollA.wav";
import RollB from "./assets/sounds/RollB.wav";
import RollC from "./assets/sounds/RollC.wav";
import RollD from "./assets/sounds/RollD.wav";
import RollE from "./assets/sounds/RollE.wav";
import RollF from "./assets/sounds/RollF.wav";
import RollG from "./assets/sounds/RollG.wav";

import SuccessA from "./assets/sounds/SuccessA.wav";
import SuccessB from "./assets/sounds/SuccessB.wav";
import SuccessC from "./assets/sounds/SuccessC.wav";

import FailureA from "./assets/sounds/FailureA.wav";
import FailureB from "./assets/sounds/FailureB.wav";
import FailureC from "./assets/sounds/FailureC.wav";

import Resting from "./assets/sounds/Resting.wav";

import Dice6 from "./assets/icons/dice-d6-outline.png";
import Dice4 from "./assets/icons/dice-d4-outline.png";
import Dice8 from "./assets/icons/dice-d8-outline.png";
import Dice10 from "./assets/icons/dice-d10-outline.png";
import Dice12 from "./assets/icons/dice-d12-outline.png";
import Dice20 from "./assets/icons/dice-d20-outline.png";

import Dice4Fill from "./assets/icons/dice-d4.png";
import Dice6Fill from "./assets/icons/dice-d6.png";
import Dice8Fill from "./assets/icons/dice-d8.png";
import Dice10Fill from "./assets/icons/dice-d10.png";
import Dice12Fill from "./assets/icons/dice-d12.png";
import Dice20Fill from "./assets/icons/dice-d20.png";

import Anvil from "./assets/icons/durability.png";

import Loot from "./assets/icons/loot.png";

import NewDay from "./assets/background/NewDay.jpg";

export const NewDayIcon = NewDay;
export const LootIcon = Loot;

export const Dice6Icon = Dice6;
export const Dice4Icon = Dice4;
export const Dice8Icon = Dice8;
export const Dice10Icon = Dice10;
export const Dice12Icon = Dice12;
export const Dice20Icon = Dice20;

export const Dice4FillIcon = Dice4Fill;
export const Dice6FillIcon = Dice6Fill;
export const Dice8FillIcon = Dice8Fill;
export const Dice10FillIcon = Dice10Fill;
export const Dice12FillIcon = Dice12Fill;
export const Dice20FillIcon = Dice20Fill;

export const AnvilIcon = Anvil;

export const RestingSounds = [Resting, Resting, Resting, Resting, Resting];
export const RollSounds = [RollA, RollB, RollC, RollD, RollE, RollF, RollG];
export const CriticalSuccessSounds = [SuccessA, SuccessB, SuccessC];
export const CriticalFailureSounds = [FailureA, FailureB, FailureC];

// export function CharacterImages() {
//   console.log("Character Images");
//   const images: { [key: string]: string } = {};
//   const context = require.context("./assets/characters", true);
//   console.log(context.keys());
//   context.keys().forEach((key: string) => {
//     const imageName = key.replace("./", "");
//     images[imageName] = context(key) as string;
//   });
//   console.log(images);
//   return images;
// }

export function CharacterImages(portrait: string) {
  return `/characters/${portrait}.png`;
}

// Function to dynamically import all images from the characters directory
export function AllImages() {
  const images: { [key: string]: string } = {};
  const context = import.meta.glob("../public/characters/*.{png,jpg,jpeg,svg}");

  for (const path in context) {
    const imageName = path
      .replace("../public/characters/", "")
      .replace(/\.(png|jpe?g|svg)$/, "");
    images[imageName] = path.replace("../public", ""); // Adjust the path to be relative to the public directory
  }

  return images;
}
// Example usage
const allImages = AllImages();
console.log(allImages);
