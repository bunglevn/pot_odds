import { Alert, Typography } from "@mui/material";
import { StaticMathField } from "react-mathquill";

export const ExpectedValueExplanation = ({ data }) => {
  const { equity, potValue, opponentCall, expectedValue } = data;
  return (
    <>
      <Alert severity="info">
        <Typography display="inline" fontWeight="bold">
          Expected value:{" "}
        </Typography>
        <Typography display="inline">
          Expected value (EV) in poker is the average amount of money you can
          expect to win or lose per bet over the long run. It takes into account
          the possible outcomes of a hand (win, lose, or tie), their
          probabilities, and the amount of money involved in each outcome. A
          positive EV means you're likely to make a profit, while a negative EV
          means you're expected to lose money over time.
        </Typography>
      </Alert>
      <div className="flex flex-col pl-12 gap-2">
        <StaticMathField style={{ fontSize: 25 }}>
          {`\\text{Let X be the average amount of money you can win or lose per bet over the long run.}`}
        </StaticMathField>
        <StaticMathField style={{ fontSize: 25 }}>
          {`E(X)= P_{win} \\times \\text{Amount win} + P_{lose} \\times \\text{Amount lose}`}
        </StaticMathField>
        <StaticMathField style={{ fontSize: 25 }}>
          {`= \\text{Equity} \\times (\\text{Pot value} + \\text{Opponent's Call}) + (1-\\text{Equity}) \\times \\text{Opponent's Call}`}
        </StaticMathField>
        <StaticMathField style={{ fontSize: 25 }}>
          {`= ${equity} \\times (${potValue} + ${opponentCall}) + (1-${equity}) \\times ${opponentCall}`}
        </StaticMathField>
        <StaticMathField style={{ fontSize: 25 }}>
          {`= ${expectedValue}`}
        </StaticMathField>
      </div>
    </>
  );
};
