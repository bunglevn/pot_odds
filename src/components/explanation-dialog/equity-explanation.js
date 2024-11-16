import { Alert, Typography } from "@mui/material";

export const EquityExplanation = ({ data }) => {
  return (
    <div>
      <Alert severity="info">
        <Typography display="inline" fontWeight="bold">
          Equity:{" "}
        </Typography>
        <Typography display="inline">
          Poker equity is the percentage of the pot you can expect to win based
          on your current hand and the remaining cards.
        </Typography>
      </Alert>
    </div>
  );
};
