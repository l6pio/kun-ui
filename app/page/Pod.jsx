import React, {useEffect} from "react";
import Box from "@material-ui/core/Box";
import {Grid} from "@material-ui/core";
import {PodPhaseAccordion} from "../component/pod/PodPhaseAccordion";
import {PodStatusAccordion} from "../component/pod/PodStatusAccordion";
import {RunningPodTimelineAccordion} from "../component/pod/RunningPodTimelineAccordion";
import {SummaryAccordion} from "../component/pod/SummaryAccordion";
import {ApiClient} from "../util/ApiClient";

export const Pod = () => {
    const apiClient = ApiClient();
    const [data, setData] = React.useState({
        total: 0,
        totalRunning: 0,
        countByPhase: {},
        countByStatus: {}
    });

    useEffect(() => {
        apiClient.get("/pod/count").then(res => setData(res.data));
    }, []);

    return (
        <Box m="20px">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12}>
                    <RunningPodTimelineAccordion/>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <SummaryAccordion data={data}/>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <PodPhaseAccordion data={data}/>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <PodStatusAccordion data={data}/>
                </Grid>
            </Grid>
        </Box>
    );
};
