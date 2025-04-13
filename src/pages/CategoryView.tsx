import React from 'react';
import { useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import SidebarNav from '@/components/SidebarNav';
import CreatePostArea from '@/components/CreatePostArea';
import ThreadsList from '@/components/ThreadsList';
import { getCategoryById } from '@/lib/localStorage';
import { BrutalButton } from '@/components/ui/brutal-button';

const CategoryView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const category = getCategoryById(id);

  if (!category) {
    return (
      <motion.main 
        className="flex-grow container mx-auto px-6 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="brutal-border bg-white p-8 text-center">
          <h1 className="font-space font-bold text-3xl mb-4">Category Not Found</h1>
          <p className="mb-6">The category you're looking for doesn't exist or has been removed.</p>
          <BrutalButton variant="secondary" onClick={() => setLocation('/')}>
            Back to Home
          </BrutalButton>
        </div>
      </motion.main>
    );
  }

  const categoryColor = 
    category.color === '#FF3C00' ? 'secondary' : 
    category.color === '#0066FF' ? 'accent' : 
    category.color === '#FF2D55' ? 'destructive' : 
    'primary';

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
          <motion.div 
            className={`flex items-center bg-${categoryColor} text-white px-4 py-2 brutal-border`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <i className={`${category.icon} text-2xl mr-2`}></i>
            <h1 className="font-space font-bold text-2xl">
              {category.name}
            </h1>
          </motion.div>
        </div>
        
        <CreatePostArea />
        <ThreadsList 
          categoryId={category.id} 
          title={`${category.name} THREADS`}
        />
      </div>
    </motion.main>
  );
};

export default CategoryView;
