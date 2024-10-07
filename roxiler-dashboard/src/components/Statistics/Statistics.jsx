import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Statistics.css';

const Statistics = ({ selectedMonth }) => {
    const [statistics, setStatistics] = useState({
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0,
    });

    useEffect(() => {
        const fetchStatistics = async () => {
            if (selectedMonth) {
                try { 
                    const response = await axios.get(`http://localhost:3000/api/products/statistics?month=${selectedMonth}`);
                    setStatistics(response.data);
                } catch (error) {
                    console.error('Error fetching statistics:', error);
                }
            }
        };

        fetchStatistics();
    }, [selectedMonth]);

    return (
        <div className="statistics-container">
            <h2>Statistics - {selectedMonth || 'Select Month'}</h2>
            <div className="statistics-data">
                <div><strong>Total Sale Amount:</strong> ${statistics.totalSaleAmount.toFixed(2)}</div>
                <div><strong>Total Sold Items:</strong> {statistics.totalSoldItems}</div>
                <div><strong>Total Not Sold Items:</strong> {statistics.totalNotSoldItems}</div>
            </div>
        </div>
    );
};

export default Statistics;
