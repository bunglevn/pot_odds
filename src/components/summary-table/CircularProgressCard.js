import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CardContent from "@mui/material/CardContent";

export function CircularProgressCard({ title, value }) {
  if (value === 100) {
    value = 100;
  } else {
    value = parseFloat(value.toFixed(1));
  }
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent className="items-center" sx={{ padding: 0 }}>
        <Typography variant="subtitle1" fontWeight="bold" fontSize={25}>
          {title}
        </Typography>
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={value}
            size={100}
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
              fontSize={25}
            >
              {value}%
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
