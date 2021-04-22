import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Title } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Title);

let chart;

class PriceChart extends Component {

    componentDidMount() {
        const ctx = document.getElementById("myChart");
        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: ["#98FB98"],
                        borderColor: ["Green"],
                        borderWidth: 1
                    }
                ]
            }
        });
        return chart;
    }

    componentDidUpdate(prevProps) {
        const {chartData, chartLabel} = this.props;
        // check if the previous and current are not equal so to re render the chart
        if(prevProps.chartLabel !== this.props.chartLabel || prevProps.chartData !== this.props.chartData) {
            chart.destroy();
            const ctx = document.getElementById("myChart");
            chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: chartLabel,
                datasets: [
                    {
                        data: chartData,
                        backgroundColor: ["#98FB98"],
                        borderColor: ["Green"],
                        borderWidth: 1
                    }
                ]
            }
        });
        return chart;
        }
    }

    render() { 
        return ( 
            <div>
                <canvas id="myChart" width="400" height="400" />
            </div>
         );
    }
}

PriceChart.propTypes = {
    chartData: PropTypes.array,
    chartLabel: PropTypes.array
}
 
export default PriceChart;