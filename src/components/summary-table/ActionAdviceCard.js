import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Alert, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";

export function ActionAdviceCard({ title, value }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
          {title}
        </Typography>
        <Alert
          severity={value ? "success" : "warning"}
          sx={{ fontSize: 25, justifyContent: "center", alignItems: "center" }}
        >
          {value ? "Call" : "Fold"}
        </Alert>
      </CardContent>
    </Card>
  );
}
