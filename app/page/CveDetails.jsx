import {connect} from "react-redux";
import React, {useEffect} from "react";
import Box from "@material-ui/core/Box";
import {LTabs} from "../component/LTabs";
import {ApiClient} from "../util/ApiClient";
import {Grid, IconButton, InputAdornment, TableCell, TextField} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import {ImageTable} from "../component/ImageTable";
import {FixState, Severity} from "../Const";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import {withStyles} from "@material-ui/styles";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14,
        padding: "10px"
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        }
    },
}))(TableRow);

const Profile = connect((state) => ({
    cve: state.cve,
}))(({cve}) => {
    const apiClient = ApiClient();
    const [data, setData] = React.useState({
        id: "",
        severity: 0,
        cvssBaseScore: "",
        cvssExploitScore: "",
        cvssImpactScore: "",
        description: "",
        fixState: 0,
        fixVersions: [],
        urls: []
    });

    useEffect(() => {
        apiClient.get(`/cve/${cve.id}`).then(res => {
            setData(res.data);
        });
    }, [cve]);

    return (
        <Box style={{padding: "25px 0 20px 0"}}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        id="id"
                        label="ID"
                        value={data.id}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end">
                                        <OpenInNewIcon fontSize="small"/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        id="severity"
                        label="Severity"
                        value={Severity[data.severity]}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        id="cvss-base-score"
                        label="CVSS Base Score"
                        value={data.cvssBaseScore}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        id="cvss-exploit-score"
                        label="CVSS Exploit Score"
                        value={data.cvssExploitScore}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        id="cvss-impact-score"
                        label="CVSS Impact Score"
                        value={data.cvssImpactScore}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                        id="description"
                        label="Description"
                        value={data.description}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        multiline
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        id="fix-state"
                        label="Fix State"
                        value={FixState[data.fixState]}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <TextField
                        id="fix-versions"
                        label="Fix Versions"
                        value={data.fixVersions.length > 0 ? data.fixVersions.join(",") : "None"}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TableContainer component={Box}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>URL</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.urls.map((url) => (
                                    <StyledTableRow key={url}>
                                        <StyledTableCell component="th" scope="row">{url}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
});

export const CveDetails = connect((state) => ({
    cve: state.cve,
}))(({cve}) => {
    const [tabIdx, setTabIdx] = React.useState(0);

    return (
        <Box style={{maxWidth: 1200, margin: "20px"}}>
            <LTabs
                width="1200px" tabIdx={tabIdx}
                setTabIdx={setTabIdx}
                panels={[
                    {
                        label: "CVE Profile",
                        content: <Profile/>,
                        style: {padding: "0 24px 4px 24px"},
                    },
                    {
                        label: "Affected Images",
                        content: <ImageTable cve={cve} flat/>,
                        style: {padding: "0 24px 4px 24px"},
                    }
                ]}/>
        </Box>
    );
});
