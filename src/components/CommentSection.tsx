import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrutalCard } from './ui/brutal-card';
import { BrutalButton } from './ui/brutal-button';
import { Comment } from '@/lib/types';
import { getCommentsByThreadId, getUserById, getCurrentUser, createComment, updateCommentVote } from '@/lib/localStorage';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface CommentSectionProps {
  threadId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ threadId }) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const comments = getCommentsByThreadId(threadId);
  const currentUser = getCurrentUser();
  const { toast } = useToast();

  // Group comments by parent
  const topLevelComments = comments.filter(comment => !comment.parentId);
  const commentsByParentId = comments.reduce((acc, comment) => {
    if (comment.parentId) {
      if (!acc[comment.parentId]) {
        acc[comment.parentId] = [];
      }
      acc[comment.parentId].push(comment);
    }
    return acc;
  }, {} as Record<string, Comment[]>);

  const handleCreateComment = () => {
    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment",
        variant: "destructive"
      });
      return;
    }

    try {
      createComment({
        threadId,
        userId: currentUser.id,
        content: newComment.trim(),
        parentId: replyingTo
      });

      toast({
        title: "Success!",
        description: "Your comment has been posted",
        variant: "default"
      });

      // Clear form and reset replying state
      setNewComment('');
      setReplyingTo(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive"
      });
    }
  };

  const handleVote = (commentId: string, voteType: 'upvote' | 'downvote') => {
    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;

    const hasUpvoted = comment.upvotes.includes(currentUser.id);
    const hasDownvoted = comment.downvotes.includes(currentUser.id);

    if (voteType === 'upvote') {
      if (hasUpvoted) {
        updateCommentVote(commentId, currentUser.id, 'remove-upvote');
      } else {
        updateCommentVote(commentId, currentUser.id, 'upvote');
      }
    } else {
      if (hasDownvoted) {
        updateCommentVote(commentId, currentUser.id, 'remove-downvote');
      } else {
        updateCommentVote(commentId, currentUser.id, 'downvote');
      }
    }
  };

  const renderComment = (comment: Comment, isNested = false) => {
    const author = getUserById(comment.userId);
    if (!author) return null;

    const hasUpvoted = comment.upvotes.includes(currentUser.id);
    const hasDownvoted = comment.downvotes.includes(currentUser.id);
    const voteCount = comment.upvotes.length - comment.downvotes.length;
    const nestedComments = commentsByParentId[comment.id] || [];

    return (
      <motion.div 
        key={comment.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-4 ${isNested ? 'ml-12 mt-4' : ''}`}
      >
        <div className="brutal-border bg-white p-4">
          <div className="flex items-start">
            <div className="flex flex-col items-center mr-3">
              <motion.button 
                className={`text-xl hover:scale-125 transition-transform ${hasUpvoted ? 'text-secondary' : ''}`}
                whileTap={{ scale: 0.8 }}
                onClick={() => handleVote(comment.id, 'upvote')}
              >
                <i className="ri-arrow-up-s-line"></i>
              </motion.button>
              <span className="font-bold my-1">{voteCount}</span>
              <motion.button 
                className={`text-xl hover:scale-125 transition-transform ${hasDownvoted ? 'text-accent' : ''}`}
                whileTap={{ scale: 0.8 }}
                onClick={() => handleVote(comment.id, 'downvote')}
              >
                <i className="ri-arrow-down-s-line"></i>
              </motion.button>
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center mb-2">
                <img 
                  src={author.avatar} 
                  alt={`${author.username} avatar`} 
                  className="h-6 w-6 rounded-full border-2 border-primary mr-2"
                />
                <span className="font-space font-bold">{author.username}</span>
                <span className="ml-2 text-sm text-gray-500">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </span>
              </div>
              
              <p className="mb-3">{comment.content}</p>
              
              <div className="flex items-center space-x-4">
                <button 
                  className="text-sm hover:text-secondary transition-colors"
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                >
                  <i className="ri-reply-line mr-1"></i>
                  Reply
                </button>
              </div>
              
              {replyingTo === comment.id && (
                <div className="mt-3">
                  <textarea 
                    className="w-full border-4 border-primary p-2 text-base mb-2" 
                    rows={2} 
                    placeholder="Write a reply..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></textarea>
                  <div className="flex justify-end space-x-2">
                    <BrutalButton 
                      variant="outline" 
                      size="sm"
                      onClick={() => setReplyingTo(null)}
                    >
                      Cancel
                    </BrutalButton>
                    <BrutalButton 
                      variant="secondary" 
                      size="sm"
                      onClick={handleCreateComment}
                    >
                      Reply
                    </BrutalButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Render nested comments */}
        {nestedComments.map(nestedComment => renderComment(nestedComment, true))}
      </motion.div>
    );
  };

  return (
    <div className="mt-8">
      <h3 className="font-space font-bold text-2xl mb-6">COMMENTS ({comments.length})</h3>
      
      <div className="mb-6">
        <textarea 
          className="w-full border-4 border-primary p-3 text-lg mb-3" 
          rows={3} 
          placeholder="Join the discussion..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <div className="flex justify-end">
          <BrutalButton 
            variant="secondary"
            onClick={handleCreateComment}
          >
            Post Comment
          </BrutalButton>
        </div>
      </div>
      
      <AnimatePresence>
        {topLevelComments.length > 0 ? (
          topLevelComments.map(comment => renderComment(comment))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="brutal-border bg-white p-6 text-center"
          >
            <h3 className="font-space font-bold text-xl">No comments yet</h3>
            <p className="mt-2">Be the first to comment!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommentSection;
