import {Accordion, AccordionDetails, Grid} from "@material-ui/core";
import {LAccordionSummary} from "../common/LAccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React, {useEffect} from "react";
import {ApiClient} from "../../util/ApiClient";
import ReactApexChart from "react-apexcharts";
import moment from "moment";

const defaultData = {
    min: 0,
    max: 0,
    series: []
};

const chartOptions = data => {
    return {
        timeline: {
            colors: ["#00bbf9"],
            chart: {
                id: "chartArea",
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
                parentHeightOffset: 5,
                offsetY: -25
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: [2, 2],
                dashArray: [0, 0]
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6
                }
            },
            xaxis: {
                type: "datetime",
                min: data.min,
                max: data.max,
                labels: {
                    formatter: (value, timestamp) => moment(new Date(timestamp)).format("HH:mm")
                },
            },
            yaxis: {
                tickAmount: 5,
                labels: {
                    formatter: v => v.toFixed(0)
                }
            },
            tooltip: {
                x: {
                    show: true,
                    formatter: value => moment(new Date(value)).format("YYYY-MM-DD HH:mm")
                },
            },
            grid: {
                borderColor: "#f1f1f1",
                padding: {
                    left: 10,
                    right: 25,
                }
            },
            legend: {
                position: "bottom",
                horizontalAlign: "center",
                show: true,
                itemMargin: {
                    vertical: 5,
                },
                offsetY: 5,
            }
        },
        brush: {
            chart: {
                id: "chartBrush",
                offsetY: -40,
                brush: {
                    target: "chartArea",
                    enabled: true
                },
                selection: {
                    enabled: true,
                    xaxis: {
                        min: data.min,
                        max: data.max,
                    }
                },
                sparkline: {
                    enabled: false,
                },
            },
            colors: ["#00bbf9"],
            fill: {
                type: "gradient",
                gradient: {
                    opacityFrom: 0.8,
                    opacityTo: 0.8,
                }
            },
            grid: {
                show: false,
            },
            xaxis: {
                type: "datetime",
                tooltip: {
                    enabled: false
                },
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false,
                },
            },
            yaxis: {
                tickAmount: 2,
                labels: {
                    formatter: v => v.toFixed(0)
                }
            },
            legend: {
                show: false,
            },
        },
    };
};

const RunningPodTimelineChart = () => {
    const apiClient = ApiClient();
    const [data, setData] = React.useState(defaultData);
    const options = chartOptions(data);

    const getData = () => {
        apiClient.get("/pod/timeline").then(res => {
            let timeline = res.data;

            if (!timeline) {
                setData(defaultData);
                return;
            }
            timeline = timeline.sort((a, b) => a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0);

            setData({
                min: Math.min(...timeline.map(v => v.timestamp)),
                max: Math.max(...timeline.map(v => v.timestamp)),
                series: [{
                    name: "Pods",
                    data: timeline.map(v => [v.timestamp, v.count]),
                }]
            });
        });
    };

    useEffect(() => getData(), []);

    return (
        data.series.length > 0 ?
            <Box id="charts" style={{position: "relative", height: 310, width: "100%"}}>
                <div style={{position: "relative"}}>
                    <div id="chart1" style={{zIndex: 100}}>
                        <ReactApexChart options={options.timeline} series={data.series} type="line" height="250"/>
                    </div>
                    <div id="chart2">
                        <ReactApexChart options={options.brush} series={data.series} type="area" height="100"/>
                    </div>
                </div>
            </Box> :
            <Box id="charts" style={{position: "relative", height: 250, width: "100%"}}>
                <div style={{position: "relative"}}>
                    <div id="chart1" style={{zIndex: 100}}>
                        <ReactApexChart options={options.timeline} series={[]} type="line" height="250"/>
                    </div>
                </div>
            </Box>
    );
};

export const RunningPodAccordion = () => {
    return (
        <Accordion defaultExpanded={true}>
            <LAccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Box align="center" width={1}>
                    <Typography variant="subtitle2">
                        Number of Running Pods
                    </Typography>
                </Box>
            </LAccordionSummary>
            <AccordionDetails style={{padding: "5px 20px 15px 20px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <RunningPodTimelineChart/>
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};