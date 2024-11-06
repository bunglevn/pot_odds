import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  height: "97.5vh",
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function SummaryTable({potOdds}) {
  return (
    <div>
      <Item>
        <h1>Summary Table</h1>
        <Typography> Pot odds </Typography>
        <Typography> {potOdds} </Typography>
      </Item>
    </div>
  );
}

export default SummaryTable;
