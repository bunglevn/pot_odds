import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
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
        <Typography
          variant="caption"
          component="div"
          sx={{ color: value ? "green" : "red" }}
          fontWeight="bold"
          fontSize={35}
        >
          {value ? "Call" : "Fold"}
        </Typography>
      </CardContent>
    </Card>
  );
}
