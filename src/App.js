import "./App.css";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import SummaryTable from "./components/SummaryTable";
import { PlayView } from "./components/PlayView";
import { useState } from "react";

function App() {
  const [potOdds, setPotOdds] = useState(0);
  return (
    <div style={{ backgroundColor: "#000000" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          {/* Left side with SummaryTable, taking up 3 out of 12 columns */}
          <Grid size={2.5}>
            <SummaryTable potOdds={potOdds} />
          </Grid>

          {/* Right side with PlayView, taking up the remaining 9 out of 12 columns */}
          <Grid size={9.5}>
            <PlayView getPotOdds={(value) => setPotOdds(value)} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
