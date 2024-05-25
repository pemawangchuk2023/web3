'use client';
import { TransactionContext } from '@/context/TransactionContext';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Loader from './Loader';
import { useToast } from './ui/use-toast';

interface InputFieldProps {
  placeholder: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Welcome = ({placeholder, name, type, value}: InputFieldProps) => {
  const {
    connectWallet,
    currentAccount,
    formData,
    sendTransaction,
    handleChange,
    isLoading,
  } = useContext(TransactionContext);
  const { toast } = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { addressTo, amount, keyword, message } = formData;

    if (!addressTo || !amount || !keyword || !message) {
      toast({
        title: "Error",
        description: "All fields are required.",
      });
      return;
    }

    try {
      await sendTransaction();
      toast({
        title: "Success",
        description: "Transaction sent successfully!",
      });

      // Resetting form data by invoking handleChange correctly
      ['addressTo', 'amount', 'keyword', 'message'].forEach(field => {
        handleChange({ target: { value: '', name: field } } as React.ChangeEvent<HTMLInputElement>, field);
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to send transaction. Please try again. ${error.message}`,
      });
    }
  };

  const boxStyles =
    'min-h-[80px] sm:px-0 sm:min-w-[140px] flex justify-center items-center border-4 rounded-xl border-gray-400 text-sm font-bold text-white bg-[#564343]';

  return (
    <section className='flex mt-4 ml-10'>
      <div className='w-[511px] h-[89px] text-center text-white text-4xl font-bold'>
        <div className='gradient-text'>Transact Cryptocurrencies Globally</div>
        <p className='header-text'>
          <br />
          Immerse Yourself in the Cryptocurrency World. Buy and Sell Digital
          Assets Effortlessly on PemaWeb3
        </p>
        <div className='flex w-[464px] h-[107px] bg-stone-600 rounded-[25px] mt-9 justify-center text-left hover:bg-neutral-900'>
          <div className='mt-5'>
          {!currentAccount ? (
              <Button onClick={connectWallet}>
                <p className='flex text-4xl mt-4 ml-12 from-neutral-200 cursor-pointer items-center justify-center'>
                  Connect Wallet
                </p>
              </Button>
            ) : (
              <p className='flex text-3xl mt-4 from-neutral-200 items-center justify-center text-[#ed4646]'>
                Wallet has been connected!
              </p>
            )}
            <div className='mt-20 p-8 border-4 rounded-lg bg-[#564343]'>
              <div className='grid grid-cols-3 gap-4'>
                <div className={boxStyles}>Interoperability</div>
                <div className={boxStyles}>Tokenization</div>
                <div className={boxStyles}>Reliability</div>
                <div className={boxStyles}>Immutability</div>
                <div className={boxStyles}>Secured</div>
                <div className={boxStyles}>Transparency</div>
                <div className={boxStyles}>Efficient</div>
                <div className={boxStyles}>Scalable</div>
                <div className={boxStyles}>Decentralised</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='w-[365px] h-[189px] mix-blend-hard-light bg-gradient-to-b from-red-900 to-stone-300 rounded-[25px]'>
          <div className='flex justify-between items-center w-full h-full p-5'>
            <div className='w-20 h-20 rounded-full border-white'>
              <Image
                src='/assets/icons/eth.png'
                width={600}
                height={600}
                alt='eth'
                className='rounded-2xl'
              />
            </div>
          <div>
          </div>
            <div className='w-24 h-24'>
              <Image
                src='/assets/icons/star.png'
                width={240}
                height={300}
                alt='star'
                className='rounded-3xl mr-4'
              />
            </div>
            <div className='w-[100px] h-[105px] bg-gradient-to-b from-orange-400 to-pink-600 rounded-full shadow border border-black' />
          </div>
          <div className="mt-4 flex">
          <Button className="font-bold rounded-lg text-3xl uppercase w-96 h-16 bg-[#D0169C] text-[#f9eeee] justify-center">
            Ethereum: $ 3,792.60
          </Button>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center">
        <div className="w-[426px] h-[425px] bg-gradient-to-b from-pink-800 to-stone-800 rounded-[30px]" >
          <div className="flex flex-col w-[395px] h-[77px] bg-gradient-to-r from-stone-700 to-orange-700 rounded-[15px] mt-4 ml-4">
          <div className="ml-4 mt-4 w-[365px] h-[200px] text-white text-base font-extrabold">
            <Input
            placeholder="Enter Eth Address"
            name="addressTo"
            type="text"
            onChange={(e) => handleChange(e, "addressTo")}
            className="text-black"
            disabled={isLoading}
            />
          </div>
          </div>
          <div className="flex flex-col w-[395px] h-[77px] bg-gradient-to-r from-stone-700 to-orange-700 rounded-[15px] mt-4 ml-4">
          <div className="ml-4 mt-4 w-[365px] h-[200px] text-white text-base font-extrabold">
            <Input
            placeholder="Enter Message"
            name="message"
            type="text"
            onChange={(e) => handleChange(e, 'message')}
            className="text-black"
            disabled={isLoading}
            />
          </div>
          </div>
          <div className="flex flex-col w-[395px] h-[77px] bg-gradient-to-r from-stone-700 to-orange-700 rounded-[15px] mt-4 ml-4">
          <div className="ml-4 mt-4 w-[365px] h-[200px] text-white text-base font-extrabold">
            <Input
            placeholder="Enter Eth Amount"
            name="amount"
            type="number"
            onChange={(e) => handleChange(e, 'amount')}
            className="text-black"
            disabled={isLoading}
            />
          </div>
          </div>
          <div className="flex flex-col w-[395px] h-[77px] bg-gradient-to-r from-stone-700 to-orange-700 rounded-[15px] mt-4 ml-4">
          <div className="ml-4 mt-4 w-[365px] h-[200px] text-white text-base font-extrabold">
            <Input
            placeholder="Keyword"
            name="addressTo"
            type="text"
            onChange={(e)=> handleChange(e, "keyword")}
            className="text-black"
            disabled={isLoading}
            />
          </div>
          </div>
          <div className="send">
            {isLoading ? (
              <Loader />
            ): (
              <Button onClick={handleSubmit} disabled={isLoading} className="text-white uppercase text-xl">
              {isLoading ? 'Processing...' : 'Send Now'}
            </Button>
            )}
          </div>
        </div>
      </div>
      </div>
      </div>
    </section>
  );
};

export default Welcome;
