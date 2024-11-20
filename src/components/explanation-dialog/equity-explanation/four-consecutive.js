import { StaticMathField } from "react-mathquill";

export const FourConsecutive = ({ numCard }) => {
  if (numCard === 6) {
    return (
      <>
        <StaticMathField>
          {`P(\\text{Straight}) = P(\\text{Card 5 is end of Straight}) + P(\\text{Card 5 is start of Straight})`}
        </StaticMathField>
        <StaticMathField>
          {`= \\frac{4}{\\text{Number of remaining cards}}*\\frac{4}{\\text{Number of remaining cards}}`}
        </StaticMathField>
        <StaticMathField>{`= 2*\\frac{4}{52-6}`}</StaticMathField>
        <StaticMathField>{`= \\frac{8}{47}`}</StaticMathField>
        <StaticMathField>{`= 0.17`}</StaticMathField>
      </>
    );
  }
  if (numCard === 5) {
    return (
      <>
        <StaticMathField>
          {`P(\\text{Straigh}) = P(\\text{Card 4 is in the straight}) + P(\\text{Card 4 not in the straight})*P(\\text{Card 5 is in the straight})`}
        </StaticMathField>
        <StaticMathField>
          {`= P(\\text{Card 4 is start of straight}) + P(\\text{Card 4 is end of straight}) + P(\\text{Card 4 not in the straight})*P(\\text{Card 5 is start of straight})`}
        </StaticMathField>
        <StaticMathField>
          {`+ P(\\text{Card 4 not in the straight})*P(\\text{Card 5 is end of straight})`}
        </StaticMathField>
        <StaticMathField>
          {`= \\frac{4}{52-5} + \\frac{4}{52-5} + \\frac{52-5-4-4}{52-5}*\\frac{4}{52-5-1} + \\frac{52-5-4-4}{52-5}*\\frac{4}{52-5-1}`}
        </StaticMathField>
        <StaticMathField>
          {`= 2*\\frac{4}{47} + 2*\\frac{39}{47}*\\frac{4}{46}`}
        </StaticMathField>
        <StaticMathField>{`= 0.31`}</StaticMathField>
      </>
    );
  }
};
