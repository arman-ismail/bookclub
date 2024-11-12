import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BookOpen, Users, Star, MessageSquare, Plus, Check } from 'lucide-react';
import { RootState } from '../store';
import { addSummary, addReview } from '../store/slices/bookSlice';
import { updateBookClubBooks } from '../store/slices/bookClubSlice';
import MemberList from '../components/MemberList';
import AddBookModal from '../components/AddBookModal';

const BookClubDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const club = useSelector((state: RootState) => 
    state.bookClubs.bookClubs.find(club => club.id === id)
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const [summary, setSummary] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showMembers, setShowMembers] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  if (!club) return <div>Club not found</div>;

  const handleSubmitSummary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !club.currentBook) return;

    dispatch(addSummary({
      id: Math.random().toString(36).substr(2, 9),
      bookId: club.currentBook.id,
      userId: user.id,
      clubId: club.id,
      content: summary,
      createdAt: new Date().toISOString(),
    }));
    setSummary('');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    dispatch(addReview({
      id: Math.random().toString(36).substr(2, 9),
      rating,
      comment,
      userId: user.id,
      clubId: club.id,
      createdAt: new Date().toISOString(),
    }));
    setComment('');
    setRating(5);
  };

  const handleMarkAsRead = () => {
    if (!club.currentBook) return;
    
    dispatch(updateBookClubBooks({
      clubId: club.id,
      currentBook: null,
      readBooks: [...(club.readBooks || []), club.currentBook]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div 
          className="h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${club.coverImage})` }}
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{club.name}</h1>
          <p className="text-gray-600 mb-6">{club.description}</p>
          
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => setShowMembers(!showMembers)}
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
            >
              <Users className="h-5 w-5" />
              <span>{club.members.length} members</span>
            </button>
          </div>

          {showMembers && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Club Members</h2>
              <MemberList members={club.members} />
            </div>
          )}
        </div>
      </div>

      {/* Currently Reading Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Currently Reading</h2>
          {!club.currentBook && (
            <button
              onClick={() => setShowAddBookModal(true)}
              className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="h-5 w-5" />
              <span>Add Book</span>
            </button>
          )}
        </div>

        {club.currentBook ? (
          <div className="flex items-start space-x-6">
            <img
              src={club.currentBook.coverImage}
              alt={club.currentBook.title}
              className="w-32 h-48 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{club.currentBook.title}</h3>
              <p className="text-gray-600 mb-4">{club.currentBook.author}</p>
              <p className="text-gray-700 mb-4">{club.currentBook.description}</p>
              <button
                onClick={handleMarkAsRead}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700"
              >
                <Check className="h-5 w-5" />
                <span>Mark as Read</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No book currently being read</p>
            <p className="text-gray-500 text-sm">Add a book to get started</p>
          </div>
        )}
      </div>

      {/* Reading History */}
      {club.readBooks && club.readBooks.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Reading History</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {club.readBooks.map((book) => (
              <div key={book.id} className="flex space-x-4 bg-gray-50 p-4 rounded-lg">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{book.title}</h3>
                  <p className="text-gray-600 text-sm">{book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {club.currentBook && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Book Summary</h2>
          <form onSubmit={handleSubmitSummary}>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
              rows={4}
              placeholder="Share your thoughts about the book..."
              required
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Submit Summary
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Club Review</h2>
        <form onSubmit={handleSubmitReview}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={`p-1 ${rating >= value ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <Star className="h-6 w-6 fill-current" />
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            rows={4}
            placeholder="Share your experience with this book club..."
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Submit Review
          </button>
        </form>
      </div>

      <AddBookModal
        isOpen={showAddBookModal}
        onClose={() => setShowAddBookModal(false)}
        type="reading"
        onAdd={(book) => {
          dispatch(updateBookClubBooks({
            clubId: club.id,
            currentBook: book,
            readBooks: club.readBooks || []
          }));
          setShowAddBookModal(false);
        }}
      />
    </div>
  );
};

export default BookClubDetail;