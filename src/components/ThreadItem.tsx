import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { BrutalCard } from './ui/brutal-card';
import { Thread } from '@/lib/types';
import { getCategoryById, getUserById, getCurrentUser, updateThreadVote } from '@/lib/localStorage';
import { formatDistanceToNow } from 'date-fns';

interface ThreadItemProps {
  thread: Thread;
}

const ThreadItem: React.FC<ThreadItemProps> = ({ thread }) => {
  const category = getCategoryById(thread.categoryId);
  const author = getUserById(thread.userId);
  const currentUser = getCurrentUser();
  
  const hasUpvoted = thread.upvotes.includes(currentUser.id);
  const hasDownvoted = thread.downvotes.includes(currentUser.id);
  const voteCount = thread.upvotes.length - thread.downvotes.length;
  
  const handleVote = (voteType: 'upvote' | 'downvote') => {
    if (voteType === 'upvote') {
      if (hasUpvoted) {
        updateThreadVote(thread.id, currentUser.id, 'remove-upvote');
      } else {
        updateThreadVote(thread.id, currentUser.id, 'upvote');
      }
    } else {
      if (hasDownvoted) {
        updateThreadVote(thread.id, currentUser.id, 'remove-downvote');
      } else {
        updateThreadVote(thread.id, currentUser.id, 'downvote');
      }
    }
  };

  if (!category || !author) return null;

  return (
    <BrutalCard className="mb-8 thread-item relative">
      <div className={`category-marker bg-${
        category.color === '#FF3C00' ? 'secondary' : 
        category.color === '#0066FF' ? 'accent' : 
        category.color === '#FF2D55' ? 'destructive' : 
        'primary'
      } text-white`}>
        {category.name}
      </div>
      
      <div className="flex items-start mb-4 relative">
        <div className="flex flex-col items-center mr-4">
          <motion.button 
            className={`upvote-btn text-2xl hover:scale-125 transition-transform ${hasUpvoted ? 'text-secondary' : ''}`}
            whileTap={{ scale: 0.8 }}
            onClick={() => handleVote('upvote')}
          >
            <i className="ri-arrow-up-s-line"></i>
          </motion.button>
          <span className="font-space font-bold text-lg my-1">{voteCount}</span>
          <motion.button 
            className={`downvote-btn text-2xl hover:scale-125 transition-transform ${hasDownvoted ? 'text-accent' : ''}`}
            whileTap={{ scale: 0.8 }}
            onClick={() => handleVote('downvote')}
          >
            <i className="ri-arrow-down-s-line"></i>
          </motion.button>
        </div>
        
        <div className="flex-grow">
          <Link href={`/thread/${thread.id}`}>
            <h3 className="font-space font-bold text-2xl mb-2 hover:text-secondary transition-colors cursor-pointer">
              {thread.title}
            </h3>
          </Link>
          <p className="text-lg mb-4">{thread.content}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/thread/${thread.id}`}>
                <div className="flex items-center cursor-pointer hover:text-secondary transition-colors">
                  <i className="ri-message-3-line mr-1"></i>
                  <span>{thread.commentCount} comments</span>
                </div>
              </Link>
              <div className="flex items-center cursor-pointer hover:text-secondary transition-colors">
                <i className="ri-share-forward-line mr-1"></i>
                <span>Share</span>
              </div>
              <div className="flex items-center cursor-pointer hover:text-secondary transition-colors">
                <i className="ri-bookmark-line mr-1"></i>
                <span>Save</span>
              </div>
            </div>
            
            <Link href={`/user/${author.id}`}>
              <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                <img 
                  src={author.avatar} 
                  alt={`${author.username} avatar`} 
                  className="h-8 w-8 rounded-full border-2 border-primary mr-2"
                />
                <span className="font-space font-bold">{author.username}</span>
                <span className="ml-2 text-gray-500">
                  {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </BrutalCard>
  );
};

export default ThreadItem;
