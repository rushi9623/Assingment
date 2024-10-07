import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Transactions.css';

const Transactions = ({ selectedMonth, searchTerm }) => {
    const [transactionList, setTransactionList] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalTransactions, setTotalTransactions] = useState(0);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (selectedMonth) {
                try {
                    const response = await axios.get(`http://localhost:3000/api/products?month=${selectedMonth}&page=${page}&perPage=10`);
                    setTransactionList(response.data.products);
                    setTotalTransactions(response.data.total);
                } catch (error) {
                    console.error('Error fetching transactions:', error);
                }
            }
        };

        fetchTransactions();
    }, [selectedMonth, page]);

    useEffect(() => {
        // Filter transactions based on search term
        if (searchTerm) {
            const lowerCasedTerm = searchTerm.toLowerCase();
            const filtered = transactionList.filter(({ id, title, description, price, category }) => {
                return (
                    id.toString().includes(lowerCasedTerm) ||
                    title.toLowerCase().includes(lowerCasedTerm) ||
                    description.toLowerCase().includes(lowerCasedTerm) ||
                    price.toString().includes(lowerCasedTerm) ||
                    category.toLowerCase().includes(lowerCasedTerm)
                );
            });
            setFilteredTransactions(filtered);
        } else {
            setFilteredTransactions(transactionList);
        }
    }, [searchTerm, transactionList]);

    return (
        <div className="transactions-container">
            <h2>Transactions - {selectedMonth || 'Select Month'}</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map(({ id, title, description, price, category, sold, image }) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{title}</td>
                                <td>{description}</td>
                                <td>${price.toFixed(2)}</td>
                                <td>{category}</td>
                                <td>{sold ? 'Yes' : 'No'}</td>
                                <td><img height="50px" src={image} alt={title} /></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No transactions found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="pagination-controls">
                <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Previous</button>
                <button onClick={() => setPage(prev => prev + 1)} disabled={page * 10 >= totalTransactions}>Next</button>
            </div>
        </div>
    );
};

export default Transactions;
