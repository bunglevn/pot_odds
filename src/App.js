import "./App.css";
import SummaryTable from "./components/summary-table/SummaryTable";
import { PlayView } from "./components/PlayView";
import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import rotateImage from "./images/rotate.jpg";

function App() {
  const [potOdds, setPotOdds] = useState(0);
  const [equity, setEquity] = useState({ equity: 0, cases: [] });
  const [decision, setDecision] = useState(false);
  const [expectedValue, setExpectedValue] = useState(0);
  const [opponentCall, setOpponentCall] = useState(0);
  const [potValue, setPotValue] = useState(0);

  const [nRiver, setNRiver] = useState(0);
  const [nHole, setNHole] = useState(0);

  const data = {
    potOdds,
    equity,
    decision,
    expectedValue,
    potValue,
    opponentCall,
  };
  const theme = useTheme();

  const isMdScreen = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(isMdScreen);

  return (
    <>
      <div
        style={{ backgroundColor: "#000000" }}
        className="md:grid md:grid-cols-12 md:h-[100vh] max-h-[70vw]"
      >
        <PlayView
          className="relative flex justify-center items-center md:col-span-10 md:h-full h-[200px] max-h-[70vw]"
          getPotOdds={(value) => setPotOdds(value)}
          getEquity={(value) => setEquity(value)}
          getDecision={(value) => setDecision(value)}
          getExpectedValue={(value) => setExpectedValue(value)}
          getOpponentCall={(value) => setOpponentCall(value)}
          getPotValue={(value) => setPotValue(value)}
          getNRiver={(value) => setNRiver(value)}
          getNHole={(value) => setNHole(value)}
        />
        <SummaryTable
          className="max-h-[100vh] md:col-span-2 md:h-full px-2 text-center p-2 z-10"
          nRiver={nRiver}
          nHole={nHole}
          data={data}
        />
        {isMdScreen && (
          <div className="flex w-full items-center justify-center">
            <img src={rotateImage} className="w-full" />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
