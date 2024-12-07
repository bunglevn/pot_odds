import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export const ExpectedValueCard = ({ expectedValue }) => {
  const isWinning = expectedValue >= 0;
  const expectedColor = isWinning ? "green" : "red";
  const status = isWinning ? "Win" : "Lose";
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <div style={{ padding: 0 }} className="items-center">
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          fontSize={isMdScreen ? 10 : 15}
        >
          Expected
        </Typography>
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={isMdScreen ? 35 : 55}
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
              fontSize={isMdScreen ? 10 : 15}
            >
              {status}
            </Typography>
            <Typography fontSize={isMdScreen ? 10 : 15}>
              {Math.ceil(Math.abs(expectedValue))}
            </Typography>
          </Box>
        </Box>
      </div>
    </Card>
  );
};
