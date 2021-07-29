import React from "react";
import Box from "@material-ui/core/Box";
import {LTabs} from "../component/LTabs";

export const Pod = () => {
    const [tabIdx, setTabIdx] = React.useState(0);

    return (
        <Box m="20px">
            <LTabs
                width="1200px" tabIdx={tabIdx}
                setTabIdx={setTabIdx}
                panels={[
                    {
                        label: "Overview",
                        content: <div/>,
                        style: {padding: "0 24px 4px 24px"},
                    },
                    {
                        label: "Running Pods",
                        content: <div/>,
                        style: {padding: "0 24px 4px 24px"},
                    }
                ]}/>
        </Box>
    );
};
