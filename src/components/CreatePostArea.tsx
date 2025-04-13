import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { BrutalCard } from './ui/brutal-card';
import { BrutalButton } from './ui/brutal-button';
import { createThread, getCategories, getCurrentUser } from '@/lib/localStorage';
import { Category } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const CreatePostArea: React.FC = () => {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [content, setContent] = useState('');
  const categories = getCategories();
  const currentUser = getCurrentUser();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleCreatePost = () => {
    if (!title.trim() || !categoryId || categoryId === 'Select a category' || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const newThread = createThread({
        title: title.trim(),
        content: content.trim(),
        categoryId,
        userId: currentUser.id
      });

      toast({
        title: "Success!",
        description: "Your thread has been created",
        variant: "default"
      });

      // Clear form
      setTitle('');
      setCategoryId('');
      setContent('');
      
      // Navigate to the new thread
      setLocation(`/thread/${newThread.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create thread",
        variant: "destructive"
      });
    }
  };

  return (
    <BrutalCard className="mb-8">
      <h2 className="font-space font-bold text-2xl mb-4">CREATE NEW THREAD</h2>
      
      <div className="mb-4">
        <label htmlFor="post-title" className="block font-space font-bold mb-2">TITLE</label>
        <input 
          type="text" 
          id="post-title" 
          className="w-full border-4 border-primary p-3 text-lg" 
          placeholder="What's on your mind?" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="post-category" className="block font-space font-bold mb-2">CATEGORY</label>
        <select 
          id="post-category" 
          className="w-full border-4 border-primary p-3 text-lg appearance-none"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <label htmlFor="post-content" className="block font-space font-bold mb-2">CONTENT</label>
        <textarea 
          id="post-content" 
          className="w-full border-4 border-primary p-3 text-lg" 
          rows={4} 
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      
      <div className="flex justify-end">
        <BrutalButton 
          variant="secondary" 
          onClick={handleCreatePost}
        >
          POST THREAD
        </BrutalButton>
      </div>
    </BrutalCard>
  );
};

export default CreatePostArea;
