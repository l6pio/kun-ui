import {connect} from "react-redux";
import React, {useEffect} from "react";
import Box from "@material-ui/core/Box";
import {LTabs} from "../component/LTabs";
import {ApiClient} from "../util/ApiClient";
import {Grid, TextField} from "@material-ui/core";
import {ImageTable} from "../component/ImageTable";
import {CveTable} from "../component/CveTable";

const Profile = connect((state) => ({
    artifact: state.artifact,
}))(({artifact}) => {
    const apiClient = ApiClient();
    const [data, setData] = React.useState({
        name: "",
        version: ""
    });

    useEffect(() => {
        apiClient.get(`/artifact/${artifact.id}`).then(res => {
            setData(res.data);
        });
    }, [artifact]);

    return (
        <Box style={{padding: "25px 0 20px 0"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7} md={8}>
                    <TextField
                        id="artifact-name"
                        label="Artifact Name"
                        value={data.name}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={5} md={4}>
                    <TextField
                        id="artifact-version"
                        label="Artifact Version"
                        value={data.version}
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
});

export const ArtifactDetails = connect((state) => ({
    artifact: state.artifact,
}))(({artifact}) => {
    const [tabIdx, setTabIdx] = React.useState(0);

    return (
        <Box style={{maxWidth: 1200, margin: "20px"}}>
            <LTabs
                width="1200px" tabIdx={tabIdx}
                setTabIdx={setTabIdx}
                panels={[
                    {
                        label: "Profile",
                        content: <Profile/>,
                        style: {padding: "0 24px 4px 24px"},
                    },
                    {
                        label: "Image",
                        content: <ImageTable artifact={artifact} cve={null} flat/>,
                        style: {padding: "0 24px 4px 24px"},
                    },
                    {
                        label: "CVE",
                        content: <CveTable artifact={artifact} image={null} flat/>,
                        style: {padding: "0 24px 4px 24px"},
                    }
                ]}/>
        </Box>
    );
});
