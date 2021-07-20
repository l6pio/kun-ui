import React from "react";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {SaveMenuId} from "../reducer/menu";
import Typography from "@material-ui/core/Typography";
import BugReportIcon from "@material-ui/icons/BugReport";
import LayersIcon from "@material-ui/icons/Layers";
import {useHistory} from "react-router-dom";

export const MenuWidth = 200;

const useMenuStyles = makeStyles(theme => ({
    menuPaper: {
        width: MenuWidth,
        backgroundColor: "#0573B3",
        color: "white",
    },
    menuHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1, 0, 2.5),
        ...theme.mixins.toolbar,
        justifyContent: "flex-start"
    },
    menuSubHeader: {
        color: "white",
        fontWeight: "bold",
        fontSize: "12px"
    },
}));

const menuItems = {
    10: {
        label: <Typography variant="body1">{"Image"}</Typography>,
        path: "/image",
        icon: <LayersIcon style={{color: "white"}}/>
    },
    20: {
        label: <Typography variant="body1">{"CVE"}</Typography>,
        path: "/cve",
        icon: <BugReportIcon style={{color: "white"}}/>
    },
};

export function gotoPage(history, dispatch, menuId) {
    dispatch({
        type: SaveMenuId,
        value: menuId,
    });
    history.push(menuItems[menuId].path);
}

const MenuItem = ({history, dispatch, id, menuId}) => {
    return (
        <ListItem
            button
            selected={id === menuId}
            onClick={() => gotoPage(history, dispatch, id)}
        >
            <ListItemIcon>{menuItems[id].icon}</ListItemIcon>
            <ListItemText primary={menuItems[id].label}/>
        </ListItem>
    );
};

export const Menu = connect((state) => ({
    menuId: state.menuId,
}))(({dispatch, menuId}) => {
    const history = useHistory();
    const classes = useMenuStyles();

    return (
        <Drawer
            variant={"persistent"}
            anchor="left"
            open={true}
            classes={{
                paper: classes.menuPaper,
            }}
        >
            <div className={classes.menuHeader}>
                <Typography variant="h5">
                    Kun
                </Typography>
            </div>
            <Divider/>
            <List>
                <MenuItem history={history} dispatch={dispatch} id={10} menuId={menuId}/>
                <MenuItem history={history} dispatch={dispatch} id={20} menuId={menuId}/>
            </List>
        </Drawer>
    );
});
