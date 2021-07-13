import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Grid, TextField} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import LTabs from "../component/LTabs";
import {ApiClient} from "../util/ApiClient";
import {SaveImageTabIdx} from "../reducer/menu";
import LTable from "../component/table/LTable";
import {SaveArtifactListOrder, SaveCveListOrder} from "../reducer/table";
import SearchIcon from "@material-ui/icons/Search";
import Paging from "../component/table/Paging";
import {niceBytes, Severity} from "../Const";

const Profile = connect((state) => ({
    imageId: state.imageId,
}))(({imageId}) => {
    const apiClient = ApiClient();
    const [data, setData] = React.useState({
        name: "",
        id: "",
        size: 0,
        usage: 0
    });

    useEffect(() => {
        apiClient.get(`/image/${imageId}`).then(res => {
            setData(res.data);
        });
    }, [imageId]);

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
                <Grid item xs={12} sm={6} md={3}>
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
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        id="pods"
                        label="Pods"
                        value={data.usage}
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

const Artifact = connect((state) => ({
    imageId: state.imageId,
    artifactListOrder: state.artifactListOrder,
}))(({dispatch, imageId, artifactListOrder}) => {
    const apiClient = ApiClient();
    const paging = Paging(artifactListOrder.orderBy, artifactListOrder.order);

    useEffect(() => {
        apiClient.get(`/image/${imageId}/artifact?page=${paging.page}&order=${paging.order}${paging.orderBy}`).then(res => {
            paging.setData(res.data.slice);
            paging.setPage(res.data.page);
            paging.setPageCount(res.data.pageCount);
            paging.setRowsPerPage(res.data.rowsPerPage);
        });
    }, [imageId, paging.trigger]);

    const columns = [
        {
            id: "name",
            label: "Name"
        }
    ];

    return (
        <LTable
            id="artifact-table"
            columns={columns}
            rows={paging.data}
            onColClick={(orderBy, order) => {
                dispatch({
                    type: SaveArtifactListOrder,
                    value: {orderBy, order},
                });
            }}
            actions={[
                () => (
                    {
                        icon: <SearchIcon/>,
                        name: "Check",
                        onClick: () => {
                        },
                    }
                ),
            ]}
            emptyHint={"No records exist"}
            paging={paging}
            showHeader
            flat
        />
    );
});

const CVE = connect((state) => ({
    imageId: state.imageId,
    cveListOrder: state.cveListOrder,
}))(({dispatch, imageId, cveListOrder}) => {
    const apiClient = ApiClient();
    const paging = Paging(cveListOrder.orderBy, cveListOrder.order);

    useEffect(() => {
        apiClient.get(`/image/${imageId}/vulnerability?page=${paging.page}&order=${paging.order}${paging.orderBy}`).then(res => {
            paging.setData(res.data.slice);
            paging.setPage(res.data.page);
            paging.setPageCount(res.data.pageCount);
            paging.setRowsPerPage(res.data.rowsPerPage);
        });
    }, [imageId, paging.trigger]);

    const columns = [
        {
            id: "id",
            label: "ID"
        },
        {
            id: "severity",
            label: "Severity",
            width: "180px",
            display: v => Severity[v]
        }
    ];

    return (
        <LTable
            id="cve-table"
            columns={columns}
            rows={paging.data}
            onColClick={(orderBy, order) => {
                dispatch({
                    type: SaveCveListOrder,
                    value: {orderBy, order},
                });
            }}
            actions={[
                () => (
                    {
                        icon: <SearchIcon/>,
                        name: "Check",
                        onClick: () => {
                        },
                    }
                ),
            ]}
            emptyHint={"No records exist"}
            paging={paging}
            showHeader
            flat
        />
    );
});

const ImageDetails = connect((state) => ({
    tabIdx: state.imageTabIdx,
}))(({dispatch, tabIdx}) => {
    return (
        <Box style={{maxWidth: 1200, margin: "20px"}}>
            <LTabs
                width="1200px" tabIdx={tabIdx}
                setTabIdx={idx => {
                    dispatch({
                        type: SaveImageTabIdx,
                        value: idx,
                    });
                }}
                panels={[
                    {
                        label: "Profile",
                        content: <Profile/>,
                        style: {padding: "0 24px 4px 24px"},
                    },
                    {
                        label: "Artifact",
                        content: <Artifact/>,
                        style: {padding: "0 24px 4px 24px"},
                    },
                    {
                        label: "CVE",
                        content: <CVE/>,
                        style: {padding: "0 24px 4px 24px"},
                    }
                ]}/>
        </Box>
    );
});

export default ImageDetails;
