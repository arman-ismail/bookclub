import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookClub, User, Book } from '../../types';

interface BookClubState {
  bookClubs: BookClub[];
  userBookClubs: BookClub[];
  loading: boolean;
}

// Initial sample book clubs
const initialBookClubs: BookClub[] = [
  {
    id: '1',
    name: 'Fiction Fanatics',
    description: 'A community of fiction lovers exploring contemporary and classic novels together.',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80',
    members: [],
    currentBook: {
      id: '1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80',
      description: 'Between life and death there is a library...',
    },
    readBooks: [],
    createdBy: {
      id: 'admin',
      name: 'Admin',
      email: 'admin@bookclub.com',
      role: 'admin'
    }
  },
  {
    id: '2',
    name: 'Mystery Readers',
    description: 'Unraveling mysteries and discussing thrilling detective stories.',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80',
    members: [],
    currentBook: {
      id: '2',
      title: 'The Thursday Murder Club',
      author: 'Richard Osman',
      coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80',
      description: 'Four unlikely friends meet weekly to solve cold cases...',
    },
    readBooks: [],
    createdBy: {
      id: 'admin',
      name: 'Admin',
      email: 'admin@bookclub.com',
      role: 'admin'
    }
  }
];

const initialState: BookClubState = {
  bookClubs: initialBookClubs,
  userBookClubs: [],
  loading: false,
};

interface UpdateBookClubBooksPayload {
  clubId: string;
  currentBook: Book | null;
  readBooks: Book[];
}

const bookClubSlice = createSlice({
  name: 'bookClubs',
  initialState,
  reducers: {
    setBookClubs: (state, action: PayloadAction<BookClub[]>) => {
      state.bookClubs = action.payload;
    },
    setUserBookClubs: (state, action: PayloadAction<BookClub[]>) => {
      state.userBookClubs = action.payload;
    },
    addBookClub: (state, action: PayloadAction<BookClub>) => {
      state.bookClubs.push(action.payload);
    },
    joinBookClub: (state, action: PayloadAction<{ clubId: string; user: User }>) => {
      const club = state.bookClubs.find(c => c.id === action.payload.clubId);
      if (club && !club.members.some(m => m.id === action.payload.user.id)) {
        club.members.push(action.payload.user);
        if (!state.userBookClubs.some(c => c.id === club.id)) {
          state.userBookClubs.push(club);
        }
      }
    },
    leaveBookClub: (state, action: PayloadAction<{ clubId: string; userId: string }>) => {
      const club = state.bookClubs.find(c => c.id === action.payload.clubId);
      if (club) {
        club.members = club.members.filter(m => m.id !== action.payload.userId);
        state.userBookClubs = state.userBookClubs.filter(c => c.id !== club.id);
      }
    },
    updateBookClubBooks: (state, action: PayloadAction<UpdateBookClubBooksPayload>) => {
      const club = state.bookClubs.find(c => c.id === action.payload.clubId);
      if (club) {
        club.currentBook = action.payload.currentBook;
        club.readBooks = action.payload.readBooks;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { 
  setBookClubs, 
  setUserBookClubs, 
  addBookClub, 
  joinBookClub, 
  leaveBookClub,
  updateBookClubBooks,
  setLoading 
} = bookClubSlice.actions;
export default bookClubSlice.reducer;