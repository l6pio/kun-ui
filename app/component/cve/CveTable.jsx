import {connect} from "react-redux";
import {ApiClient} from "../../util/ApiClient";
import {Paging} from "../common/table/Paging";
import React, {useEffect} from "react";
import {FixState, Severity} from "../../Const";
import {LTable} from "../common/table/LTable";
import {SaveCveListOrder} from "../../reducer/table";
import SearchIcon from "@material-ui/icons/Search";
import {FormControl, isWidthUp, MenuItem, Select, Typography, withWidth} from "@material-ui/core";
import {SaveCve} from "../../reducer/select";
import {useHistory} from "react-router-dom";
import {SaveMenuId} from "../../reducer/menu";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    tableTitle: {
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "row",
        justifyContent: "space-between"
    }
}));

const CveTableTitle = ({title, artifacts, selectedArtId, setSelectedArtId}) => {
    const classes = useStyles();

    const Title = () => (
        <Typography variant="h5" style={{lineHeight: "52px", paddingLeft: "20px"}}>{title}</Typography>
    );

    const ArtifactSelect = () => (
        <FormControl variant="outlined">
            <Select
                value={selectedArtId}
                onChange={e => setSelectedArtId(e.target.value)}
                displayEmpty
            >
                <MenuItem value="">All Artifacts</MenuItem>
                {artifacts.map(v => <MenuItem key={v.id} value={v.id}>{v.name}:{v.version}</MenuItem>)}
            </Select>
        </FormControl>
    );

    if (title && artifacts.length > 0) {
        return (
            <div className={classes.tableTitle}>
                <div><Title/></div>
                <div><ArtifactSelect/></div>
            </div>
        );
    } else if (title) {
        return <Title/>;
    } else if (artifacts.length > 0) {
        return <ArtifactSelect/>;
    } else {
        return null;
    }
};

export const CveTable = connect((state) => ({
    cveListOrder: state.cveListOrder,
}))(withWidth()(({dispatch, width, cveListOrder, image, title, flat}) => {
    const history = useHistory();
    const apiClient = ApiClient();
    const paging = Paging(cveListOrder.orderBy, cveListOrder.order);
    const [artifacts, setArtifacts] = React.useState([]);
    const [selectedArtId, setSelectedArtId] = React.useState("");

    const setData = data => {
        paging.setData(data.slice);
        paging.setPage(data.page);
        paging.setPageCount(data.pageCount);
        paging.setRowsPerPage(data.rowsPerPage);
    };

    useEffect(() => {
        if (selectedArtId) {
            apiClient.get(`/artifact/${selectedArtId}/vulnerability?page=${paging.page}&order=${paging.order}${paging.orderBy}`).then(res => setData(res.data));
        } else if (image) {
            apiClient.get(`/image/${btoa(image.id)}/artifact`).then(res => setArtifacts(res.data.slice));
            apiClient.get(`/image/${btoa(image.id)}/vulnerability?page=${paging.page}&order=${paging.order}${paging.orderBy}`).then(res => setData(res.data));
        } else {
            apiClient.get(`/cve?page=${paging.page}&order=${paging.order}${paging.orderBy}`).then(res => setData(res.data));
        }
    }, [image, selectedArtId, paging.trigger]);

    const extraColumns = [
        {
            id: "severity",
            label: "Severity",
            width: "180px",
            display: v => Severity[v]
        },
        {
            id: "cvssBaseScore",
            label: "CVSS Base",
            width: "180px",
        },
        {
            id: "fixState",
            label: "Fix State",
            width: "180px",
            display: v => FixState[v]
        }
    ];

    const columns = [
        {
            id: "id",
            label: "ID",
        },
        ...(isWidthUp("md", width) ? extraColumns : [])
    ];

    return (
        <LTable
            id="cve-table"
            title={
                title || artifacts.length > 0 ?
                    <CveTableTitle
                        title={title}
                        artifacts={artifacts}
                        selectedArtId={selectedArtId}
                        setSelectedArtId={setSelectedArtId}
                    /> : null
            }
            columns={columns}
            rows={paging.data}
            onColClick={(orderBy, order) => {
                dispatch({
                    type: SaveCveListOrder,
                    value: {orderBy, order},
                });
            }}
            actions={[
                row => (
                    {
                        icon: <SearchIcon/>,
                        name: "Check",
                        onClick: () => {
                            dispatch({
                                type: SaveCve,
                                value: {
                                    id: row.id
                                },
                            });
                            dispatch({
                                type: SaveMenuId,
                                value: 30,
                            });
                            history.push("/cve/details");
                        },
                    }
                ),
            ]}
            emptyHint={"No records exist"}
            paging={paging}
            showHeader
            flat={flat}
        />
    );
}));
