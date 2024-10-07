
import React, { useState } from 'react';
import Transactions from './components/Transactions/Transactions';
import Statistics from './components/Statistics/Statistics';
import ControlPanel from './components/ControlPanel/ControlPanel';
import BarChart from './components/BarChart/BarChart';
import './App.css';
import Header from './components/Header/Header';

const App = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="app-container">
            <Header/>
            <ControlPanel onMonthChange={setSelectedMonth} onSearch={setSearchTerm} />
            <Transactions selectedMonth={selectedMonth} searchTerm={searchTerm} />
            <Statistics selectedMonth={selectedMonth} />
            <BarChart selectedMonth={selectedMonth} />
        </div>
    );
};

export default App;
