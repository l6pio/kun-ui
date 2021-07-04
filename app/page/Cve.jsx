import React, {useEffect} from "react";
import {connect} from "react-redux";
import {ApiClient} from "../util/ApiClient";
import Box from "@material-ui/core/Box";
import LTable from "../component/table/LTable";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Paging from "../component/table/Paging";
import {SaveCveListOrder} from "../reducer/order";

const Severity = {
    4: "High",
    3: "Medium",
    2: "Low",
    1: "Negligible",
    0: "Unknown"
};

const FixState = {
    3: "Fixed",
    2: "Not Fixed",
    1: "Won't Fix",
    0: "Unknown"
};

const Cve = ({dispatch, cveListOrder}) => {
    const apiClient = ApiClient();
    const paging = Paging(cveListOrder.orderBy, cveListOrder.order);

    const listCves = () => {
        apiClient.get(`/cve?page=${paging.page}&order=${paging.order}${paging.orderBy}`).then(res => {
            const data = res.data.result;
            paging.setData(data.slice.map(v => ({
                id: v.id,
                severity: v.severity,
                fixState: v.fixState,
                imageCount: v.imageCount
            })));
            paging.setPage(data.page);
            paging.setPageCount(data.pageCount);
            paging.setRowsPerPage(data.rowsPerPage);
        });
    };

    useEffect(() => listCves(), [paging.trigger]);

    const columns = [
        {
            id: "id",
            label: "ID",
        },
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

    return (
        <Box m="10px">
            <LTable
                id="cve-table"
                title={"CVE List"}
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
                            icon: <DashboardIcon/>,
                            name: "Check",
                            onClick: () => {
                            },
                        }
                    ),
                ]}
                emptyHint={"No records exist"}
                paging={paging}
                showHeader
            />
        </Box>
    );
};

const stateToProps = (state) => ({
    cveListOrder: state.cveListOrder,
});

export default connect(stateToProps)(Cve);
