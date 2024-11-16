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
import CardMedia from "@mui/material/CardMedia";
import summaryTableImg from "../images/summaryTable.png";
import { CircularProgressCard } from "./CircularProgressCard";
import { ActionAdviceCard } from "./ActionAdviceCard";
import { useState } from "react";

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

function SummaryTable({ potOdds, equity, decision }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Item>
        <Card sx={{ width: "100%", marginBottom: 1 }}>
          <CardMedia
            sx={{ height: 130, marginBottom: 1 }}
            image={summaryTableImg}
            title="Cover"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h1"
              align="center"
              fontWeight="bold"
            >
              Summary Table
            </Typography>
          </CardContent>
        </Card>

        <CircularProgressCard title={"Pot Odds"} value={potOdds} />

        <CircularProgressCard title={"Equity"} value={equity} />

        <ActionAdviceCard title={"You should"} value={decision} />

        {/* View More button */}
        <Button
          variant="contained" // You can change it to "outlined" for a border style
          color="primary" // You can change the color to "secondary" or custom color from theme
          sx={{
            height: 50,
            width: "100%",
            mt: 2,
            textDecoration: "underline",
            borderRadius: 3, // Rounded corners
            padding: "10px 20px", // Adjusting padding
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
          View More
        </Button>

        {/* Popup dialog */}
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
