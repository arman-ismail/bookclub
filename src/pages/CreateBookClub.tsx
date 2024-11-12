import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Book, Plus, BookOpen, Library } from 'lucide-react';
import { addBookClub } from '../store/slices/bookClubSlice';
import { RootState } from '../store';
import AddBookModal from '../components/AddBookModal';
import type { Book as BookType } from '../types';

const CreateBookClub: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [currentBook, setCurrentBook] = useState<BookType | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { userBooks, currentlyReading } = useSelector((state: RootState) => state.books);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const newClub = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80',
      members: [user],
      currentBook: currentBook || undefined,
      createdBy: user,
    };

    dispatch(addBookClub(newClub));
    navigate('/clubs');
  };

  const selectBook = (book: BookType) => {
    setCurrentBook(book);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <Book className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">Create a Book Club</h1>
        <p className="text-gray-600 mt-2">Build your community of book lovers</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Club Details Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Club Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Club Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Image URL (optional)
                </label>
                <input
                  type="url"
                  id="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Book Club
              </button>
            </div>
          </form>
        </div>

        {/* Book Selection */}
        <div>
          {/* Currently Reading Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select Current Book</h2>
              <button
                onClick={() => setShowAddBookModal(true)}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Book</span>
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-700 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Currently Reading
              </h3>
              {currentlyReading.length === 0 ? (
                <p className="text-gray-500 text-sm">No books currently being read</p>
              ) : (
                <div className="space-y-3">
                  {currentlyReading.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => selectBook(book)}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        currentBook?.id === book.id
                          ? 'bg-indigo-50 border-2 border-indigo-500'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium">{book.title}</h4>
                        <p className="text-sm text-gray-600">{book.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <h3 className="font-medium text-gray-700 flex items-center gap-2 mt-6">
                <Library className="h-5 w-5" />
                Reading History
              </h3>
              {userBooks.length === 0 ? (
                <p className="text-gray-500 text-sm">No books in reading history</p>
              ) : (
                <div className="space-y-3">
                  {userBooks.map((book) => (
                    <div
                      key={book.id}
                      onClick={() => selectBook(book)}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        currentBook?.id === book.id
                          ? 'bg-indigo-50 border-2 border-indigo-500'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium">{book.title}</h4>
                        <p className="text-sm text-gray-600">{book.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AddBookModal
        isOpen={showAddBookModal}
        onClose={() => setShowAddBookModal(false)}
        type="reading"
      />
    </div>
  );
};

export default CreateBookClub;