import React from "react";
import Box from "@material-ui/core/Box";
import {ArtifactTable} from "../component/ArtifactTable";

export const Artifact = () => {
    return (
        <Box m="20px">
            <ArtifactTable title={"Artifact List"}/>
        </Box>
    );
};
