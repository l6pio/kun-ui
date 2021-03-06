import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Divider, Grid, TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {LTabs} from "../component/common/LTabs";
import {ApiClient} from "../util/ApiClient";
import {niceBytes} from "../Const";
import {CveTable} from "../component/cve/CveTable";
import {ImageTimelineChart} from "../component/image/ImageTimelineChart";

const Profile = ({image}) => {
    const apiClient = ApiClient();
    const [totalCve, setTotalCve] = React.useState(0);
    const [data, setData] = React.useState({
        name: "",
        id: "",
        size: 0,
        pods: 0
    });

    useEffect(() => {
        apiClient.get(`/image/${btoa(image.id)}`).then(res => setData(res.data));
        apiClient.get(`/image/${btoa(image.id)}/vulnerability/count`).then(res => setTotalCve(res.data));
    }, [image]);

    return (
        <Box style={{padding: "25px 0 20px 0"}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        id="image-name"
                        label="Image Name"
                        value={data.name}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="image-id"
                        label="Image ID"
                        value={data.id}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        id="image-size"
                        label="Image Size"
                        value={niceBytes(data.size)}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        id="pods"
                        label="Pods"
                        value={data.pods}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                    <TextField
                        id="total-cve"
                        label="Total CVE"
                        value={totalCve}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Divider style={{marginBottom: "15px"}}/>
                    <ImageTimelineChart/>
                </Grid>
            </Grid>
        </Box>
    );
};

export const ImageDetails = connect((state) => ({
    image: state.image
}))(({image}) => {
    const [tabIdx, setTabIdx] = React.useState(0);

    return (
        <Box style={{maxWidth: 1200, margin: "20px"}}>
            <LTabs
                width="1200px" tabIdx={tabIdx}
                setTabIdx={setTabIdx}
                panels={[
                    {
                        label: "Profile",
                        content: <Profile image={image}/>,
                        style: {padding: "0 24px 4px 24px"},
                    },
                    {
                        label: "CVE",
                        content: <CveTable image={image} flat/>,
                        style: {padding: "0 24px 4px 24px"},
                    }
                ]}/>
        </Box>
    );
});
