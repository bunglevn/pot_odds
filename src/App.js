import "./App.css";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import SummaryTable from "./components/summary-table/SummaryTable";
import { PlayView } from "./components/PlayView";
import { useState } from "react";

function App() {
  const [potOdds, setPotOdds] = useState(0);
  const [equity, setEquity] = useState(0);
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

  return (
    <div style={{ backgroundColor: "#000000" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid size={2.5}>
            <SummaryTable nRiver={nRiver} nHole={nHole} data={data} />
          </Grid>

          <Grid size={9.5}>
            <PlayView
              getPotOdds={(value) => setPotOdds(value)}
              getEquity={(value) => setEquity(value)}
              getDecision={(value) => setDecision(value)}
              getExpectedValue={(value) => setExpectedValue(value)}
              getOpponentCall={(value) => setOpponentCall(value)}
              getPotValue={(value) => setPotValue(value)}
              getNRiver={(value) => setNRiver(value)}
              getNHole={(value) => setNHole(value)}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
