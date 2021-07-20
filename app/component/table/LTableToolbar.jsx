import React, {Fragment} from "react";
import clsx from "clsx";
import {lighten, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useToolbarStyles = makeStyles(theme => ({
    root: {
        padding: "0",
        borderBottom: "2px solid #272C34",
    },
    highlight: {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    },
    title: {
        flex: "1 1 100%",
        fontWeight: "bold"
    }
}));

export const LTableToolbar = ({title, selected, toolbar}) => {
    const classes = useToolbarStyles();
    const totalSelected = selected.length;

    return (
        <Toolbar className={clsx(classes.root, {
            [classes.highlight]: totalSelected > 0,
        })}>
            {totalSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1">
                    {totalSelected} selected
                </Typography>
            ) : (
                <Fragment>
                    {title}
                </Fragment>
            )}
            {toolbar && toolbar(selected)}
        </Toolbar>
    );
};
