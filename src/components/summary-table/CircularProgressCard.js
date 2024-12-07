import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CardContent from "@mui/material/CardContent";

export function CircularProgressCard({ title, value }) {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (value === 100) {
    value = 100;
  } else {
    value = parseFloat(value.toFixed(1));
  }
  return (
    <Card
      sx={{
        padding: 0,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <div className="items-center">
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          fontSize={isMdScreen ? 10 : 15}
        >
          {title}
        </Typography>
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={value}
            size={isMdScreen ? 35 : 55}
            thickness={5}
            sx={{ color: "#1d7243" }}
          />
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
              fontWeight="bold"
              fontSize={isMdScreen ? 10 : 15}
            >
              {value}%
            </Typography>
          </Box>
        </Box>
      </div>
    </Card>
  );
}
