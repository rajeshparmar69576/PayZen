import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to PayZen App!</h1>
        <p className="text-gray-600 text-lg mb-6">
          Your one-stop solution for managing payments, transfers, and more with ease and security.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/dashboard"
            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow hover:bg-blue-600 font-medium"
          >
            Go to Dashboard
          </Link>
  
        </div>
      </div>

    
      <div className="mt-10 max-w-5xl text-center">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Why Choose PayZen?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Secure Transactions</h3>
            <p className="text-gray-600">
              We prioritize your security with advanced encryption to ensure your funds are always safe.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Easy to Use</h3>
            <p className="text-gray-600">
              Our app is designed to make payments and transfers simple, fast, and hassle-free.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Track Your Spending</h3>
            <p className="text-gray-600">
              Stay on top of your finances with detailed transaction history and spending insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
