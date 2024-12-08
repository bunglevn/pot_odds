import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

export const ExpectedValueCard = ({ expectedValue, className }) => {
  const isWinning = expectedValue >= 0;
  const expectedColor = isWinning ? "green" : "red";
  const status = isWinning ? "Win" : "Lose";
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Card
      className={className}
      sx={{
        paddingY: 1,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <div className="items-center h-full justify-center font-bold flex flex-col gap-1 text-[10px] md:text-xs lg:text-xl">
        <span>Expected</span>
        <span
          style={{
            color: expectedValue > 0 ? "green" : "red",
          }}
        >
          {expectedValue > 0 ? "Win" : "Lose"}
        </span>
        <div className="w-1/3 lg:w-1/2 aspect-square">
          <CircularProgressbar
            styles={buildStyles({
              pathColor: expectedValue > 0 ? "#1d7243" : "red", // Bar color
              trailColor: "#d6d6d6", // Background/trail color
              textColor: expectedValue > 0 ? "#1d7243" : "red", // Text color

              strokeLinecap: "round", // Makes the ends of the bar rounded
              textSize: "16px", // Adjust the text size
            })}
            value={100}
            text={Math.abs(expectedValue).toFixed(2)}
          />
        </div>
      </div>
    </Card>
  );
};
