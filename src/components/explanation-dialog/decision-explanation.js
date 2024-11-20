import { Alert, Typography } from "@mui/material";
import { StaticMathField } from "react-mathquill";

export const DecisionExplanation = ({ data }) => {
  const { decision, equity, potOdds } = data;
  return (
    <div className="text-xs">
      <Alert severity="info">
        <Typography display="inline" fontWeight="bold">
          Decision:{" "}
        </Typography>
        <Typography display="inline">
          In poker, the decision to call depends on comparing your hand's equity
          (the chance of winning) to the pot odds (the ratio of the current bet
          to the total pot). If your equity is greater than the pot odds, it
          means you're likely to win more often than it costs to call, so you
          should call. Conversely, if your equity is less than the pot odds, the
          potential loss outweighs your chances of winning, and you should fold.
        </Typography>
      </Alert>
      <div className="flex p-4 justify-center items-center">
        <StaticMathField style={{ fontSize: 25 }}>
          {`\\text{Equity} ${decision ? "\\geq" : "\\leq"} \\text{Pot odds } (${equity.equity.toFixed(2)}% ${decision ? "\\geq" : "\\leq"} ${potOdds.toFixed(2)}%)`}
        </StaticMathField>
      </div>
      <Alert severity={decision ? "success" : "warning"}>
        Hence, you should <b>{decision ? "Call" : "Fold"}</b>
      </Alert>
    </div>
  );
};
