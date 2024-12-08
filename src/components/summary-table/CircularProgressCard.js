import Card from "@mui/material/Card";
import { useTheme } from "@mui/material";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function CircularProgressCard({ title, value, className }) {
  if (value === 100) {
    value = 100;
  } else {
    value = parseFloat(value.toFixed(1));
  }
  return (
    <Card
      className={className}
      sx={{
        paddingY: 1,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <div className="flex flex-col justify-center h-full items-center font-bold flex flex-col gap-1 text-[10px] md:text-xs lg:text-xl">
        <span>{title}</span>
        <div className="md:w-1/3 w-1/2 lg:w-8/12 xl:w-1/2 aspect-square">
          <CircularProgressbar
            styles={buildStyles({
              pathColor: "#1d7243", // Bar color
              trailColor: "#d6d6d6", // Background/trail color
              textColor: "#1d7243", // Text color

              strokeLinecap: "round", // Makes the ends of the bar rounded
              textSize: "16px", // Adjust the text size
            })}
            value={value}
            text={value + "%"}
          />
        </div>
      </div>
    </Card>
  );
}
