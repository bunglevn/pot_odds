import {
  SuitShortCutMap,
  NumberShortCutMap,
} from "../types/poker-hand.type.ts";

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

  if (n === 0) {
    return 0;
  }

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

  let equity = 0;

  // Suit 1: already have 4 of same suit, aiming for flush
  if (numSuit <= n - 3) {
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
  if (numSuit <= n - 2 && numSuit > n-3 && n === 5) {
    equity +=
      (SAME_SUIT - 3) / (ALL_CARDS - n) + (SAME_SUIT - 4) / (ALL_CARDS - n - 1);
  }

  // Number 1: already have 4 consecutive cards, aiming for straight
  if (hasFourConsecutive(sortedNumbers)) {
    if (n === 6) equity += (2 * 4) / (ALL_CARDS - n);
    else
      equity +=
        (2 * 4) / (ALL_CARDS - n) +
        (((ALL_CARDS - n - 2 * 4) / (ALL_CARDS - n)) * 2 * 4) /
          (ALL_CARDS - n - 1);
  }

  // Number 2: already have 3 consecutive cards, aiming for straight
  if (hasThreeConsecutive(sortedNumbers) && n === 5)
    equity += (4 / (ALL_CARDS - n)) * (4 / (ALL_CARDS - n - 1));

  // Number 3: already have 2 pairs, aiming for fullhouse
  if (hasTwoPairs(sortedNumbers)) {
    if (n === 6) equity += (2 + 2) / (ALL_CARDS - n);
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

export function convertImageToCardShortcut(cardList: string[]) {
  return cardList.map((imgPath) => {
    const imgName = imgPath.split("/").pop();
    const card = imgName.split(".")[0].split("_");
    const number = NumberShortCutMap[card[0]]
      ? NumberShortCutMap[card[0]]
      : card[0];
    const suit = SuitShortCutMap[card.pop()];
    return number + suit;
  });
}

function getCardNumber(card: string) {
  return card.substring(0, card.length);
}

function getCardSuit(card: string) {
  return card.substring(card.length - 1, card.length);
}

export function validCardNumberAndSuit(card: string) {
  return card !== "undefined" && card !== "";
}

function hasFourConsecutive(sortedNumbers: number[]) {
  let consecutiveCount = 1;

  for (let i = 1; i < sortedNumbers.length; i++) {
    if (sortedNumbers[i] === sortedNumbers[i - 1] + 1) {
      consecutiveCount++;
      if (consecutiveCount === 4) {
        return true;
      }
    } else if (sortedNumbers[i] !== sortedNumbers[i - 1]) {
      consecutiveCount = 1;
    }
  }

  return false;
}

function hasThreeConsecutive(sortedNumbers: number[]) {
  let consecutiveCount = 1;

  for (let i = 1; i < sortedNumbers.length; i++) {
    if (sortedNumbers[i] === sortedNumbers[i - 1] + 1) {
      consecutiveCount++;
      if (consecutiveCount === 3) {
        return true;
      }
    } else if (sortedNumbers[i] !== sortedNumbers[i - 1]) {
      consecutiveCount = 1;
    }
  }

  return false;
}

const rankToNumber = {
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

function hasTwoPairs(cards: number[]) {
  const rankCounts = {};
  for (const card of cards) {
    const rank = rankToNumber[card];
    rankCounts[rank] = (rankCounts[rank] || 0) + 1;
  }

  let pairs = 0;
  for (const count of Object.values(rankCounts)) {
    if (count === 2) {
      pairs++;
    }
  }

  // Return true if there are exactly two pairs
  return pairs === 2;
}
