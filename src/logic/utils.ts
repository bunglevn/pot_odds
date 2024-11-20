import {
  NumberShortCutMap,
  SuitShortCutMap,
} from "../types/poker-hand.type.ts";
import { rankToNumber } from "./equity.ts";

export function convertImageToCardShortcut(cardList: string[]) {
  return cardList.filter(validCardNumberAndSuit).map((imgPath) => {
    const imgName = imgPath.split("/").pop();
    const card = imgName.split(".")[0].split("_");
    const number = NumberShortCutMap[card[0]]
      ? NumberShortCutMap[card[0]]
      : card[0];
    const suit = SuitShortCutMap[card.pop()];
    return rankToNumber[number] + suit;
  });
}

export function getCardNumber(card: string) {
  return parseInt(card.substring(0, card.length - 1));
}

export function getCardSuit(card: string) {
  return card.substring(card.length - 1, card.length);
}

export function validCardNumberAndSuit(card: string) {
  return card !== "undefined" && card !== "";
}
