import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import { CircularProgressCard } from "./CircularProgressCard";
import { ActionAdviceCard } from "./ActionAdviceCard";
import { useState } from "react";
import { ExpectedValueCard } from "./ExpectedValueCard";
import { ExplanationDialog } from "../explanation-dialog/explanation-dialog";
import CheckIcon from "@mui/icons-material/Check";

const Item = styled(Paper)(({ theme }) => ({
  height: "97.5vh",
  backgroundColor: "#900C27",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function SummaryTable({ data, nRiver, nHole }) {
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
    <Item sx={{ height: "100%", px: 2 }}>
      {isValidHand && (
        <div className="justify-between flex flex-col gap-2">
          <ActionAdviceCard title={"You should"} value={decision} />
          <CircularProgressCard title={"Pot Odds"} value={potOdds} />
          <CircularProgressCard title={"Equity"} value={equity} />
          <ExpectedValueCard expectedValue={expectedValue} />
          <Button
            variant="contained"
            sx={{
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

      <ExplanationDialog open={open} handleClose={handleClose} data={data} />
    </Item>
  );
}

export default SummaryTable;
