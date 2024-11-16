import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const ExpectedValueCard = ({ expectedValue }) => {
  const isWinning = expectedValue >= 0;
  const expectedColor = isWinning ? "green" : "red";
  const status = isWinning ? "Win" : "Lose";
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent sx={{ padding: 0 }} className="items-center">
        <Typography variant="subtitle1" fontWeight="bold" fontSize={25}>
          Expected Value
        </Typography>
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={100}
            thickness={5}
            sx={{ color: expectedColor }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              sx={{ color: expectedColor }}
              fontWeight="bold"
              fontSize={15}
            >
              {status}
            </Typography>
            <Typography>{Math.ceil(Math.abs(expectedValue))}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
