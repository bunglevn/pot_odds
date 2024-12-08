import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Alert, Typography, useMediaQuery, useTheme } from "@mui/material";
import CardContent from "@mui/material/CardContent";

export function ActionAdviceCard({ title, value, className }) {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      className={className}
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        paddingY: 1,
        paddingX: 0,
      }}
    >
      <div className="items-center font-bold h-full justify-center flex flex-col gap-1 text-[10px] md:text-xs lg:text-xl">
        <span>{title}</span>
        <Alert
          severity={value ? "success" : "warning"}
          sx={{
            fontWeight: "bold",
            fontSize: isMdScreen ? 18 : 20,
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
            height: "40%",
            width: "100%",
          }}
        >
          {value ? "Call" : "Fold"}
        </Alert>
      </div>
    </Card>
  );
}
