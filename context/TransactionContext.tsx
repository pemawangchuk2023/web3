"use client"
import React, { useEffect, useState, ReactNode, ChangeEvent, useCallback } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '@/utils/constants';

declare global {
  interface Window {
    ethereum: any;
  }
}
interface TransactionProviderProps {
  children: ReactNode;
}

interface Transaction {
  addressTo: string;
  addressFrom: string;
  timestamp: string;
  message: string;
  keyword: string;
  amount: number;
}

interface FormData {
  addressTo: string;
  amount: string;
  keyword: string;
  message: string;
}

interface TransactionContextProps {
  connectWallet: () => void;
  currentAccount: string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
  sendTransaction: () => void;
  transactions: Transaction[];
  isLoading: boolean;
}
const defaultContextValue: TransactionContextProps = {
  connectWallet: () => {},
  currentAccount: '',
  formData: {
    addressTo: '',
    amount: '',
    keyword: '',
    message: '',
  },
  setFormData: () => {},
  handleChange: () => {},
  sendTransaction: () => {},
  transactions: [],
  isLoading: false,
};

export const TransactionContext =
  React.createContext<TransactionContextProps>(defaultContextValue);

  const getEthereumContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const transactionContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer);
    return transactionContract;
  };
  
export const TransactionProvider = ({
  children,
}: TransactionProviderProps) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState<FormData>({
    addressTo: '',
    amount: '',
    keyword: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTransactionCount = localStorage.getItem('transactionCount');
      return storedTransactionCount ? Number(storedTransactionCount) : 0;
    }
    return 0; // Default value for SSR
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (!window.ethereum) return alert('Please install Metamask immediately');
      const transactionContract = await getEthereumContract(); 
      const availableTransactions = await transactionContract.getAllTransactions();
      const structuredTransactions = availableTransactions.map((transaction: any) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date((typeof transaction.timestamp === 'object' ? transaction.timestamp.toNumber() : parseInt(transaction.timestamp)) * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: transaction.amount ? parseFloat(ethers.formatEther(transaction.amount)).toFixed(4) : '0.0000',
      }));
      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error);
    }
  };
  
  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return alert('Please install Metamask immediately');
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
      } else {
        console.log('No Accounts Found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionExist = async () => {
    try {
      const transactionContract = await getEthereumContract(); 
      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem('transactionCount', transactionCount);
    } catch (error) {
      console.log(error);
    }
  };
  
  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(accounts[0]);
        console.log("Connected to MetaMask with address:", accounts[0]);
      } catch (error: any) {
        alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
      }
    } else {
      alert("MetaMask not installed");
    }
  }, []);
  

  const sendTransaction = async () => {
  try {
    if (!window.ethereum) return alert('Please install Metamask immediately');
    const { addressTo, amount, keyword, message } = formData;
    const transactionContract = await getEthereumContract(); // Await the promise here
    const parsedAmount = ethers.parseEther(amount);

    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 GWEI
          value: parsedAmount.toString(16)
        },
      ],
    });

    const transactionHash = await transactionContract.addToBlockchain(
      addressTo,
      parsedAmount,
      message,
      keyword
    );
    setIsLoading(true);
    console.log(`Loading - ${transactionHash.hash}`);
    await transactionHash.wait();
    setIsLoading(false);
    console.log(`Success - ${transactionHash.hash}`);

    const transactionCount = await transactionContract.getTransactionCount();
    setTransactions(transactionCount.toNumber());
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionExist();
  });

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
