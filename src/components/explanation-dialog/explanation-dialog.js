import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PotOddExplanation } from "./pot-odd-explanation";
import { EquityExplanation } from "./equity-explanation";
import { DecisionExplanation } from "./decision-explanation";
import { ExpectedValueExplanation } from "./expected-value-explanation";

export const ExplanationDialog = ({ open, handleClose, data, numCard }) => {
  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
      <DialogTitle>
        Explanation
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
      <DialogContent className="flex flex-col gap-4">
        <PotOddExplanation data={data} />
        <EquityExplanation data={data} numCard={numCard} />
        <DecisionExplanation data={data} />
        <ExpectedValueExplanation data={data} />
      </DialogContent>
    </Dialog>
  );
};
