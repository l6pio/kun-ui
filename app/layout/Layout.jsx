import React, {Fragment} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import clsx from "clsx";
import {createMuiTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Menu, {MenuWidth} from "./Menu";
import SysFont from "../fonts/TT Norms Pro Regular.woff";
import SysFontBold from "../fonts/TT Norms Pro Bold.woff";
import SysFontItalic from "../fonts/TT Norms Pro Italic.woff";
import SysFontBoldItalic from "../fonts/TT Norms Pro Bold Italic.woff";

const theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 680,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    palette: {
        primary: {
            main: "#0573B3",
        },
        secondary: {
            main: "#d81b60",
        },
        success: {
            main: "#4caf50",
        },
        info: {
            main: "#2196f3",
        },
        warning: {
            main: "#ff9800",
        },
        error: {
            main: "#f44336",
        },
        contrastText: "#fff",
    },
    props: {
        MuiTextField: {
            margin: "dense"
        },
        MuiFormControl: {
            margin: "dense"
        }
    },
    overrides: {
        MuiTextField: {
            root: {
                margin: 0
            }
        },
        MuiFormControl: {
            root: {
                margin: 0
            },
            fullWidth: {
                margin: 0
            }
        },
        MuiListItemIcon: {
            root: {
                minWidth: "48px"
            },
        },
        MuiLink: {
            root: {
                cursor: "pointer",
            }
        },
    },
    typography: {
        fontSize: 14,
        fontFamily: "TT Norms Pro",
    },
    status: {
        danger: "orange",
    },
});

const useStyles = makeStyles(theme => ({
    main: {
        flexGrow: 1,
        marginLeft: 0,
        padding: theme.spacing(0),
        overflow: "hidden",
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    mainShift: {
        marginLeft: MenuWidth,
    },
    content: {
        minWidth: 430,
        maxWidth: 1180,
        marginLeft: "auto",
        marginRight: "auto",
    },
}));

const Layout = ({history, location, children}) => {
    const classes = useStyles();

    return (
        <Fragment>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    @font-face {
                      font-family: 'TT Norms Pro';
                      src: url(${SysFont}) format('woff');
                    }
                    @font-face {
                      font-family: 'TT Norms Pro';
                      font-weight: bold;
                      src: url(${SysFontBold}) format('woff');
                    }
                    @font-face {
                      font-family: 'TT Norms Pro';
                      font-style: italic;
                      src: url(${SysFontItalic}) format('woff');
                    }
                    @font-face {
                      font-family: 'TT Norms Pro';
                      font-weight: bold;
                      font-style: italic;
                      src: url(${SysFontBoldItalic}) format('woff');
                    }
                  `
                }}
            />
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <Menu history={history} location={location}/>
                <main
                    className={clsx(classes.main, classes.mainShift)}>
                    <Box m={2} className={classes.content}>
                        {children}
                    </Box>
                </main>
            </ThemeProvider>
        </Fragment>
    );
};

export default connect()(withRouter(Layout));
