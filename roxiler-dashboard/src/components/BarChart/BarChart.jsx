// src/components/BarChart/BarChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChart = ({ data }) => {
    const chartData = {
        labels: ['0 - 100', '101 - 200', '201 - 300', '301 - 400', '401 - 500', '501 - 600', '601 - 700', '701 - 800', '801 - 900', '901 - above'],
        datasets: [
            {
                label: 'Number of Items Sold on the basis of Price Range for a given month',
                data: data,
                backgroundColor: 'rgba(0, 188, 212, 0.5)',
                borderColor: 'rgba(0, 188, 212, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div style={{ width: '80%', height: '400px', margin: '0 auto' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;
