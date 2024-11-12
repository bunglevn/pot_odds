import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

export function ActionAdviceCard({ title, value }) {
    return (
        <Card
            sx={{
                maxWidth: 270,
                margin: "auto",
                padding: 2,
                borderRadius: 3,
                boxShadow: 3,
                mt: 2,
                display: "flex",
                flexDirection: "row",
            }}
        >
            <Grid container>
                {/* Left half for title */}
                <Grid
                    item
                    xs={6}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="subtitle1" fontWeight="bold" fontSize={20}>
                        {title}
                    </Typography>
                </Grid>

                {/* Right half for value with red fill */}
                <Grid
                    item
                    xs={6}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "red",
                        borderRadius : 3
                    }}
                >
                    <Typography
                        variant="caption"
                        component="div"
                        sx={{ color: "white" }}
                        fontWeight="bold"
                        fontSize={25}
                    >
                        {value ? "Call" : "Fold"}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    );
}
