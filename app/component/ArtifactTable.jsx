import {connect} from "react-redux";
import {ApiClient} from "../util/ApiClient";
import {Paging} from "./table/Paging";
import React, {useEffect} from "react";
import {LTable} from "./table/LTable";
import {SaveArtifactListOrder} from "../reducer/table";
import SearchIcon from "@material-ui/icons/Search";
import {isWidthUp, withWidth} from "@material-ui/core";
import {SaveArtifact} from "../reducer/select";
import {useHistory} from "react-router-dom";
import {SaveMenuId} from "../reducer/menu";

export const ArtifactTable = connect((state) => ({
    artifactListOrder: state.artifactListOrder,
}))(withWidth()(({dispatch, width, artifactListOrder, image, cve, title, flat}) => {
    const history = useHistory();
    const apiClient = ApiClient();
    const paging = Paging(artifactListOrder.orderBy, artifactListOrder.order);

    const setData = data => {
        paging.setData(data.slice);
        paging.setPage(data.page);
        paging.setPageCount(data.pageCount);
        paging.setRowsPerPage(data.rowsPerPage);
    };

    useEffect(() => {
        if (image) {
            apiClient.get(`/image/${image.id}/artifact?page=${paging.page}&order=${paging.order}${paging.orderBy}`).then(res => setData(res.data));
        } else if (cve) {
            apiClient.get(`/cve/${cve.id}/artifact?page=${paging.page}&order=${paging.order}${paging.orderBy}`).then(res => setData(res.data));
        } else {
            apiClient.get(`/artifact?page=${paging.page}&order=${paging.order}${paging.orderBy}`).then(res => setData(res.data));
        }
    }, [image, cve, paging.trigger]);

    const extraColumns = [
        {
            id: "version",
            label: "Version",
            width: "180px"
        },
        {
            id: "type",
            label: "Type",
            width: "180px"
        }
    ];

    const columns = [
        {
            id: "name",
            label: "Name"
        },
        ...(isWidthUp("md", width) ? extraColumns : [])
    ];

    return (
        <LTable
            id="artifact-table"
            title={title}
            columns={columns}
            rows={paging.data}
            onColClick={(orderBy, order) => {
                dispatch({
                    type: SaveArtifactListOrder,
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
                                type: SaveArtifact,
                                value: {
                                    id: row.id,
                                    name: row.name
                                },
                            });
                            dispatch({
                                type: SaveMenuId,
                                value: 20,
                            });
                            history.push("/artifact/details");
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
