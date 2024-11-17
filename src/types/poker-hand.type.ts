export enum PokerHandType {
  HighHand = "High Hand",
  Pair = "Pair",
  TwoPair = "Two Pair",
  ThreeOfAKind = "Three Of A Kind",
  Straight = "Straight",
  Flush = "Flush",
  FullHouse = "Full House",
  FourOfAKind = "Four Of A Kind",
  StraightFlush = "Straight Flush",
  RoyalFlush = "Royal Flush",
}

export enum PotentialHandType {
  FourSameSuit = "Four with the same Suit",
  ThreeSameSuit = "Three with the same Suit",
  FourConsecutive = "Four consecutives",
  ThreeConsecutive = "Three consecutives",
  TwoPairs = "Two pairs",
  ThreeOfAKind = "Three of a Kind",
  OnlyOnePair = "Only one pair"
}

export const NumberShortCutMap: Record<string, string> = {
  ["king"]: "K",
  ["jack"]: "J",
  ["ace"]: "A",
  ["queen"]: "Q",
};

export const SuitShortCutMap: Record<string, string> = {
  ["hearts"]: "H",
  ["hearts2"]: "H",
  ["spades"]: "S",
  ["spades2"]: "S",
  ["clubs"]: "C",
  ["clubs2"]: "C",
  ["diamonds"]: "D",
  ["diamonds2"]: "D",
};
