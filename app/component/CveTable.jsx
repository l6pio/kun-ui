import {connect} from "react-redux";
import {ApiClient} from "../util/ApiClient";
import {Paging} from "./table/Paging";
import React, {useEffect} from "react";
import {FixState, Severity} from "../Const";
import {LTable} from "./table/LTable";
import {SaveCveListOrder} from "../reducer/table";
import SearchIcon from "@material-ui/icons/Search";
import {isWidthUp, withWidth} from "@material-ui/core";
import {SaveCve} from "../reducer/select";
import {useHistory} from "react-router-dom";
import {SaveMenuId} from "../reducer/menu";

export const CveTable = connect((state) => ({
    cveListOrder: state.cveListOrder,
}))(withWidth()(({dispatch, width, cveListOrder, image, artifact, title, flat}) => {
    const history = useHistory();
    const apiClient = ApiClient();
    const paging = Paging(cveListOrder.orderBy, cveListOrder.order);

    const setData = data => {
        paging.setData(data.slice);
        paging.setPage(data.page);
        paging.setPageCount(data.pageCount);
        paging.setRowsPerPage(data.rowsPerPage);
    };

    useEffect(() => {
        if (image) {
            apiClient.get(`/image/${image.id}/vulnerability?page=${paging.page}&order=${paging.order}${paging.orderBy}`).then(res => setData(res.data));
        } else if (artifact) {
            apiClient.get(`/artifact/${artifact.id}/vulnerability?page=${paging.page}&order=${paging.order}${paging.orderBy}`).then(res => setData(res.data));
        } else {
            apiClient.get(`/cve?page=${paging.page}&order=${paging.order}${paging.orderBy}`).then(res => setData(res.data));
        }
    }, [image, artifact, paging.trigger]);

    const extraColumns = [
        {
            id: "severity",
            label: "Severity",
            width: "180px",
            display: v => Severity[v]
        },
        {
            id: "fixState",
            label: "Fix State",
            width: "180px",
            display: v => FixState[v]
        },
        {
            id: "imageCount",
            label: "Affected Images",
            width: "180px",
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
            title={title}
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
