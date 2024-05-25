"use client"
import React, { useState } from 'react';
import Welcome from '@/components/Welcome';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Transactions from '@/components/Transactions';

const Home = () => {
  const [formData, setFormData] = useState({
    addressTo: '',
    message: '',
    amount: '',
    keyword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className='min-h-screen bg-backgroundColor m-0 p-0'>
      <div>
        <Navbar />
        <Welcome
          placeholder="Enter Eth Address"
          name="addressTo"
          type="text"
          value={formData.addressTo}
          onChange={handleChange}
        />
        {/* Repeat Welcome component for other inputs if necessary */}
      </div>
      <div>
        <Transactions />
        <Footer />
      </div>
    </section>
  );
};

export default Home;
