import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Transactions from '@/components/Transactions';
import Welcome from '@/components/Welcome';
import React from 'react';

const Home = () => {
  return (
    <section className='min-h-screen bg-backgroundColor m-0 p-0'>
      <div>
        <Navbar />
        <Welcome />
      </div>
      <div>
        <Transactions />
        <Footer />
      </div>
    </section>
  );
};

export default Home;
