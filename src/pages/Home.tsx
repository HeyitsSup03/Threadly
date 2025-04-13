import React from 'react';
import { motion } from 'framer-motion';
import SidebarNav from '@/components/SidebarNav';
import CreatePostArea from '@/components/CreatePostArea';
import ThreadsList from '@/components/ThreadsList';

const Home: React.FC = () => {
  return (
    <motion.main 
      className="flex-grow container mx-auto px-6 py-8 flex flex-col md:flex-row gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SidebarNav />
      
      <div className="flex-grow">
        <CreatePostArea />
        <ThreadsList />
      </div>
    </motion.main>
  );
};

export default Home;
