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
  OnlyOnePair = "Only one pair",
}

export const aimingHandMap: Record<PotentialHandType, PokerHandType[]> = {
  [PotentialHandType.FourSameSuit]: [PokerHandType.Flush],
  [PotentialHandType.ThreeSameSuit]: [PokerHandType.Flush],
  [PotentialHandType.FourConsecutive]: [PokerHandType.Straight],
  [PotentialHandType.ThreeConsecutive]: [PokerHandType.Straight],
  [PotentialHandType.TwoPairs]: [PokerHandType.FullHouse],
  [PotentialHandType.ThreeOfAKind]: [
    PokerHandType.FourOfAKind,
    PokerHandType.FullHouse,
  ],
  [PotentialHandType.OnlyOnePair]: [
    PokerHandType.ThreeOfAKind,
    PokerHandType.FourOfAKind,
    PokerHandType.FullHouse,
  ],
};

export const potentialHand: PotentialHandType[] = [
  PotentialHandType.FourSameSuit,
  PotentialHandType.ThreeSameSuit,
  PotentialHandType.FourConsecutive,
  PotentialHandType.ThreeConsecutive,
  PotentialHandType.TwoPairs,
  PotentialHandType.ThreeOfAKind,
  PotentialHandType.OnlyOnePair,
];

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
