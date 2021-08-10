import React, {useEffect} from "react";
import {withStyles} from "@material-ui/core/styles";
import {ApiClient} from "../../util/ApiClient";
import {Divider, ExpansionPanel, ExpansionPanelDetails, Grid} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {LExpansionPanelSummary} from "../common/LExpansionPanelSummary";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import {PodPhaseChart} from "./PodPhaseChart";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export const PodPhaseAccordion = () => {
    const apiClient = ApiClient();
    const [data, setData] = React.useState([]);

    useEffect(() => {
        apiClient.get("/pod/overview").then(res => {
            const total = Object.values(res.data.countByPhase).reduce((a, b) => a + b, 0);
            setData(Object.keys(res.data.countByPhase).map(k => ({
                phase: k,
                count: res.data.countByPhase[k],
                percentage: total > 0 ? Math.round(res.data.countByPhase[k] / total * 100) : 0
            })));
        });
    }, []);

    return (
        <ExpansionPanel defaultExpanded={true}>
            <LExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
                id="count-by-phase"
            >
                <Box align="center" width={1}>
                    <Typography variant="subtitle2">
                        Count By Phase
                    </Typography>
                </Box>
            </LExpansionPanelSummary>
            <ExpansionPanelDetails style={{padding: "5px 20px 15px 20px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}><Divider/></Grid>
                    <Grid item xs={12}>
                        <PodPhaseChart/>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Phase</StyledTableCell>
                                        <StyledTableCell align="right">Count</StyledTableCell>
                                        <StyledTableCell align="right">%</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map(v => (
                                        <StyledTableRow key={v.phase}>
                                            <StyledTableCell component="th" scope="row">
                                                {v.phase}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">{v.count}</StyledTableCell>
                                            <StyledTableCell align="right">{v.percentage}%</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};
