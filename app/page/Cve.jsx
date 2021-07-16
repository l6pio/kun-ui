import React from "react";
import Box from "@material-ui/core/Box";
import {CveTable} from "../component/CveTable";

export const Cve = () => {
    return (
        <Box m="20px">
            <CveTable title={"CVE List"}/>
        </Box>
    );
};
