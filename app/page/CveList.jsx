import React, {useEffect} from "react";
import {connect} from "react-redux";
import {ApiClient} from "../util/ApiClient";
import Box from "@material-ui/core/Box";
import LTable from "../component/table/LTable";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Paging from "../component/table/Paging";
import {SaveCveListOrder} from "../reducer/table";
import {FixState, Severity} from "../Const";

const CveList = ({dispatch, cveListOrder}) => {
    const apiClient = ApiClient();
    const paging = Paging(cveListOrder.orderBy, cveListOrder.order);

    useEffect(() => {
        apiClient.get(`/cve?page=${paging.page}&order=${paging.order}${paging.orderBy}`).then(res => {
            paging.setData(res.data.slice.map(v => ({
                id: v.id,
                severity: v.severity,
                fixState: v.fixState,
                imageCount: v.imageCount
            })));
            paging.setPage(res.data.page);
            paging.setPageCount(res.data.pageCount);
            paging.setRowsPerPage(res.data.rowsPerPage);
        });
    }, [paging.trigger]);

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
        <Box m="20px">
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

export default connect(stateToProps)(CveList);
