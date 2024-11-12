export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
}

export interface BookClub {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  members: User[];
  currentBook?: Book | null;
  readBooks?: Book[];
  createdBy: User;
}

export interface BookSummary {
  id: string;
  bookId: string;
  userId: string;
  clubId: string;
  content: string;
  createdAt: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  clubId: string;
  createdAt: string;
}