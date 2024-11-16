import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { CircularProgressCard } from "./CircularProgressCard";
import { ActionAdviceCard } from "./ActionAdviceCard";
import { useState } from "react";
import { ExpectedValueCard } from "./ExpectedValueCard";
import { ExplanationDialog } from "../explanation-dialog/explanation-dialog";

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

function SummaryTable({ data }) {
  const { potOdds, equity, decision, expectedValue } = data;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Item className="flex flex-col gap-4 justify-between">
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

        <ExplanationDialog open={open} handleClose={handleClose} data={data} />
      </Item>
    </div>
  );
}

export default SummaryTable;
