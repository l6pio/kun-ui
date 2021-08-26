import React, {useEffect} from "react";
import {withStyles} from "@material-ui/core/styles";
import {Accordion, AccordionDetails, Button, Divider, Grid} from "@material-ui/core";
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

export const NamespaceAccordion = ({data}) => {
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        const v = data.countByNamespace;
        const namespaces = Object.keys(v).map(k => ({
            namespace: k,
            count: v[k],
            percentage: data.total > 0 ? Math.round(v[k] / data.total * 100) : 0
        })).sort((a, b) => a.count > b.count ? -1 : a.count < b.count ? 1 : 0).slice(0, 10);
        setRows(namespaces);
    }, [data]);

    return (
        <Accordion defaultExpanded={true}>
            <LAccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Box align="center" width={1}>
                    <Typography variant="subtitle2">
                        Top 10 Namespaces
                    </Typography>
                </Box>
            </LAccordionSummary>
            <AccordionDetails style={{padding: "5px 20px 15px 20px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}><Divider/></Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Namespace</StyledTableCell>
                                        <StyledTableCell align="right">Count</StyledTableCell>
                                        <StyledTableCell align="right">%</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(v => (
                                        <StyledTableRow key={v.namespace}>
                                            <StyledTableCell component="th" scope="row">{v.namespace}</StyledTableCell>
                                            <StyledTableCell align="right">{v.count}</StyledTableCell>
                                            <StyledTableCell align="right">{v.percentage}%</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <Box width={1} align="right" paddingTop="10px">
                            <Button
                                variant="outlined" size="small" color="primary"
                                onClick={() => {
                                }}>
                                More ...
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};
