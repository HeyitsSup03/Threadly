import React from 'react';
import { useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import SidebarNav from '@/components/SidebarNav';
import ThreadItem from '@/components/ThreadItem';
import CommentSection from '@/components/CommentSection';
import { getThreadById } from '@/lib/localStorage';
import { BrutalButton } from '@/components/ui/brutal-button';

const ThreadDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const thread = getThreadById(id);

  if (!thread) {
    return (
      <motion.main 
        className="flex-grow container mx-auto px-6 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="brutal-border bg-white p-8 text-center">
          <h1 className="font-space font-bold text-3xl mb-4">Thread Not Found</h1>
          <p className="mb-6">The thread you're looking for doesn't exist or has been removed.</p>
          <BrutalButton variant="secondary" onClick={() => setLocation('/')}>
            Back to Home
          </BrutalButton>
        </div>
      </motion.main>
    );
  }

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
        <div className="flex items-center mb-6">
          <BrutalButton 
            variant="outline" 
            size="sm" 
            className="mr-3"
            onClick={() => setLocation('/')}
          >
            <i className="ri-arrow-left-line mr-1"></i> Back
          </BrutalButton>
          <h1 className="font-space font-bold text-3xl">Thread Detail</h1>
        </div>
        
        <ThreadItem thread={thread} />
        <CommentSection threadId={thread.id} />
      </div>
    </motion.main>
  );
};

export default ThreadDetail;
