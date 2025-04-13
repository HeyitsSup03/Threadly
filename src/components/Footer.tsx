import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { BrutalButton } from './ui/brutal-button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-8 mt-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <motion.h2 
              className="font-space font-bold text-3xl mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-white">THREAD</span><span className="text-secondary">LY</span>
            </motion.h2>
            <p className="max-w-md">Speak Freely. Thread Fiercely.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-space font-bold text-xl mb-3">NAVIGATION</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/">
                    <a className="hover:text-secondary cursor-pointer">Home</a>
                  </Link>
                </li>
                <li>
                  <Link href="/category/1">
                    <a className="hover:text-secondary cursor-pointer">Categories</a>
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary">Popular</a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary">New</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-space font-bold text-xl mb-3">ACCOUNT</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/user/1`}>
                    <a className="hover:text-secondary cursor-pointer">Profile</a>
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary">Settings</a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary">Messages</a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary">Notifications</a>
                </li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-space font-bold text-xl mb-3">SUBSCRIBE</h3>
              <p className="mb-2">Get the latest updates:</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="brutal-border flex-grow py-2 px-3 text-primary" />
                <BrutalButton variant="secondary" className="ml-2">GO</BrutalButton>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t-4 border-white pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Threadly. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-2xl hover:text-secondary"><i className="ri-twitter-fill"></i></a>
            <a href="#" className="text-2xl hover:text-secondary"><i className="ri-instagram-fill"></i></a>
            <a href="#" className="text-2xl hover:text-secondary"><i className="ri-github-fill"></i></a>
            <a href="#" className="text-2xl hover:text-secondary"><i className="ri-discord-fill"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
