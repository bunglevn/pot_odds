import { Button, Typography } from "@mui/material";
import { CircularProgressCard } from "./CircularProgressCard";
import { ActionAdviceCard } from "./ActionAdviceCard";
import { useState } from "react";
import { ExpectedValueCard } from "./ExpectedValueCard";
import { ExplanationDialog } from "../explanation-dialog/explanation-dialog";
import CheckIcon from "@mui/icons-material/Check";

function SummaryTable({ data, nRiver, nHole, className }) {
  const isValidHand = nRiver >= 3 && nHole === 2;
  const { potOdds, equity, decision, expectedValue } = data;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={className} style={{ background: "#900C27" }}>
      {isValidHand && (
        <div className="flex flex-col gap-2 justify-between h-full">
          <div className="grid grid-cols-4 md:grid-cols-1 gap-2 h-full justify-between">
            <ActionAdviceCard title={"You should"} value={decision} />
            <CircularProgressCard title={"Pot Odds"} value={potOdds} />
            <CircularProgressCard title={"Equity"} value={equity.equity} />
            <ExpectedValueCard expectedValue={expectedValue} />
          </div>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              borderRadius: 3, // Rounded corners
              backgroundColor: "#F6C667", // Custom background color
              boxShadow: 3, // Adding shadow for a 3D effect
              color: "#133E87",
              "&:hover": {
                backgroundColor: "#ffffff", // Darker green on hover
                boxShadow: 6, // Increased shadow on hover
              },
            }}
            onClick={handleClickOpen}
          >
            Explanation
          </Button>
        </div>
      )}
      {!isValidHand && (
        <div className="flex flex-col h-full items-center justify-center gap-4 text-white">
          <Typography>To see the result, you should enter:</Typography>
          <Typography
            color={nRiver >= 3 && "#90EE90"}
            fontWeight={nRiver >= 3 && "bold"}
          >
            <CheckIcon /> At least the first 3 cards of the river
          </Typography>
          <Typography
            color={nHole >= 2 && "#90EE90"}
            fontWeight={nHole >= 2 && "bold"}
          >
            <CheckIcon /> The 2 cards of the hole
          </Typography>
        </div>
      )}

      <ExplanationDialog
        open={open}
        handleClose={handleClose}
        data={data}
        numCard={nHole + nRiver}
      />
    </div>
  );
}

export default SummaryTable;
