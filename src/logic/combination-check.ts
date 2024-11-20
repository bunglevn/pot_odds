import { PokerHandType } from "../types/poker-hand.type.ts";
import { getCardNumber } from "./utils.ts";

export function hasTwoPairs(cards: string[]) {
  const ranks = cards.map(getCardNumber);
  const rankCounts: Record<number, number> = {};
  for (const rank of ranks) {
    rankCounts[rank] = (rankCounts[rank] || 0) + 1;
  }
  const pairs = Object.values(rankCounts).filter((count) => count === 2);
  return pairs.length >= 2;
}

export function hasConsecutive(sortedNumbers: number[], n: number) {
  let consecutiveCount = 1;

  for (let i = 1; i < sortedNumbers.length; i++) {
    if (sortedNumbers[i] === sortedNumbers[i - 1] + 1) {
      consecutiveCount++;
      if (consecutiveCount === n) {
        return true;
      }
    } else if (sortedNumbers[i] !== sortedNumbers[i - 1]) {
      consecutiveCount = 1;
    }
  }

  return false;
}

export function hasSameSuit(
  riverCards: string[],
  holeCards: string[],
  suitList: string[],
  n: number,
) {
  let result = false;
  suitList.forEach((suit) => {
    let count = 0;
    riverCards.forEach((num) => {
      if (num.includes(suit)) count += 1;
    });
    holeCards.forEach((num) => {
      if (num.includes(suit)) count += 1;
    });
    if (count === n) {
      result = true;
    }
  });
  return result;
}

export function hasSameKind(
  riverCards: string[],
  holeCards: string[],
  numberList: number[],
  n: number,
) {
  let result = false;
  numberList.forEach((rank) => {
    let count = 0;
    riverCards.forEach((num) => {
      console.log(num, rank, num.includes(rank.toString()));
      if (num.includes(rank.toString())) count += 1;
    });
    holeCards.forEach((num) => {
      console.log(num, rank, num.includes(rank.toString()));
      if (num.includes(rank.toString())) count += 1;
    });
    if (count === n) {
      result = true;
    }
  });
  return result;
}

export function checkRoyalFlush(holeCards: string[], riverCards: string[]) {
  if (!holeCards.includes("AH") && !riverCards.includes("AH")) return false;
  if (!holeCards.includes("KH") && !riverCards.includes("KH")) return false;
  if (!holeCards.includes("QH") && !riverCards.includes("QH")) return false;
  if (!holeCards.includes("JH") && !riverCards.includes("JH")) return false;
  if (!holeCards.includes("10H") && !riverCards.includes("10H")) return false;
  return true;
}

// export function checkStraightFlush(numberList: number[], suitList: string[], n){
//     return checkStraight(numberList) && checkFlush(suitList, n)
// }

export function checkFourOfAKind(
  riverCards: string[],
  holeCards: string[],
  numberList: number[],
) {
  return hasSameKind(riverCards, holeCards, numberList, 4);
}

export function checkFullHouse(
  riverCards: string[],
  holeCards: string[],
  numberList: number[],
  totalCards: number,
) {
  return (
    hasSameKind(riverCards, holeCards, numberList, 3) &&
    hasTwoPairs(riverCards.concat(holeCards))
  );
}

export function checkStraight(numberList: number[]) {
  return hasConsecutive(numberList, 5);
}

export function checkFlush(
  riverCards: string[],
  holeCards: string[],
  suitList: string[],
) {
  return hasSameSuit(riverCards, holeCards, suitList, 5);
}

export function checkOnlyOnePair(
  riverCards: string[],
  holeCards: string[],
  numberList: number[],
  n: number,
) {
  return (
    numberList.length === n - 1 && !hasTwoPairs(riverCards.concat(holeCards))
  );
}

export function combinationCheck(
  holeCards: string[],
  riverCards: string[],
  numberList: number[],
  suitList: string[],
  totalCards: number,
) {
  if (checkRoyalFlush(holeCards, riverCards))
    return { equity: 100, cases: [PokerHandType.RoyalFlush] };
  //fixme: straighflust
  if (checkFourOfAKind(riverCards, holeCards, numberList))
    return { equity: 80, cases: [PokerHandType.FourOfAKind] };
  if (checkFullHouse(riverCards, holeCards, numberList, totalCards))
    return { equity: 70, cases: [PokerHandType.FullHouse] };
  if (checkFlush(riverCards, holeCards, suitList))
    return { equity: 60, cases: [PokerHandType.Flush] };
  if (checkStraight(numberList))
    return { equity: 50, cases: [PokerHandType.Straight] };
  if (hasSameKind(riverCards, holeCards, numberList, 3))
    return { equity: 40, cases: [PokerHandType.ThreeOfAKind] };
  if (hasTwoPairs(riverCards.concat(holeCards)))
    return { equity: 30, cases: [PokerHandType.TwoPair] };
  if (checkOnlyOnePair(riverCards, holeCards, numberList, totalCards))
    return { equity: 20, cases: [PokerHandType.Pair] };
  return { equity: 10, cases: [PokerHandType.HighHand] };
}
