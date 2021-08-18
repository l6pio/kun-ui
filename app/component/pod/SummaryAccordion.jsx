import React from "react";
import {Accordion, AccordionDetails, Divider, Grid, TextField} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {LAccordionSummary} from "../common/LAccordionSummary";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export const SummaryAccordion = ({data}) => {
    return (
        <Accordion defaultExpanded={true}>
            <LAccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Box align="center" width={1}>
                    <Typography variant="subtitle2">
                        Summary
                    </Typography>
                </Box>
            </LAccordionSummary>
            <AccordionDetails style={{padding: "5px 20px 15px 20px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}><Divider/></Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="total-pods"
                            label="Total Pods"
                            value={data.total}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="running-pods"
                            label="Running Pods"
                            value={data.totalRunning}
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};
