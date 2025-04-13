import React from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';

const MobileNavigation: React.FC = () => {
  const [location] = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-primary text-white border-t-4 border-white flex justify-around py-3 z-40">
      <Link href="/">
        <a className={`flex flex-col items-center ${location === '/' ? 'text-secondary' : ''}`}>
          <i className="ri-home-4-fill text-2xl"></i>
          <span className="text-xs">Home</span>
        </a>
      </Link>
      
      <a href="#" className="flex flex-col items-center">
        <i className="ri-search-line text-2xl"></i>
        <span className="text-xs">Search</span>
      </a>
      
      <Link href="/">
        <a className="flex flex-col items-center">
          <motion.div 
            className="bg-secondary rounded-full p-2 -mt-8 brutal-border"
            whileTap={{ scale: 0.9 }}
          >
            <i className="ri-add-line text-2xl"></i>
          </motion.div>
          <span className="text-xs mt-1">Post</span>
        </a>
      </Link>
      
      <Link href="/chat">
        <a className="flex flex-col items-center">
          <i className="ri-message-3-line text-2xl"></i>
          <span className="text-xs">Chat</span>
        </a>
      </Link>
      
      <Link href="/user/1">
        <a className={`flex flex-col items-center ${location.startsWith('/user') ? 'text-secondary' : ''}`}>
          <i className="ri-user-line text-2xl"></i>
          <span className="text-xs">Profile</span>
        </a>
      </Link>
    </div>
  );
};

export default MobileNavigation;
