import {
  convertImageToCardShortcut,
  getCardNumber,
  getCardSuit,
  validCardNumberAndSuit,
} from "./utils.ts";
import {
  checkOnlyOnePair,
  checkRoyalFlush,
  combinationCheck,
  hasConsecutive,
  hasSameKind,
  hasSameSuit,
  hasTwoPairs,
} from "./combination-check.ts";
import { PokerHandType, PotentialHandType } from "../types/poker-hand.type.ts";

const ALL_CARDS = 52;
const SAME_SUIT = 13;

export function calculateEquity({
  hole,
  river,
}: {
  hole: string[];
  river: string[];
}): { equity: number; cases: (PokerHandType | PotentialHandType)[] } {
  console.log(convertImageToCardShortcut(river));
  const holeCards = convertImageToCardShortcut(hole);
  const riverCards = convertImageToCardShortcut(river);

  const n = riverCards.length + holeCards.length;

  const numberSet = Array.from(
    new Set([
      ...holeCards.map(getCardNumber),
      ...riverCards.map(getCardNumber),
    ]),
  );

  const sortedNumbers = numberSet.sort((a, b) => a - b);
  const suitSet = new Set([
    ...holeCards.map(getCardSuit),
    ...riverCards.map(getCardSuit),
  ]);
  const suitList = Array.from(suitSet);

  const combCheck = combinationCheck(
    holeCards,
    riverCards,
    sortedNumbers,
    suitList,
    n,
  );

  // RoyalFlush: always win
  if (combCheck.equity === 1) return combCheck;

  let equity = combCheck.equity;
  let cases = combCheck.cases;

  // Suit 1: already have 4 of same suit, aiming for flush
  if (hasSameSuit(riverCards, holeCards, suitList, 4)) {
    cases.push(PotentialHandType.FourSameSuit);
    if (n === 6) equity += (SAME_SUIT - 4) / (ALL_CARDS - n);
    else {
      equity +=
        (SAME_SUIT - 4) / (ALL_CARDS - n) + // Card 4 is same suit
        (((ALL_CARDS - n - SAME_SUIT + 4) / (ALL_CARDS - n)) * // Card 4 different suit but card 5 same suite
          (SAME_SUIT - 4)) /
          (ALL_CARDS - n - 1);
    }
  }

  // Suit 2: already have 3 of same suit and 3 on river, aiming for flush
  // If there are >3 on river, the combination cannot form flush
  if (hasSameSuit(riverCards, holeCards, suitList, 3) && n === 5) {
    cases.push(PotentialHandType.ThreeSameSuit);
    equity +=
      (((SAME_SUIT - 3) / (ALL_CARDS - n)) * (SAME_SUIT - 4)) /
      (ALL_CARDS - n - 1);
  }

  // Number 1: already have 4 consecutive cards, aiming for straight
  if (hasConsecutive(sortedNumbers, 4)) {
    cases.push(PotentialHandType.FourConsecutive);
    if (n === 6) equity += (2 * 4) / (ALL_CARDS - n);
    else
      equity +=
        (2 * 4) / (ALL_CARDS - n) +
        (((ALL_CARDS - n - 2 * 4) / (ALL_CARDS - n)) * 2 * 4) /
          (ALL_CARDS - n - 1);
  }

  // Number 2: already have 3 consecutive cards, aiming for straight
  if (
    hasConsecutive(sortedNumbers, 3) &&
    !hasConsecutive(sortedNumbers, 4) &&
    n === 5
  ) {
    cases.push(PotentialHandType.ThreeConsecutive);
    equity += 4 * (4 / (ALL_CARDS - n)) * (4 / (ALL_CARDS - n - 1));
  }

  // Number 3: already have 2 pairs, aiming for fullhouse
  if (
    hasTwoPairs(riverCards.concat(holeCards)) &&
    !hasSameKind(riverCards, holeCards, sortedNumbers, 3)
  ) {
    cases.push(PotentialHandType.TwoPairs);
    if (n === 6) {
      equity += (2 + 2) / (ALL_CARDS - n);
    } else
      equity +=
        (2 + 2) / (ALL_CARDS - n) +
        (((ALL_CARDS - n - 2 - 2) / (ALL_CARDS - n)) * (2 + 2)) /
          (ALL_CARDS - n - 1);
  }
  // Number 3: already have 3 of a kind
  if (
    hasSameKind(riverCards, holeCards, sortedNumbers, 3) &&
    !hasTwoPairs(riverCards.concat(holeCards))
  ) {
    cases.push(PotentialHandType.ThreeOfAKind);
    if (n === 6) {
      // aiming for 4 of a kind
      equity += 1 / (ALL_CARDS - n);
      // aiming for full house
      equity += (3 * 3) / (ALL_CARDS - n);
    }

    if (n === 5) {
      // aiming for 4 of a kind
      equity +=
        1 / (ALL_CARDS - n) +
        (ALL_CARDS - n - 1) / (ALL_CARDS - n) / (ALL_CARDS - n - 1);
      // aiming for full house
      equity +=
        (2 * 3) / (ALL_CARDS - n) +
        (((ALL_CARDS - n - 3 - 3) / (ALL_CARDS - n)) * (2 * 3)) /
          (ALL_CARDS - n - 1);
    }
  }

  if (checkOnlyOnePair(riverCards, holeCards, sortedNumbers, n)) {
    cases.push(PotentialHandType.OnlyOnePair);
    if (n === 5) {
      // 3 of a kind
      equity += (((2 * 2) / (52 - n)) * (52 - n - 2)) / (52 - n - 1);
      // 4 of a kind
      equity += (2 / (52 - n)) * (1 / (52 - n - 1));
      // full house
      equity += (6 / (52 - n)) * (1 / (52 - n - 1));
    } else {
      equity += 2 / (52 - n);
    }
  }

  equity *= 100;
  equity = Number(equity.toFixed(2));
  return { equity, cases };
}

export const rankToNumber: Record<string, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};
