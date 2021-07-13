import React, {Fragment} from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const StyledTabs = withStyles(theme => ({
    root: {
        borderBottom: "1px solid #e8e8e8",
    },
    indicator: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "transparent",
        "& > div": {
            width: "100%",
            backgroundColor: theme.palette.primary.light,
        },
    },
}))(props => <Tabs {...props} TabIndicatorProps={{children: <div/>}}/>);

const StyledTab = withStyles(theme => ({
    root: {
        textTransform: "none",
        color: theme.palette.text.primary,
        padding: "6px 24px",
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: "16px",
        marginRight: theme.spacing(1),
        minWidth: 0,
        "&:focus": {
            opacity: 1,
        },
    },
}))(props => <Tab disableRipple {...props} />);

function LTabPanel({children, value, index, style}) {
    return (
        <Fragment key={`tab-panel-${index}`}>
            {value === index && <div style={style || {}}>{children}</div>}
        </Fragment>
    );
}

const LTabs = ({panels, tabIdx, setTabIdx, width}) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} style={{maxWidth: width, marginLeft: "auto", marginRight: "auto"}}>
            <StyledTabs
                value={tabIdx}
                variant="scrollable"
                scrollButtons="auto"
                onChange={(event, newIdx) => setTabIdx(newIdx)}
            >
                {panels.map((v, i) => <StyledTab key={i} label={v.label}/>)}
            </StyledTabs>
            {panels.map((v, idx) =>
                <LTabPanel
                    key={idx}
                    value={tabIdx}
                    index={idx}
                    style={v.style}
                >
                    {v.content}
                </LTabPanel>
            )}
        </Paper>
    );
};

export default LTabs;
