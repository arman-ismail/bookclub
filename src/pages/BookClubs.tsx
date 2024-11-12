import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Plus, Users } from 'lucide-react';
import { RootState } from '../store';
import BookClubCard from '../components/BookClubCard';

const BookClubs: React.FC = () => {
  const { bookClubs } = useSelector((state: RootState) => state.bookClubs);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Book Clubs</h1>
        <Link
          to="/clubs/create"
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Create Club</span>
        </Link>
      </div>

      {bookClubs.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No book clubs yet</h3>
          <p className="text-gray-600 mb-4">Create your first book club or join existing ones.</p>
          <Link
            to="/clubs/create"
            className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="h-5 w-5" />
            <span>Create a Book Club</span>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookClubs.map((club) => (
            <BookClubCard key={club.id} club={club} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookClubs;