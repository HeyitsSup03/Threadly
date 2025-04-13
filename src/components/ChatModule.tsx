import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getChatConversations, getMessagesByConversation, getCurrentUser, getUserById, sendMessage, markMessagesAsRead, getTotalUnreadMessages } from '@/lib/localStorage';
import { formatDistanceToNow } from 'date-fns';

const ChatModule: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = getCurrentUser();
  
  // Get first conversation for simplicity
  const conversations = getChatConversations();
  const activeConversation = conversations.find(convo => 
    convo.participants.includes(currentUser.id)
  );
  
  const messages = activeConversation 
    ? getMessagesByConversation(activeConversation.id) 
    : [];
  
  const otherParticipantId = activeConversation?.participants.find(id => id !== currentUser.id);
  const otherUser = otherParticipantId ? getUserById(otherParticipantId) : null;

  useEffect(() => {
    // Update unread count
    const count = getTotalUnreadMessages(currentUser.id);
    setUnreadCount(count);

    // Mark messages as read when chat is open
    if (isChatOpen && activeConversation) {
      markMessagesAsRead(activeConversation.id, currentUser.id);
    }
  }, [isChatOpen, currentUser.id, activeConversation]);

  useEffect(() => {
    // Scroll to bottom when messages change or chat is opened
    if (messagesEndRef.current && isChatOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation || !otherParticipantId) return;
    
    sendMessage(currentUser.id, otherParticipantId, newMessage.trim());
    setNewMessage('');
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  if (!activeConversation || !otherUser) return null;

  return (
    <div id="chat-module" className="fixed bottom-0 right-6 z-50">
      <div 
        className="brutal-border bg-primary text-white p-4 w-72 cursor-pointer flex justify-between items-center"
        onClick={toggleChat}
      >
        <div className="flex items-center">
          <i className="ri-message-3-fill text-xl mr-2"></i>
          <h3 className="font-space font-bold">CHAT</h3>
        </div>
        <div className="flex items-center">
          {unreadCount > 0 && (
            <motion.span 
              className="bg-secondary text-white rounded-full h-6 w-6 flex items-center justify-center text-sm mr-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              {unreadCount}
            </motion.span>
          )}
          <i className={`text-xl ${isChatOpen ? 'ri-arrow-down-s-line' : 'ri-arrow-up-s-line'}`}></i>
        </div>
      </div>
      
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            className="brutal-border border-t-0 bg-white p-4 w-72"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-64 overflow-y-auto mb-4" id="chat-messages">
              {messages.map(message => (
                <div key={message.id} className={`mb-3 ${message.senderId === currentUser.id ? 'flex justify-end' : ''}`}>
                  {message.senderId !== currentUser.id ? (
                    <div className="flex items-start">
                      <img 
                        src={otherUser.avatar} 
                        alt={`${otherUser.username} avatar`} 
                        className="h-8 w-8 rounded-full border-2 border-primary mr-2 flex-shrink-0"
                      />
                      <div className="brutal-border bg-gray-100 p-2">
                        <p className="font-bold">{otherUser.username}</p>
                        <p>{message.content}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="brutal-border bg-accent text-white p-2">
                      <p className="font-bold">You</p>
                      <p>{message.content}</p>
                      <p className="text-xs text-white/70 mt-1">
                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="flex">
              <input 
                type="text" 
                className="brutal-border flex-grow py-2 px-3" 
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <motion.button 
  className="brutal-btn bg-secondary text-white ml-2 h-10 w-10 flex items-center justify-center rounded-full text-lg"
  whileTap={{ scale: 0.9 }}
  onClick={handleSendMessage}
  title="Send Message"
>
  ✉️
</motion.button>


            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatModule;
