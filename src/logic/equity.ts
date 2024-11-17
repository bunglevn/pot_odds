import {convertImageToCardShortcut, getCardNumber, getCardSuit, validCardNumberAndSuit } from "./utils.ts";
import {checkRoyalFlush, hasConsecutive, hasSameSuit, hasTwoPairs} from "./combination-check.ts";

const ALL_CARDS = 52;
const SAME_SUIT = 13;

export function calculateEquity({
  hole,
  river,
}: {
  hole: string[];
  river: string[];
}) {
  const holeCards = convertImageToCardShortcut(hole).filter(
    validCardNumberAndSuit,
  );
  const riverCards = convertImageToCardShortcut(river).filter(
    validCardNumberAndSuit,
  );

  const n = riverCards.length + holeCards.length;

  const numberSet = new Set([
    ...holeCards.map(getCardNumber),
    ...riverCards.map(getCardNumber),
  ]);
  const sortedNumbers = Array.from(numberSet)
    .map((rank) => rankToNumber[rank])
    .sort((a, b) => a - b);
  const suitSet = new Set([
    ...holeCards.map(getCardSuit),
    ...riverCards.map(getCardSuit),
  ]);
  const numSuit = suitSet.size;
  const suitList = Array.from(suitSet)

  let equity = 0;

  // RoyalFlush: always win
  if (checkRoyalFlush(holeCards, riverCards)) return 100

  // Suit 1: already have 4 of same suit, aiming for flush
  if (hasSameSuit(suitList, 4, n)) {
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
  if (hasSameSuit(suitList, 3, n) && numSuit > n - 3 && n === 5) {
    equity +=
      (SAME_SUIT - 3) / (ALL_CARDS - n) + (SAME_SUIT - 4) / (ALL_CARDS - n - 1);
  }

  // Number 1: already have 4 consecutive cards, aiming for straight
  if (hasConsecutive(sortedNumbers, 4)) {
    if (n === 6) equity += (2 * 4) / (ALL_CARDS - n);
    else
      equity +=
        (2 * 4) / (ALL_CARDS - n) +
        (((ALL_CARDS - n - 2 * 4) / (ALL_CARDS - n)) * 2 * 4) /
          (ALL_CARDS - n - 1);
  }

  // Number 2: already have 3 consecutive cards, aiming for straight
  if (hasConsecutive(sortedNumbers, 3) && n === 5)
    equity += (4 / (ALL_CARDS - n)) * (4 / (ALL_CARDS - n - 1));

  // Number 3: already have 2 pairs, aiming for fullhouse
  if (hasTwoPairs(sortedNumbers, n)) {
    if (n === 6) {
      equity += (2 + 2) / (ALL_CARDS - n);
    }
    else
      equity +=
        (2 + 2) / (ALL_CARDS - n) +
        (((ALL_CARDS - n - 2 - 2) / (ALL_CARDS - n)) * (2 + 2)) /
          (ALL_CARDS - n - 1);
  }

  // Number 3: already have 3 of a kind
  if (sortedNumbers.length <= n - 3) {
    if (n === 6) {
      // aiming for 4 of a kind
      equity += 1 / (ALL_CARDS - n);
      // aiming for full house
      equity += (3 + 3) / (ALL_CARDS - n);
    }

    if (n === 5) {
      // aiming for 4 of a kind
      equity +=
        1 / (ALL_CARDS - n) +
        (ALL_CARDS - n - 1) / (ALL_CARDS - n) / (ALL_CARDS - n - 1);
      // aiming for full house
      equity +=
        (3 + 3) / (ALL_CARDS - n) +
        (((ALL_CARDS - n - 3 - 3) / (ALL_CARDS - n)) * (3 + 3)) /
          (ALL_CARDS - n - 1);
    }
  }

  return equity * 100;
}

const rankToNumber: Record<string, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "J": 11,
  "Q": 12,
  "K": 13,
  "A": 14,
};
