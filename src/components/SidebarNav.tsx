import React from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { BrutalCard } from './ui/brutal-card';
import { BrutalButton } from './ui/brutal-button';
import { getCategories, getActiveUsers } from '@/lib/localStorage';
import { Category, User } from '@/lib/types';

const SidebarNav: React.FC = () => {
  const [location] = useLocation();
  const categories = getCategories();
  const activeUsers = getActiveUsers();

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      <BrutalCard className="mb-8">
        <h2 className="font-space font-bold text-2xl mb-4 uppercase">Categories</h2>
        
        <div className="mb-6">
          {categories.map((category: Category) => (
            <Link href={`/category/${category.id}`} key={category.id}>
              <motion.div 
                className={`font-space font-bold text-lg flex items-center mb-2 hover:text-secondary cursor-pointer transition-colors ${
                  location === `/category/${category.id}` ? 'text-secondary' : ''
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`${category.icon} ${
                  category.color === '#FF3C00' ? 'text-secondary' : 
                  category.color === '#0066FF' ? 'text-accent' : 
                  category.color === '#FF2D55' ? 'text-destructive' : 
                  'text-primary'
                } mr-2`}></i>
                <span>{category.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </BrutalCard>
      
      <BrutalCard variant="secondary" className="mb-8">
        <h2 className="font-space font-bold text-2xl mb-4 uppercase text-white">Active Users</h2>
        
        {activeUsers.map((user: User) => (
          <Link href={`/user/${user.id}`} key={user.id}>
            <div className="flex items-center space-x-3 mb-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={`${user.username} avatar`} 
                  className="h-8 w-8 rounded-full border-2 border-white"
                />
                <div className="absolute -right-1 -bottom-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <span className="font-inter text-white">{user.username}</span>
            </div>
          </Link>
        ))}
        
        <BrutalButton variant="default" className="bg-white text-secondary mt-4">Chat Now</BrutalButton>
      </BrutalCard>
      
      <BrutalCard variant="accent">
        <h2 className="font-space font-bold text-2xl mb-4 uppercase text-white">Stats</h2>
        
        <div className="flex justify-between mb-2">
          <span className="font-inter text-white">Users Online:</span>
          <span className="font-space font-bold text-white">1,337</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-inter text-white">Threads:</span>
          <span className="font-space font-bold text-white">4,269</span>
        </div>
        <div className="flex justify-between">
          <span className="font-inter text-white">Messages:</span>
          <span className="font-space font-bold text-white">69,420</span>
        </div>
      </BrutalCard>
    </div>
  );
};

export default SidebarNav;
