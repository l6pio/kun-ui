import React, {useEffect} from "react";
import {withStyles} from "@material-ui/core/styles";
import {ApiClient} from "../../util/ApiClient";
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

const PodStatusChart = ({data}) => {
    return (
        <ReactApexChart
            options={chartOptions(data.map(v => v.phase))}
            series={data.map(v => v.count)}
            type="pie"
            height="250"
        />
    );
};

export const PodStatusAccordion = () => {
    const apiClient = ApiClient();
    const [data, setData] = React.useState([]);

    useEffect(() => {
        apiClient.get("/pod/overview").then(res => {
            const data = res.data.countByStatus;
            const total = Object.values(data).reduce((a, b) => a + b, 0);
            setData(
                Object.keys(data).map(k => ({
                    phase: k,
                    count: data[k],
                    percentage: total > 0 ? Math.round(data[k] / total * 100) : 0
                })).sort((a, b) => a.count > b.count ? -1 : a.count < b.count ? 1 : 0)
            );
        });
    }, []);

    return (
        <Accordion defaultExpanded={true}>
            <LAccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                id="count-by-status"
            >
                <Box align="center" width={1}>
                    <Typography variant="subtitle2">
                        Count By Status
                    </Typography>
                </Box>
            </LAccordionSummary>
            <AccordionDetails style={{padding: "5px 20px 15px 20px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}><Divider/></Grid>
                    <Grid item xs={12}>
                        <PodStatusChart data={data}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Status</StyledTableCell>
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
            </AccordionDetails>
        </Accordion>
    );
};
