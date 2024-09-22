import React from 'react';
import { Input } from '../ui/input';
import Image from 'next/image';
import logo from '@/public/Logo.png';
import { IoSend } from 'react-icons/io5';

export default function Footer() {
  const info = [
    {
      title: 'My Account',
      links: ['Authors', 'Collection', 'Author Profile', 'Create Collection'],
    },
    {
      title: 'Resources',
      links: ['Help & Support', 'Live Auctions', 'Item Details', 'Activities'],
    },
    {
      title: 'Communities',
      links: ['About Us', 'Contact Us', 'Our Blog', 'Discover'],
    },
  ];
  return (
    <footer className="bg-gradient-to-b from-[#29964C] to-[#0D3018]">
      <div className="flex gap-[1vw]  container bottom-0 pb-10">
        <div className="flex flex-col md:flex-row w-full pt-14 gap-6">
          <aside className="flex-[1.5] mr-7">
            <div className=" mb-2 text-white font-extrabold leading-6">
              <Image src={logo} alt="logo" />
            </div>
            <p className="text-white">
              We are a platform that connects buyers and suppliers.
            </p>
          </aside>

          {info.map((item) => (
            <nav
              className="flex gap-2 flex-col text-white flex-1"
              key={item.title}
            >
              <h6 className="font-bold mb-3">{item.title}</h6>
              {item.links.map((link) => (
                <a href="#" className="" key={link}>
                  {link}
                </a>
              ))}
            </nav>
          ))}
          <form className="text-white flex-[1.5]  col-span-2">
            <h6 className="mb-5 font-bold">Newsletter</h6>
            <fieldset className="">
              <label className="">
                <span className="">Enter your email address</span>
              </label>
              <div className="relative mt-3 w-[27rem] md:w-60 lg:w-72">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="p-2 rounded-lg border bg-transparent placeholder:text-white border-white"
                />
                <button className="absolute  border-l-2 inset-x-[45%] md:inset-x-[80%] lg:inset-x-[65%] inset-y-1 ">
                  <IoSend className="pl-1 text-3xl" />
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </footer>
  );
}
