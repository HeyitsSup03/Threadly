import React, { useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { getCurrentUser } from '@/lib/localStorage';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const currentUser = getCurrentUser();

  return (
    <header className="bg-primary text-white py-6 relative">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <motion.h1 
              className="font-space font-bold text-3xl md:text-4xl tracking-tight cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-white">THREAD</span><span className="text-secondary">LY</span>
            </motion.h1>
          </Link>
          <div className="hidden md:flex space-x-2">
            <motion.div 
              className="bg-secondary h-8 w-8 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <motion.div 
              className="bg-accent h-8 w-8 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="brutal-border bg-white text-primary px-4 py-2 pl-10 w-64 text-lg placeholder-gray-400 rounded-none focus:ring-2 focus:ring-secondary focus:outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-secondary"></i>
            </div>
          </div>
          
          <Link href={`/user/${currentUser.id}`}>
            <motion.div 
              className="flex items-center justify-center rounded-full cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src={currentUser.avatar} 
                alt="User avatar" 
                className="h-10 w-10 rounded-full border-2 border-white"
              />
            </motion.div>
          </Link>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="md:hidden px-6 py-3 border-t-4 border-white bg-primary">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="brutal-border bg-white text-primary px-4 py-2 pl-10 w-full text-lg placeholder-gray-400 rounded-none focus:ring-2 focus:ring-secondary focus:outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-secondary"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
