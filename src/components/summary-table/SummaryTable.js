import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CircularProgressCard } from "./CircularProgressCard";
import { ActionAdviceCard } from "./ActionAdviceCard";
import { useState } from "react";
import { ExpectedValueCard } from "./ExpectedValueCard";

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

function SummaryTable({ potOdds, equity, decision, expectedValue }) {
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

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            More Details
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Add additional information or details about pot odds, equity, and
              decision.
            </Typography>
          </DialogContent>
        </Dialog>
      </Item>
    </div>
  );
}

export default SummaryTable;
