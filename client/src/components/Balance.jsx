import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Balance = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      const API_URL = import.meta.env.VITE_API_URL;
      try {
        const response = await axios.get(`${API_URL}/api/v1/account/balance`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
          },
        });

        if (response.data.success) {
          setBalance(response.data.balance);
        } else {
          setError('Failed to fetch balance');
        }
      } catch (err) {
        setError('Error fetching balance');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (loading) return <div className="text-center text-lg text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-lg text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Your Balance</h2>
      <p className="text-xl text-center text-green-600">
        ₹ {balance && !isNaN(balance) ? balance.toLocaleString() : 'N/A'}
      </p>
    </div>
  );
};

export default Balance;
