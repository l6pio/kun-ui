import React, {useEffect} from "react";
import ReactApexChart from "react-apexcharts";
import {ApiClient} from "../../util/ApiClient";

const chartOptions = data => {
    return {
        labels: Object.keys(data),
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: "bottom"
                }
            }
        }]
    };
};

export const PodStatusChart = () => {
    const apiClient = ApiClient();
    const [data, setData] = React.useState({});

    useEffect(() => {
        apiClient.get("/pod/overview").then(res => setData(res.data.countByStatus));
    }, []);

    return (
        <ReactApexChart
            options={chartOptions(data)}
            series={Object.keys(data).map(v => data[v])}
            type="pie"
            height="200"
            width="300"
        />
    );
};
