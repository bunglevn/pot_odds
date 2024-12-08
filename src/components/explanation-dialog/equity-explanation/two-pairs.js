import { StaticMathField } from "react-mathquill";

export const TwoPairs = ({ numCard }) => {
  if (numCard === 6)
    return (
      <div className="overflow-scroll">
        <StaticMathField>
          {`P(\\text{Full house}) = P(\\text{Card 5 has the same rank with either pair})`}
        </StaticMathField>
        <StaticMathField>{`= 2*\\frac{4-2}{52-6}`}</StaticMathField>
        <StaticMathField>{`= 0.08`}</StaticMathField>
      </div>
    );

  if (numCard === 5)
    return (
      <>
        <StaticMathField>
          {`P(\\text{Full house}) = P(\\text{Card 4 has the same rank with either pair}) + P(\\text{Card 4 not in the full house})*P(\\text{Card 5 has the same rank with either pair})`}
        </StaticMathField>
        <StaticMathField>
          {`= 2*\\frac{4-2}{52-6} + \\frac{52-5-2-2}{52-5}*2*\\frac{4-2}{52-5-1}`}
        </StaticMathField>
        <StaticMathField>
          {`= 2*\\frac{2}{47} + \\frac{43}{47}*2*\\frac{2}{46}`}
        </StaticMathField>
        <StaticMathField>{`= 0.1647`}</StaticMathField>
      </>
    );
};
