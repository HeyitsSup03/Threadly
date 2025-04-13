import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreadItem from './ThreadItem';
import { getThreads } from '@/lib/localStorage';
import { Thread } from '@/lib/types';

interface ThreadsListProps {
  categoryId?: string;
  userId?: string;
  title?: string;
}

const ThreadsList: React.FC<ThreadsListProps> = ({ categoryId, userId, title = "LATEST THREADS" }) => {
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'commented'>('newest');
  
  let threads = getThreads();
  
  // Filter by category if provided
  if (categoryId) {
    threads = threads.filter(thread => thread.categoryId === categoryId);
  }
  
  // Filter by user if provided
  if (userId) {
    threads = threads.filter(thread => thread.userId === userId);
  }
  
  // Sort threads
  if (sortBy === 'newest') {
    threads = [...threads].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sortBy === 'popular') {
    threads = [...threads].sort((a, b) => 
      (b.upvotes.length - b.downvotes.length) - (a.upvotes.length - a.downvotes.length)
    );
  } else if (sortBy === 'commented') {
    threads = [...threads].sort((a, b) => b.commentCount - a.commentCount);
  }

  return (
    <div id="threads-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-space font-bold text-3xl">{title}</h2>
        <div className="flex items-center space-x-2">
          <span className="font-inter">Sort by:</span>
          <select 
            className="brutal-border bg-white py-1 px-3"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="newest">Newest</option>
            <option value="popular">Most Popular</option>
            <option value="commented">Most Commented</option>
          </select>
        </div>
      </div>
      
      <AnimatePresence>
        {threads.length > 0 ? (
          threads.map((thread: Thread) => (
            <motion.div
              key={thread.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ThreadItem thread={thread} />
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="brutal-border bg-white p-6 text-center"
          >
            <h3 className="font-space font-bold text-xl">No threads found</h3>
            <p className="mt-2">Be the first to create a thread!</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {threads.length > 0 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <a href="#" className="brutal-border bg-white px-4 py-2 text-lg font-bold hover:bg-secondary hover:text-white transition-colors">PREV</a>
          <a href="#" className="brutal-border bg-white px-4 py-2 text-lg font-bold hover:bg-secondary hover:text-white transition-colors">1</a>
          <a href="#" className="brutal-border bg-secondary text-white px-4 py-2 text-lg font-bold">2</a>
          <a href="#" className="brutal-border bg-white px-4 py-2 text-lg font-bold hover:bg-secondary hover:text-white transition-colors">3</a>
          <a href="#" className="brutal-border bg-white px-4 py-2 text-lg font-bold hover:bg-secondary hover:text-white transition-colors">NEXT</a>
        </div>
      )}
    </div>
  );
};

export default ThreadsList;
