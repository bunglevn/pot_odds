import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Alert, Typography, useMediaQuery, useTheme } from "@mui/material";
import CardContent from "@mui/material/CardContent";

export function ActionAdviceCard({ title, value }) {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <div style={{ padding: 2 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          fontSize={isMdScreen ? 10 : 15}
        >
          {title}
        </Typography>
        <Alert
          severity={value ? "success" : "warning"}
          sx={{
            fontSize: isMdScreen ? 10 : 15,
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
          }}
        >
          {value ? "Call" : "Fold"}
        </Alert>
      </div>
    </Card>
  );
}
