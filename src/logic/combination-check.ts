import { PokerHandType } from "../types/poker-hand.type.ts";

// fixme: wrong logic, use loop
export function hasTwoPairs(cards: number[], n: number) {
  const nRank = cards.length;
  return nRank <= n - 2;
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

export function hasSameSuit(riverCards: string[], holeCards: string[], suitList: string[], n: number) {
  let count = 0;
  suitList.forEach(suit => {
    riverCards.forEach(num => {
      if (num.includes(suit)) count += 1
    })
    holeCards.forEach(num => {
      if (num.includes(suit)) count += 1
    })
  })
  if (count >= n) {
    return true
  }
  return false;
}

export function hasSameKind(
    riverCards: string[], holeCards: string[],
  numberList: number[],
  n: number,
) {
  let count = 0;
  numberList.forEach(rank => {
    riverCards.forEach(num => {
      console.log(num, rank, num.includes(rank.toString()))
      if (num.includes(rank.toString())) count += 1
    })
    holeCards.forEach(num => {
      if (num.includes(rank.toString())) count += 1
    })
  })
  if (count >= n) {
    return true
  }
  return false;
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

export function checkFourOfAKind(riverCards: string[], holeCards: string[],numberList: number[]) {
  return hasSameKind(riverCards, holeCards, numberList, 4);
}

export function checkFullHouse(riverCards: string[], holeCards: string[],numberList: number[], totalCards: number) {
  return (
    hasSameKind(riverCards, holeCards, numberList, 3) &&
    hasTwoPairs(numberList, totalCards)
  );
}

export function checkStraight(numberList: number[]) {
  return hasConsecutive(numberList, 5);
}

export function checkFlush(riverCards: string[], holeCards: string[], suitList: string[]) {
  return hasSameSuit(riverCards, holeCards, suitList, 5);
}

export function checkOnlyOnePair(numberList: number[], n: number) {
  return numberList.length === n - 1 && !hasTwoPairs(numberList, n);
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
  if (hasTwoPairs(numberList, totalCards))
    return { equity: 30, cases: [PokerHandType.TwoPair] };
  if (checkOnlyOnePair(numberList, totalCards))
    return { equity: 20, cases: [PokerHandType.Pair] };
  return { equity: 10, cases: [PokerHandType.HighHand] };
}
