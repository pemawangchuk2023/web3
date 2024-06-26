"use client";
import { TransactionContext } from '@/context/TransactionContext';
import React, { useContext } from 'react';
import TransactionCard from './TransactionCard';

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center mt-10">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-5xl text-center my-2">Latest Transactions</h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">Connect your account to see the latest updates and changes</h3>
        )}
        <div className="flex flex-wrap justify-center items-center mt-10 sm:flex flex-row text-center">
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TransactionCard key={index} {...transaction} />
            ))
          ) : (
            <p className="text-white">No transactions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
