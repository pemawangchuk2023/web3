import { footerLinks } from '@/constants';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row bg-gradient-to-r from-green-900 to-stone-700 md:items-center justify-between p-8">
      <p className="text-center text-white text-xl font-extrabold leading-9">
        Copyright @2024 Pema Wangchuk. All Rights Reserved
      </p>
      <div className="flex flex-col  gap-4 md:flex-row md:items-center justify-center mt-3 md:mt-0">
        {footerLinks.map((link, index) => (
           <Link href="/" key="index">
           <p key={index} className="font-bold text-white text-xl text-center cursor-pointer">
            {link}
          </p>
           </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
