import { Navbar_Section } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className='m-0 p-0'>
      <section className='flex justify-around items-center h-25 bg-gradient-to-b from-stone-600 to-stone-800 p-4'>
        <div className='mb-4 md:mb-0'>
          <Image
            src='/assets/icons/logo.png'
            alt='logo'
            width={125}
            height={125}
          />
        </div>

        <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
          {Navbar_Section.map((item) => (
            <Link
              href={item.path}
              key={item.name}
            >
              <div className='text-white text-xl font-extrabold p-2 hover:bg-stone-700 rounded-full transition duration-300 ease-in-out'>
                <div className='w-[184px] h-[62px] bg-gradient-to-b from-stone-600 to-stone-800 rounded-[25px] flex items-center justify-center'>
                  {item.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <div className='w-[1278px] h-0.5 bg-stone-500' />
    </nav>
  );
};

export default Navbar;
