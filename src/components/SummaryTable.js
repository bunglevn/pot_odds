import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import summaryTableImg from "../images/summaryTable.png";
import {CircularProgressCard} from "./CircularProgressCard";

const Item = styled(Paper)(({ theme }) => ({
    height: "97.5vh",
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
        backgroundColor: "#1A2027",
    }),
}));

function SummaryTable({ potOdds, equity, decision }) {
    return (
        <div>
            <Item>
                <Card sx={{ maxWidth: 345, marginBottom: 1 }}>
                    <CardMedia
                        sx={{ height: 100, marginBottom: 1 }}
                        image={summaryTableImg}
                        title="Cover"
                    />
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h1"
                            align="center"
                            fontWeight="bold"
                        >
                            Summary Table
                        </Typography>
                    </CardContent>
                </Card>

                <CircularProgressCard title={"Pot Odds"} value={potOdds}/>

                <CircularProgressCard title={"Equity"} value={equity}/>

                <Typography mt={2}> Decision </Typography>
                <Typography> {decision} </Typography>
            </Item>
        </div>
    );
}

export default SummaryTable;
