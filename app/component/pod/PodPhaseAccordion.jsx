import React, {useEffect} from "react";
import {withStyles} from "@material-ui/core/styles";
import {Accordion, AccordionDetails, Divider, Grid} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {LAccordionSummary} from "../common/LAccordionSummary";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import ReactApexChart from "react-apexcharts";

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

const chartOptions = labels => {
    return {
        labels: labels,
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: "bottom"
                }
            }
        }]
    };
};

const PodPhaseChart = ({rows}) => {
    return (
        <ReactApexChart
            options={chartOptions(rows.map(v => v.phase))}
            series={rows.map(v => v.count)}
            type="pie"
            height="250"
        />
    );
};

export const PodPhaseAccordion = ({data}) => {
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        const v = data.countByPhase;
        const total = Object.values(v).reduce((a, b) => a + b, 0);
        setRows(
            Object.keys(v).map(k => ({
                phase: k,
                count: v[k],
                percentage: total > 0 ? Math.round(v[k] / total * 100) : 0
            })).sort((a, b) => a.count > b.count ? -1 : a.count < b.count ? 1 : 0)
        );
    }, [data]);

    return (
        <Accordion defaultExpanded={true}>
            <LAccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Box align="center" width={1}>
                    <Typography variant="subtitle2">
                        Count By Phase
                    </Typography>
                </Box>
            </LAccordionSummary>
            <AccordionDetails style={{padding: "5px 20px 15px 20px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}><Divider/></Grid>
                    <Grid item xs={12}>
                        <PodPhaseChart rows={rows}/>
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
                                    {rows.map(v => (
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
            </AccordionDetails>
        </Accordion>
    );
};
