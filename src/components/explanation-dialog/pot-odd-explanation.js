import { Alert, Typography } from "@mui/material";
import { addStyles, StaticMathField } from "react-mathquill";

addStyles();
export const PotOddExplanation = (data) => {
  const { potValue, opponentCall, potOdds } = data.data;

  return (
    <div>
      <Alert severity="info">
        <Typography display="inline" fontWeight="bold">
          Pot odds:{" "}
        </Typography>
        <Typography display="inline">
          Pot odds is the ratio between the bet facing you and the total pot
          after the bet.
        </Typography>
      </Alert>
      <div className="flex p-4 justify-center items-center">
        <StaticMathField style={{ fontSize: 25 }}>
          {"\\text{Pot odds} = \\frac{\\text{Opponent's call} \\times 100%}{\\text{Opponent's call} + \\text{Pot value}} = " +
            `\\frac{${potValue} \\times 100%}{${potValue} + ${opponentCall}}=${potOdds.toFixed(2)}%`}
        </StaticMathField>
      </div>
    </div>
  );
};
