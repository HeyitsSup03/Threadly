import { v4 as uuidv4 } from 'uuid';
import { User, Category, Thread, Comment, Message, ChatConversation } from './types';

// Default categories
const defaultCategories: Category[] = [
  { id: "1", name: "TRENDING", icon: "ri-fire-fill", color: "#FF3C00" },
  { id: "2", name: "GAMING", icon: "ri-gamepad-fill", color: "#0066FF" },
  { id: "3", name: "PROGRAMMING", icon: "ri-code-s-slash-line", color: "#000000" },
  { id: "4", name: "MOVIES", icon: "ri-movie-fill", color: "#FF2D55" },
  { id: "5", name: "MUSIC", icon: "ri-music-fill", color: "#0066FF" }
];

// Default user (logged in user)
const defaultUser: User = {
  id: "1",
  username: "BrutalUser42",
  avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100&q=80",
  createdAt: new Date().toISOString()
};

// Other default users
const defaultUsers: User[] = [
  {
    id: "2",
    username: "GigaChad88",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80",
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    username: "PixelQueen",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80",
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    username: "CodeWizard",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100&h=100&q=80",
    createdAt: new Date().toISOString()
  }
];

// Default threads
const defaultThreads: Thread[] = [
  {
    id: "1",
    title: "This new PS5 game is absolutely mind-blowing!",
    content: "Just picked up the latest release and I'm blown away by the graphics and gameplay. Anyone else playing it?",
    categoryId: "2", // GAMING
    userId: "2", // GigaChad88
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    upvotes: ["1", "3"], // BrutalUser42, PixelQueen
    downvotes: [],
    commentCount: 42
  },
  {
    id: "2",
    title: "What's your favorite React state management library in 2023?",
    content: "I've been using Redux for years but wondering if there are better alternatives now. What's everyone using these days?",
    categoryId: "3", // PROGRAMMING
    userId: "4", // CodeWizard
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    upvotes: ["1"], // BrutalUser42
    downvotes: [],
    commentCount: 87
  },
  {
    id: "3",
    title: "Unpopular opinion: The original Matrix is overrated",
    content: "Don't get me wrong, it was revolutionary for its time, but watching it now, it doesn't hold up as well as people think. Fight me.",
    categoryId: "4", // MOVIES
    userId: "3", // PixelQueen
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    upvotes: ["2", "4"], // GigaChad88, CodeWizard
    downvotes: [],
    commentCount: 156
  }
];

// Default comments
const defaultComments: Comment[] = [
  {
    id: "1",
    threadId: "1",
    userId: "4", // CodeWizard
    content: "I can't believe how realistic the graphics are. Next gen is really here!",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    upvotes: ["1", "2"], // BrutalUser42, GigaChad88
    downvotes: []
  },
  {
    id: "2",
    threadId: "1",
    userId: "1", // BrutalUser42
    content: "I'm still trying to get my hands on a PS5. They're always sold out!",
    createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(), // 1.5 hours ago
    upvotes: ["2"], // GigaChad88
    downvotes: []
  },
  {
    id: "3",
    threadId: "1",
    parentId: "2", // Nested under BrutalUser42's comment
    userId: "3", // PixelQueen
    content: "Check online retailers early in the morning. That's how I got mine!",
    createdAt: new Date(Date.now() - 1.2 * 60 * 60 * 1000).toISOString(), // 1.2 hours ago
    upvotes: ["1", "2"], // BrutalUser42, GigaChad88
    downvotes: []
  }
];

// Default messages
const defaultMessages: Message[] = [
  {
    id: "1",
    senderId: "2", // GigaChad88
    receiverId: "1", // BrutalUser42
    content: "Hey! Did you see that new PS5 game?",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 mins ago
    read: true
  },
  {
    id: "2",
    senderId: "1", // BrutalUser42
    receiverId: "2", // GigaChad88
    content: "Yeah, it looks amazing! I'm gonna get it this weekend.",
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 mins ago
    read: true
  },
  {
    id: "3",
    senderId: "2", // GigaChad88
    receiverId: "1", // BrutalUser42
    content: "Cool! Maybe we can play online?",
    createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(), // 20 mins ago
    read: false
  }
];

// Default chat conversations
const defaultChatConversations: ChatConversation[] = [
  {
    id: "1",
    participants: ["1", "2"], // BrutalUser42, GigaChad88
    lastMessage: defaultMessages[2],
    unreadCount: 1
  },
  {
    id: "2",
    participants: ["1", "3"], // BrutalUser42, PixelQueen
    lastMessage: {
      id: "4",
      senderId: "3", // PixelQueen
      receiverId: "1", // BrutalUser42
      content: "Have you seen the new Spider-Man trailer?",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      read: false
    },
    unreadCount: 1
  },
  {
    id: "3",
    participants: ["1", "4"], // BrutalUser42, CodeWizard
    lastMessage: {
      id: "5",
      senderId: "4", // CodeWizard
      receiverId: "1", // BrutalUser42
      content: "Check out this new JavaScript framework I found!",
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      read: false
    },
    unreadCount: 1
  }
];

// Initialize localStorage with default data if not already set
export const initializeLocalStorage = () => {
  if (!localStorage.getItem('categories')) {
    localStorage.setItem('categories', JSON.stringify(defaultCategories));
  }
  
  if (!localStorage.getItem('currentUser')) {
    localStorage.setItem('currentUser', JSON.stringify(defaultUser));
  }
  
  if (!localStorage.getItem('users')) {
    const allUsers = [defaultUser, ...defaultUsers];
    localStorage.setItem('users', JSON.stringify(allUsers));
  }
  
  if (!localStorage.getItem('threads')) {
    localStorage.setItem('threads', JSON.stringify(defaultThreads));
  }
  
  if (!localStorage.getItem('comments')) {
    localStorage.setItem('comments', JSON.stringify(defaultComments));
  }
  
  if (!localStorage.getItem('messages')) {
    localStorage.setItem('messages', JSON.stringify(defaultMessages));
  }
  
  if (!localStorage.getItem('chatConversations')) {
    localStorage.setItem('chatConversations', JSON.stringify(defaultChatConversations));
  }
};

// User functions
export const getCurrentUser = (): User => {
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
};

export const getUsers = (): User[] => {
  const usersJson = localStorage.getItem('users');
  return usersJson ? JSON.parse(usersJson) : [];
};

export const getUserById = (userId: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.id === userId);
};

// Category functions
export const getCategories = (): Category[] => {
  const categoriesJson = localStorage.getItem('categories');
  return categoriesJson ? JSON.parse(categoriesJson) : [];
};

export const getCategoryById = (categoryId: string): Category | undefined => {
  const categories = getCategories();
  return categories.find(category => category.id === categoryId);
};

// Thread functions
export const getThreads = (): Thread[] => {
  const threadsJson = localStorage.getItem('threads');
  return threadsJson ? JSON.parse(threadsJson) : [];
};

export const getThreadById = (threadId: string): Thread | undefined => {
  const threads = getThreads();
  return threads.find(thread => thread.id === threadId);
};

export const getThreadsByCategory = (categoryId: string): Thread[] => {
  const threads = getThreads();
  return threads.filter(thread => thread.categoryId === categoryId);
};

export const createThread = (threadData: Omit<Thread, 'id' | 'createdAt' | 'upvotes' | 'downvotes' | 'commentCount'>): Thread => {
  const threads = getThreads();
  const newThread: Thread = {
    id: uuidv4(),
    ...threadData,
    createdAt: new Date().toISOString(),
    upvotes: [],
    downvotes: [],
    commentCount: 0
  };
  
  threads.unshift(newThread); // Add to beginning of array
  localStorage.setItem('threads', JSON.stringify(threads));
  return newThread;
};

export const updateThreadVote = (threadId: string, userId: string, voteType: 'upvote' | 'downvote' | 'remove-upvote' | 'remove-downvote'): Thread | undefined => {
  const threads = getThreads();
  const threadIndex = threads.findIndex(thread => thread.id === threadId);
  
  if (threadIndex === -1) return undefined;
  
  const thread = { ...threads[threadIndex] };
  
  if (voteType === 'upvote') {
    // Remove from downvotes if present
    thread.downvotes = thread.downvotes.filter(id => id !== userId);
    // Add to upvotes if not already there
    if (!thread.upvotes.includes(userId)) {
      thread.upvotes.push(userId);
    }
  } else if (voteType === 'downvote') {
    // Remove from upvotes if present
    thread.upvotes = thread.upvotes.filter(id => id !== userId);
    // Add to downvotes if not already there
    if (!thread.downvotes.includes(userId)) {
      thread.downvotes.push(userId);
    }
  } else if (voteType === 'remove-upvote') {
    thread.upvotes = thread.upvotes.filter(id => id !== userId);
  } else if (voteType === 'remove-downvote') {
    thread.downvotes = thread.downvotes.filter(id => id !== userId);
  }
  
  threads[threadIndex] = thread;
  localStorage.setItem('threads', JSON.stringify(threads));
  return thread;
};

// Comment functions
export const getComments = (): Comment[] => {
  const commentsJson = localStorage.getItem('comments');
  return commentsJson ? JSON.parse(commentsJson) : [];
};

export const getCommentsByThreadId = (threadId: string): Comment[] => {
  const comments = getComments();
  return comments.filter(comment => comment.threadId === threadId);
};

export const createComment = (commentData: Omit<Comment, 'id' | 'createdAt' | 'upvotes' | 'downvotes'>): Comment => {
  const comments = getComments();
  const threads = getThreads();
  
  const newComment: Comment = {
    id: uuidv4(),
    ...commentData,
    createdAt: new Date().toISOString(),
    upvotes: [],
    downvotes: []
  };
  
  comments.push(newComment);
  localStorage.setItem('comments', JSON.stringify(comments));
  
  // Increment comment count on thread
  const threadIndex = threads.findIndex(thread => thread.id === commentData.threadId);
  if (threadIndex !== -1) {
    threads[threadIndex].commentCount += 1;
    localStorage.setItem('threads', JSON.stringify(threads));
  }
  
  return newComment;
};

export const updateCommentVote = (commentId: string, userId: string, voteType: 'upvote' | 'downvote' | 'remove-upvote' | 'remove-downvote'): Comment | undefined => {
  const comments = getComments();
  const commentIndex = comments.findIndex(comment => comment.id === commentId);
  
  if (commentIndex === -1) return undefined;
  
  const comment = { ...comments[commentIndex] };
  
  if (voteType === 'upvote') {
    // Remove from downvotes if present
    comment.downvotes = comment.downvotes.filter(id => id !== userId);
    // Add to upvotes if not already there
    if (!comment.upvotes.includes(userId)) {
      comment.upvotes.push(userId);
    }
  } else if (voteType === 'downvote') {
    // Remove from upvotes if present
    comment.upvotes = comment.upvotes.filter(id => id !== userId);
    // Add to downvotes if not already there
    if (!comment.downvotes.includes(userId)) {
      comment.downvotes.push(userId);
    }
  } else if (voteType === 'remove-upvote') {
    comment.upvotes = comment.upvotes.filter(id => id !== userId);
  } else if (voteType === 'remove-downvote') {
    comment.downvotes = comment.downvotes.filter(id => id !== userId);
  }
  
  comments[commentIndex] = comment;
  localStorage.setItem('comments', JSON.stringify(comments));
  return comment;
};

// Message and Chat functions
export const getMessages = (): Message[] => {
  const messagesJson = localStorage.getItem('messages');
  return messagesJson ? JSON.parse(messagesJson) : [];
};

export const getChatConversations = (): ChatConversation[] => {
  const conversationsJson = localStorage.getItem('chatConversations');
  return conversationsJson ? JSON.parse(conversationsJson) : [];
};

export const getConversationById = (conversationId: string): ChatConversation | undefined => {
  const conversations = getChatConversations();
  return conversations.find(convo => convo.id === conversationId);
};

export const getConversationByParticipants = (userIds: string[]): ChatConversation | undefined => {
  const conversations = getChatConversations();
  return conversations.find(convo => 
    convo.participants.length === userIds.length && 
    userIds.every(id => convo.participants.includes(id))
  );
};

export const getMessagesByConversation = (conversationId: string): Message[] => {
  const messages = getMessages();
  const conversation = getConversationById(conversationId);
  
  if (!conversation) return [];
  
  return messages.filter(message => 
    conversation.participants.includes(message.senderId) && 
    conversation.participants.includes(message.receiverId)
  ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

export const sendMessage = (senderId: string, receiverId: string, content: string): Message => {
  const messages = getMessages();
  const conversations = getChatConversations();
  
  const newMessage: Message = {
    id: uuidv4(),
    senderId,
    receiverId,
    content,
    createdAt: new Date().toISOString(),
    read: false
  };
  
  messages.push(newMessage);
  localStorage.setItem('messages', JSON.stringify(messages));
  
  // Find or create conversation
  let conversation = conversations.find(convo => 
    convo.participants.includes(senderId) && 
    convo.participants.includes(receiverId) &&
    convo.participants.length === 2
  );
  
  if (conversation) {
    conversation.lastMessage = newMessage;
    if (senderId !== receiverId) {
      conversation.unreadCount += 1;
    }
  } else {
    conversation = {
      id: uuidv4(),
      participants: [senderId, receiverId],
      lastMessage: newMessage,
      unreadCount: 1
    };
    conversations.push(conversation);
  }
  
  localStorage.setItem('chatConversations', JSON.stringify(conversations));
  return newMessage;
};

export const markMessagesAsRead = (conversationId: string, userId: string): void => {
  const messages = getMessages();
  const conversations = getChatConversations();
  
  const conversationIndex = conversations.findIndex(convo => convo.id === conversationId);
  if (conversationIndex === -1) return;
  
  const conversation = conversations[conversationIndex];
  
  // Update messages
  const updatedMessages = messages.map(message => {
    if (conversation.participants.includes(message.senderId) && 
        conversation.participants.includes(message.receiverId) &&
        message.receiverId === userId) {
      return { ...message, read: true };
    }
    return message;
  });
  
  // Update conversation
  conversations[conversationIndex] = {
    ...conversation,
    unreadCount: 0
  };
  
  localStorage.setItem('messages', JSON.stringify(updatedMessages));
  localStorage.setItem('chatConversations', JSON.stringify(conversations));
};

// Get total unread message count for current user
export const getTotalUnreadMessages = (userId: string): number => {
  const conversations = getChatConversations();
  return conversations
    .filter(convo => convo.participants.includes(userId))
    .reduce((total, convo) => total + convo.unreadCount, 0);
};

// Get active users (online users)
export const getActiveUsers = (): User[] => {
  const users = getUsers();
  const currentUser = getCurrentUser();
  
  // Filter out current user and return first 3 users as "active"
  return users
    .filter(user => user.id !== currentUser.id)
    .slice(0, 3);
};
