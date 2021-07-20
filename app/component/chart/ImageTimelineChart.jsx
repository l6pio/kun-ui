import React, {useEffect} from "react";
import {connect} from "react-redux";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import Box from "@material-ui/core/Box";
import {ApiClient} from "../../util/ApiClient";

const defaultData = {
    min: 0,
    max: 0,
    series: []
};

const chartOptions = data => {
    return {
        timeline: {
            title: {
                text: "Number of Pods Running",
                align: "center",
                style: {
                    fontSize:  "15px",
                    fontWeight:  "",
                    color:  "#263238"
                },
            },
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
                offsetY: -27,
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

export const ImageTimelineChart = connect((state) => ({
    image: state.image
}))(({image}) => {
    const apiClient = ApiClient();
    const [data, setData] = React.useState(defaultData);
    const options = chartOptions(data);

    const getData = () => {
        apiClient.get(`/image/${image.id}/timeline`).then(res => {
            let timeline = res.data;

            if (!timeline) {
                setData(defaultData);
                return;
            }

            const chartMin = Math.min(...timeline.map(v => v.timestamp));
            const chartMax = Math.max(...timeline.map(v => v.timestamp));

            timeline.push({timestamp: chartMin, count: 0});
            timeline = timeline.sort((a, b) => a.timestamp < b.timestamp ? -1 : a.timestamp > b.timestamp ? 1 : 0);

            setData({
                min: chartMin,
                max: chartMax,
                series: [{
                    name: "Pods",
                    data: timeline.map(v => [v.timestamp, v.count]),
                }]
            });
        });
    };

    useEffect(() => getData(), [image]);

    return (
        data.series.length > 0 ?
            <Box id="charts" style={{position: "relative", height: 320, width: "100%"}}>
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
});
