import {connect} from "react-redux";
import React, {useEffect} from "react";
import Box from "@material-ui/core/Box";
import {LTabs} from "../component/LTabs";
import {ApiClient} from "../util/ApiClient";
import {Grid, TextField} from "@material-ui/core";
import {ImageTable} from "../component/ImageTable";
import {ArtifactTable} from "../component/ArtifactTable";

const Profile = connect((state) => ({
    cve: state.cve,
}))(({cve}) => {
    const apiClient = ApiClient();
    const [data, setData] = React.useState({
        id: ""
    });

    useEffect(() => {
        apiClient.get(`/cve/${cve.id}`).then(res => {
            setData(res.data);
        });
    }, [cve]);

    return (
        <Box style={{padding: "25px 0 20px 0"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7} md={8}>
                    <TextField
                        id="cve-id"
                        label="CVE ID"
                        value={data.id}
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

export const CveDetails = connect((state) => ({
    cve: state.cve,
}))(({cve}) => {
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
                        content: <ImageTable cve={cve} artifact={null} flat/>,
                        style: {padding: "0 24px 4px 24px"},
                    },
                    {
                        label: "Artifact",
                        content: <ArtifactTable cve={cve} image={null} flat/>,
                        style: {padding: "0 24px 4px 24px"},
                    }
                ]}/>
        </Box>
    );
});
