import React, {useEffect} from "react";
import {connect} from "react-redux";
import {ApiClient} from "../util/ApiClient";
import Box from "@material-ui/core/Box";
import LTable from "../component/table/LTable";
import SearchIcon from "@material-ui/icons/Search";
import Paging from "../component/table/Paging";
import {SaveImageListOrder} from "../reducer/table";
import {isWidthUp, withWidth} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {SaveImageId} from "../reducer/select";
import {niceBytes} from "../Const";

const ImageList = ({dispatch, width, imageListOrder}) => {
    const history = useHistory();
    const apiClient = ApiClient();
    const paging = Paging(imageListOrder.orderBy, imageListOrder.order);
    const upSm = isWidthUp("sm", width);

    useEffect(() => {
        apiClient.get(`/image?page=${paging.page}&order=${paging.order}${paging.orderBy}`).then(res => {
            paging.setData(res.data.slice);
            paging.setPage(res.data.page);
            paging.setPageCount(res.data.pageCount);
            paging.setRowsPerPage(res.data.rowsPerPage);
        });
    }, [paging.trigger]);

    const extraColumns = [
        {
            id: "size",
            label: "Size",
            width: "180px",
            display: v => niceBytes(v)
        },
        {
            id: "usage",
            label: "Pods",
            width: "180px"
        }
    ];

    const columns = [
        {
            id: "name",
            label: "Name"
        },
        ...(upSm ? extraColumns : [])
    ];

    return (
        <Box m="20px">
            <LTable
                id="image-table"
                title={"Image List"}
                columns={columns}
                rows={paging.data}
                onColClick={(orderBy, order) => {
                    dispatch({
                        type: SaveImageListOrder,
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
                                    type: SaveImageId,
                                    value: row.id,
                                });
                                history.push("/image/details");
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
    imageListOrder: state.imageListOrder,
});

export default connect(stateToProps)(withWidth()(ImageList));
