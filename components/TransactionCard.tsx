"use client";
import { formatDateString } from '@/lib/utils';
import React from 'react';

interface TransactionCardProps {
  addressTo: string;
  addressFrom: string;
  timestamp: string;
  message: string;
  keyword: string;
  amount: number;
}

const shortenAddress = (address: string) => `${address.slice(0, 10)}...${address.slice(-4)}`;

const TransactionCard =({ addressTo, addressFrom, timestamp, message, amount }: TransactionCardProps) => {
  return (
    <div
      className="card"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          <a
            href={`https://ropsten.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noopener noreferrer"
          >
           <div className="ml-2 flex flex-col w-[275px] h-[50px] bg-gradient-to-r from-stone-700 to-orange-700 rounded-[15px]">
             <p className="text-white text-base text-center justify-center mt-3">From: {shortenAddress(addressFrom)}</p>
           </div>
          </a>
          <a
            href={`https://ropsten.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
           <div className="ml-2 flex flex-col w-[275px] h-[50px] bg-gradient-to-r from-stone-700 to-orange-700 rounded-[15px] mt-3">
             <p className="text-white text-base text-center justify-center mt-3">To: {shortenAddress(addressTo)}</p>
           </div>
          </a>
          <div className="ml-2 flex flex-col w-[275px] h-[50px] bg-gradient-to-r from-stone-700 to-orange-700 rounded-[15px] mt-3">
             <p className="text-white text-base text-center justify-center mt-3">Amount of Eth: {amount}</p>
           </div>
          {message && (
            <>
              <br />
              <div className="ml-2 flex flex-col w-[275px] h-[50px] bg-gradient-to-r from-stone-700 to-orange-700 rounded-[15px] mt-2">
             <p className="text-white text-base text-center justify-center mt-3">Message: {message}</p>
           </div>
            </>
          )}
        </div>
        <div className="bg-[#36382E] p-3 px-5 w-max rounded-2xl mt-5 shadow-2xl sm:p-2 sm:px-3 sm:mt-3">
            <p className="text-[#37c7da] font-bold sm:text-sm p-3">
              {formatDateString(timestamp)}
      </p>
    </div>
      </div>
    </div>
  );
};

export default TransactionCard;
