import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookSummary, Review } from '../../types';

interface BookState {
  books: Book[];
  userBooks: Book[];
  currentlyReading: Book[];
  summaries: BookSummary[];
  reviews: Review[];
  loading: boolean;
}

// Initial sample books
const initialBooks: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80',
    description: 'Between life and death there is a library...',
  },
  {
    id: '2',
    title: 'The Thursday Murder Club',
    author: 'Richard Osman',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80',
    description: 'Four unlikely friends meet weekly to solve cold cases...',
  }
];

const initialState: BookState = {
  books: initialBooks,
  userBooks: [],
  currentlyReading: [],
  summaries: [],
  reviews: [],
  loading: false,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    addToUserBooks: (state, action: PayloadAction<Book>) => {
      if (!state.userBooks.some(book => book.id === action.payload.id)) {
        state.userBooks.push(action.payload);
      }
    },
    addToCurrentlyReading: (state, action: PayloadAction<Book>) => {
      if (!state.currentlyReading.some(book => book.id === action.payload.id)) {
        state.currentlyReading.push(action.payload);
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const book = state.currentlyReading.find(b => b.id === action.payload);
      if (book) {
        state.currentlyReading = state.currentlyReading.filter(b => b.id !== action.payload);
        if (!state.userBooks.some(b => b.id === action.payload)) {
          state.userBooks.push(book);
        }
      }
    },
    addSummary: (state, action: PayloadAction<BookSummary>) => {
      state.summaries.push(action.payload);
    },
    addReview: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { 
  setBooks, 
  addBook, 
  addToUserBooks,
  addToCurrentlyReading,
  markAsRead,
  addSummary, 
  addReview, 
  setLoading 
} = bookSlice.actions;
export default bookSlice.reducer;