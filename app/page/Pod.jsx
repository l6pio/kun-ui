import React from "react";
import Box from "@material-ui/core/Box";
import {Grid} from "@material-ui/core";
import {PodPhaseAccordion} from "../component/pod/PodPhaseAccordion";
import {PodStatusAccordion} from "../component/pod/PodStatusAccordion";
import {RunningPodAccordion} from "../component/pod/RunningPodAccordion";

export const Pod = () => {
    return (
        <Box m="20px">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12}>
                    <RunningPodAccordion/>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <PodPhaseAccordion/>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <PodStatusAccordion/>
                </Grid>
            </Grid>
        </Box>
    );
};
