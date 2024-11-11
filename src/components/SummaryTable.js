import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import summaryTableImg from "../images/summaryTable.png";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

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

function SummaryTable({ potOdds, equity, decision }) {
  return (
    <div>
      <Item>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 100 }}
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

        <Typography> Pot odds </Typography>

        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress variant="determinate" value={potOdds} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "text.secondary" }}
            >
              {potOdds.toFixed(1)}
            </Typography>
          </Box>
        </Box>

        <Typography> Equity </Typography>
        <Typography> {equity} </Typography>

        <Typography> Decision </Typography>
        <Typography> {decision} </Typography>
      </Item>
    </div>
  );
}

export default SummaryTable;
