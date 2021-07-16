import React from "react";
import Box from "@material-ui/core/Box";
import {ImageTable} from "../component/ImageTable";

export const Image = () => {
    return (
        <Box m="20px">
            <ImageTable title={"Image List"}/>
        </Box>
    );
};
