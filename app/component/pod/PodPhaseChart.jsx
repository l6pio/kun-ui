import React, {useEffect} from "react";
import ReactApexChart from "react-apexcharts";
import {ApiClient} from "../../util/ApiClient";

const chartOptions = data => {
    return {
        labels: Object.keys(data),
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

export const PodPhaseChart = () => {
    const apiClient = ApiClient();
    const [data, setData] = React.useState({});

    useEffect(() => {
        apiClient.get("/pod/overview").then(res => setData(res.data.countByPhase));
    }, []);

    return (
        <ReactApexChart
            options={chartOptions(data)}
            series={Object.keys(data).map(v => data[v])}
            type="pie"
            height="250"
        />
    );
};
