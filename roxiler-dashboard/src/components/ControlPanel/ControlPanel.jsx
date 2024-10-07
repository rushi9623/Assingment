import React, { useState } from 'react';
import './ControlPanel.css';

const ControlPanel = ({ onMonthChange, onSearch }) => {
    const [searchInput, setSearchInput] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
        onMonthChange(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
        onSearch(e.target.value);
    };

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <div className="control-panel">
            <input 
                type="search" 
                value={searchInput} 
                onChange={handleSearchChange} 
                placeholder="Search by ID, Title, etc." 
                className="search-input"
            />
            <select value={selectedMonth} onChange={handleMonthChange} className="month-dropdown">
                <option value="">Select Month</option>
                {months.map((month) => (
                    <option key={month} value={month}>{month}</option>
                ))}
            </select>
        </div>
    );
};

export default ControlPanel;
