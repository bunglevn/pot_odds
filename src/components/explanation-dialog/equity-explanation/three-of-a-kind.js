import { StaticMathField } from "react-mathquill";

export const ThreeOfAKind = ({ numCard }) => {
  if (numCard === 6)
    return (
      <>
        <StaticMathField>
          {`P(\\text{Four of a kind}) = P(\\text{Card 5 has the same kind with the 3 others})`}
        </StaticMathField>
        <StaticMathField>
          {`= \\frac{1}{\\text{Number of ramaining cards}}`}
        </StaticMathField>
        <StaticMathField>{`= \\frac{1}{52-6}`}</StaticMathField>
        <StaticMathField>{`= 0.021`}</StaticMathField>
        <br />
        <StaticMathField>
          {`P(\\text{Full house}) = P(\\text{Card 5 has the same kind with either of the other 3 cards})`}
        </StaticMathField>
        <StaticMathField>
          {`= 3*P(\\text{Card 5 has the same kind with a card in the hand})`}
        </StaticMathField>
        <StaticMathField>{`= 3*\\frac{3}{52-6}`}</StaticMathField>
        <StaticMathField>{`= 0.191`}</StaticMathField>
      </>
    );

  if (numCard === 5)
    return (
      <>
        <StaticMathField>
          {`P(\\text{Four of a kind}) = P(\\text{Card 4 has the same kind}) + P(\\text{Card 4 has different kind})*P(\\text{Card 5 has the same kind})`}
        </StaticMathField>
        <StaticMathField>
          {`= \\frac{1}{52-5} + \\frac{52-5-1}{52-5}*\\frac{1}{52-5-1}`}
        </StaticMathField>
        <StaticMathField>
          {`= \\frac{1}{47} + \\frac{46}{47}*\\frac{1}{46}`}
        </StaticMathField>
        <StaticMathField>{`= 0.043`}</StaticMathField>
        <br />
        <StaticMathField>
          {`P(\\text{Ful house}) = P(\\text{Card 4 is in the full house}) + P(\\text{Card 4 not in the full house})*P(\\text{Card 5 is in the full house})`}
        </StaticMathField>
        <StaticMathField>
          {`= P(\\text{Card 4 has the same kind with either of the other 2 cards}) + P(\\text{Card 4 has different kind with all 5 cards})*P(\\text{Card 5 has the same kind with either of the other 2 cards})`}
        </StaticMathField>
        <StaticMathField>
          {`= 2*\\frac{3}{52-5} + \\frac{52-5-3-3}{52-5}*2*\\frac{3}{52-5-1}`}
        </StaticMathField>
        <StaticMathField>{`= 0.24`}</StaticMathField>
      </>
    );
};
