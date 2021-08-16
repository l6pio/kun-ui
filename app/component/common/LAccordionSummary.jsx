import withStyles from "@material-ui/core/styles/withStyles";
import AccordionSummary from "@material-ui/core/AccordionSummary";

export const LAccordionSummary = withStyles({
    root: {
        minHeight: 48,
        "&$expanded": {
            minHeight: 48
        }
    },
    content: {
        margin: "0",
        "&$expanded": {
            margin: "0"
        }
    },
    expandIcon: {
        padding: 6,
        zIndex: 200,
    },
    expanded: {}
})(
    AccordionSummary
);
LAccordionSummary.muiName = "AccordionSummary";
