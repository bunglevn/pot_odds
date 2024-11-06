import './App.css';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import SummaryTable from "./components/SummaryTable";
import PlayView from "./components/PlayView";

function App() {
  return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            {/* Left side with SummaryTable, taking up 3 out of 12 columns */}
            <Grid size={2.5}>
              <SummaryTable />
            </Grid>

            {/* Right side with PlayView, taking up the remaining 9 out of 12 columns */}
            <Grid size={9.5}>
              <PlayView />
            </Grid>
          </Grid>
        </Box>
      </div>
  );
}

export default App;
