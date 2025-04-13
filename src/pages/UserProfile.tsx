import React from 'react';
import { useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import SidebarNav from '@/components/SidebarNav';
import ThreadsList from '@/components/ThreadsList';
import { getUserById, getCurrentUser } from '@/lib/localStorage';
import { BrutalCard } from '@/components/ui/brutal-card';
import { BrutalButton } from '@/components/ui/brutal-button';
import { formatDistanceToNow } from 'date-fns';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const user = getUserById(id);
  const currentUser = getCurrentUser();
  const isCurrentUser = user?.id === currentUser.id;

  if (!user) {
    return (
      <motion.main 
        className="flex-grow container mx-auto px-6 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="brutal-border bg-white p-8 text-center">
          <h1 className="font-space font-bold text-3xl mb-4">User Not Found</h1>
          <p className="mb-6">The user you're looking for doesn't exist or has been removed.</p>
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
          <h1 className="font-space font-bold text-3xl">User Profile</h1>
        </div>
        
        <BrutalCard className="mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <motion.img 
                src={user.avatar} 
                alt={`${user.username}'s avatar`} 
                className="w-32 h-32 rounded-full border-4 border-primary"
                whileHover={{ scale: 1.05 }}
              />
              <div className="absolute right-0 bottom-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h2 className="font-space font-bold text-3xl mb-2">{user.username}</h2>
              <p className="text-gray-600 mb-4">Member since {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}</p>
              
              <div className="flex flex-wrap gap-4 mb-4 justify-center md:justify-start">
                <div className="brutal-border px-4 py-2">
                  <p className="font-bold text-lg">250</p>
                  <p className="text-sm">Threads</p>
                </div>
                <div className="brutal-border px-4 py-2">
                  <p className="font-bold text-lg">1.2K</p>
                  <p className="text-sm">Comments</p>
                </div>
                <div className="brutal-border px-4 py-2">
                  <p className="font-bold text-lg">5.7K</p>
                  <p className="text-sm">Karma</p>
                </div>
              </div>
              
              {isCurrentUser ? (
                <BrutalButton variant="secondary" className="brutal-btn">
                  <i className="ri-edit-line mr-2"></i> Edit Profile
                </BrutalButton>
              ) : (
                <BrutalButton variant="accent" className="brutal-btn">
                  <i className="ri-message-3-line mr-2"></i> Send Message
                </BrutalButton>
              )}
            </div>
          </div>
        </BrutalCard>
        
        <ThreadsList 
          userId={user.id} 
          title={`${isCurrentUser ? 'YOUR' : `${user.username.toUpperCase()}'S`} THREADS`}
        />
      </div>
    </motion.main>
  );
};

export default UserProfile;
