import { StaticMathField } from "react-mathquill";
import { Typography } from "@mui/material";

export const OnePair = ({ numCard }) => {
  if (numCard === 5)
    return (
      <div className="overflow-scroll">
        <StaticMathField>
          {`P(\\text{Three of kind}) = P(\\text{Card 4 has the same kind})*P(\\text{Card 5 has different kinds}) + P(\\text{Card 4 has different kinds})*P(\\text{Card 5 has the same kind})`}
        </StaticMathField>
        <StaticMathField>
          {`= 2*\\frac{2}{52-5}\\frac{52-5-2}{52-5-1}`}
        </StaticMathField>
        <StaticMathField>{`= 0.08`}</StaticMathField>
        <br />
        <StaticMathField>
          {`P(\\text{Four of a kind}) = P(\\text{Card 4 has the same kind})*P(\\text{Card 5 has the same kind})`}
        </StaticMathField>
        <StaticMathField>
          {`= \\frac{4-2}{52-5}*\\frac{4-2-1}{52-5-1}`}
        </StaticMathField>
        <StaticMathField>{`= 0.0009`}</StaticMathField>
        <br />
        <StaticMathField>
          {`P(\\text{Full house}) = P(\\text{Card 4 and card 5 has the same kind with either of the other 3 cards})`}
        </StaticMathField>
        <StaticMathField>
          {`= 3*\\frac{2}{52-5}*\\frac{1}{52-5-1}`}
        </StaticMathField>
        <StaticMathField>{`= 0.002`}</StaticMathField>
      </div>
    );

  if (numCard === 6)
    return (
      <>
        <Typography>
          However, because there is only 1 card left from the River, the only
          possible hand that you can aim for is{" "}
          <span className="text-sky-500 font-bold"> Three of a kind.</span>
        </Typography>
        <StaticMathField>
          {`P(\\text{Three of kind}) = P(\\text{Card 5 has the same kind})`}
        </StaticMathField>
        <StaticMathField>{`= \\frac{2}{52-6}`}</StaticMathField>
        <StaticMathField>{`= 0.043`}</StaticMathField>
      </>
    );
};
