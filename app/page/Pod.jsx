import React, {useEffect} from "react";
import Box from "@material-ui/core/Box";
import {LTabs} from "../component/LTabs";
import {ApiClient} from "../util/ApiClient";
import {Grid, TextField} from "@material-ui/core";
import {PodStatusChart} from "../component/chart/PodStatusChart";

const Overview = () => {
    const apiClient = ApiClient();
    const [data, setData] = React.useState({
        count: "",
        countByStatus: {},
    });

    useEffect(() => {
        apiClient.get("/pod/overview").then(res => {
            setData(res.data);
        });
    }, []);

    return (
        <Box style={{padding: "25px 0 20px 0"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12}>
                    <PodStatusChart/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        id="total-pods"
                        label="Total Pods"
                        value={data.count}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export const Pod = () => {
    const [tabIdx, setTabIdx] = React.useState(0);

    return (
        <Box m="20px">
            <LTabs
                width="1200px" tabIdx={tabIdx}
                setTabIdx={setTabIdx}
                panels={[
                    {
                        label: "Overview",
                        content: <Overview/>,
                        style: {padding: "0 24px 4px 24px"},
                    },
                    {
                        label: "Running Pods",
                        content: <div/>,
                        style: {padding: "0 24px 4px 24px"},
                    }
                ]}/>
        </Box>
    );
};
