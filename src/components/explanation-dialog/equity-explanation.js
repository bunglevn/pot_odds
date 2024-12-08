import { Alert, Typography } from "@mui/material";
import { StaticMathField } from "react-mathquill";
import {
  aimingHandMap,
  handEquityMap,
  PokerHandType,
  PotentialHandType,
} from "../../types/poker-hand.type.ts";
import { FourSameSuitExplanation } from "./equity-explanation/four-same-suit";
import { ThreeSameSuit } from "./equity-explanation/three-same-suit";
import { FourConsecutive } from "./equity-explanation/four-consecutive";
import { ThreeConsecutive } from "./equity-explanation/three-consecutive";
import { TwoPairs } from "./equity-explanation/two-pairs";
import { ThreeOfAKind } from "./equity-explanation/three-of-a-kind";
import { OnePair } from "./equity-explanation/one-pair";
import { HighHand } from "./equity-explanation/high-hand";
import rankingImage from "./ranking.jpg";

export const EquityExplanation = ({ data, numCard }) => {
  const { equity } = data;
  const cases = equity.cases;
  return (
    <div className="flex flex-col text-center gap-2">
      <Alert severity="info">
        <Typography display="inline" fontWeight="bold">
          Equity:{" "}
        </Typography>
        <Typography display="inline">
          Poker equity is the percentage of the pot you can expect to win based
          on your current hand and the remaining cards.
        </Typography>
      </Alert>
      <span className="font-bold">
        Currently, you are having a{" "}
        <span className="text-rose-500">{cases[0]}</span>, which leads to the
        start equity of{" "}
        <span className="text-rose-500">{handEquityMap[cases[0]]}</span>. The
        higher your hand is, the higher the start equity you can have.
      </span>
      <div className="flex w-full items-center justify-center">
        <img src={rankingImage} className="w-[200px]" />
      </div>

      {cases.length > 1 && (
        <Typography>
          The current number of cards on the river is {numCard - 2}, and the
          strengths of your hand are:
        </Typography>
      )}

      {cases.map((c) => {
        const Component = componentMap[c];
        return Component ? (
          <>
            {c !== PokerHandType.HighHand && (
              <Typography fontWeight="bold" className="text-rose-500">
                {" "}
                {c} → Aiming for {aimingHandMap[c]?.join(", ")}
              </Typography>
            )}
            <Component key={c} numCard={numCard} />
          </>
        ) : null;
      })}
      <Typography fontWeight="bold" className="text-rose-500">
        The final equity is{" "}
        <span className="text-sky-500 font-bold">the sum</span> of all the above
        probabilities, which is:
      </Typography>
      <StaticMathField>{`\\text{Equity} = ${equity.equity}`}</StaticMathField>
    </div>
  );
};

const componentMap = {
  [PotentialHandType.FourSameSuit]: FourSameSuitExplanation,
  [PotentialHandType.ThreeSameSuit]: ThreeSameSuit,
  [PotentialHandType.FourConsecutive]: FourConsecutive,
  [PotentialHandType.ThreeConsecutive]: ThreeConsecutive,
  [PotentialHandType.TwoPairs]: TwoPairs,
  [PotentialHandType.ThreeOfAKind]: ThreeOfAKind,
  [PotentialHandType.OnlyOnePair]: OnePair,
  [PokerHandType.HighHand]: HighHand,
};
