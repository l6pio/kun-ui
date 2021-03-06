import {connect} from "react-redux";
import {isWidthUp, Typography, withWidth} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {ApiClient} from "../../util/ApiClient";
import {Paging} from "../common/table/Paging";
import React, {useEffect} from "react";
import {niceBytes} from "../../Const";
import {LTable} from "../common/table/LTable";
import {SaveImageListOrder} from "../../reducer/table";
import SearchIcon from "@material-ui/icons/Search";
import {SaveImage} from "../../reducer/select";
import {SaveMenuId} from "../../reducer/menu";

export const ImageTable = connect((state) => ({
    imageListOrder: state.imageListOrder,
}))(withWidth()(({dispatch, width, imageListOrder, cve, title, flat}) => {
    const history = useHistory();
    const apiClient = ApiClient();
    const paging = Paging(imageListOrder.orderBy, imageListOrder.order);

    const Title = () => (
        <Typography variant="h5" style={{lineHeight: "52px", paddingLeft: "20px"}}>{title}</Typography>
    );

    const setData = data => {
        paging.setData(data.slice);
        paging.setPage(data.page);
        paging.setPageCount(data.pageCount);
        paging.setRowsPerPage(data.rowsPerPage);
    };

    useEffect(() => {
        if (cve) {
            apiClient.get(`/cve/${cve.id}/image?page=${paging.page}&order=${paging.order}${paging.orderBy}`).then(res => setData(res.data));
        } else {
            apiClient.get(`/image?page=${paging.page}&order=${paging.order}${paging.orderBy}`).then(res => setData(res.data));
        }
    }, [cve, paging.trigger]);

    const extraColumns = [
        {
            id: "size",
            label: "Size",
            width: "180px",
            display: v => niceBytes(v)
        },
        {
            id: "pods",
            label: "Pods",
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
            id="image-table"
            title={<Title/>}
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
                                type: SaveImage,
                                value: {
                                    id: row.id,
                                    name: row.name
                                },
                            });
                            dispatch({
                                type: SaveMenuId,
                                value: 10,
                            });
                            history.push("/image/details");
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
