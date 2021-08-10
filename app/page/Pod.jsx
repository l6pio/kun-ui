import React from "react";
import Box from "@material-ui/core/Box";
import {Grid} from "@material-ui/core";
import {PodPhaseAccordion} from "../component/pod/PodPhaseAccordion";

export const Pod = () => {
    return (
        <Box m="20px">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6}>
                    <PodPhaseAccordion/>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                </Grid>
            </Grid>
        </Box>
    );
};
