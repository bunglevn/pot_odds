enum PokerHandType {
  HighHand = "High Hand",
  Pair = "Pair",
  TwoPair = "Two Pair",
  ThreeOfAKind = "ThreeOfAKind",
  Straight = "Straight",
  Flush = "Flush",
  FullHouse = "FullHouse",
  FourOfAKind = "FourOfAKind",
  StraightFlush = "StraightFlush",
  RoyalFlush = "RoyalFlush",
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
