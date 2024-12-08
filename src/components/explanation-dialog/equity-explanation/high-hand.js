import { Typography } from "@mui/material";
import { StaticMathField } from "react-mathquill";

export const HighHand = () => {
  return (
    <div className="overflow-scroll">
      <Typography fontWeight="bold" className="text-rose-500">
        Assume you will have 10% chance to win with High Hand.
      </Typography>
      <StaticMathField>{`P(\\text{High hand}) = 0.1`}</StaticMathField>
    </div>
  );
};
