export interface User {
  id: string;
  username: string;
  avatar: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Thread {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  upvotes: string[]; // Array of user IDs who upvoted
  downvotes: string[]; // Array of user IDs who downvoted
  commentCount: number;
}

export interface Comment {
  id: string;
  threadId: string;
  userId: string;
  content: string;
  createdAt: string;
  parentId?: string; // For nested comments
  upvotes: string[]; // Array of user IDs who upvoted
  downvotes: string[]; // Array of user IDs who downvoted
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface ChatConversation {
  id: string;
  participants: string[]; // Array of user IDs
  lastMessage: Message;
  unreadCount: number;
}
