import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Book, Users, BookOpen } from 'lucide-react';
import { RootState } from '../store';

const Home: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    switch (action) {
      case 'join':
        navigate('/clubs');
        break;
      case 'discuss':
        navigate('/clubs');
        break;
      case 'track':
        navigate('/profile');
        break;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to BookClub</h1>
        <p className="text-xl text-gray-600">Connect with fellow readers and explore new worlds together</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <button
          onClick={() => handleAction('join')}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
        >
          <Book className="h-12 w-12 text-indigo-600 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold mb-2">Join Book Clubs</h3>
          <p className="text-gray-600 mb-4">Connect with readers who share your interests and discover new perspectives.</p>
          <span className="text-indigo-600 font-medium group-hover:underline">Browse Clubs →</span>
        </button>

        <button
          onClick={() => handleAction('discuss')}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
        >
          <Users className="h-12 w-12 text-indigo-600 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold mb-2">Engage in Discussions</h3>
          <p className="text-gray-600 mb-4">Share your thoughts and participate in meaningful conversations about books.</p>
          <span className="text-indigo-600 font-medium group-hover:underline">Join Discussions →</span>
        </button>

        <button
          onClick={() => handleAction('track')}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
        >
          <BookOpen className="h-12 w-12 text-indigo-600 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-semibold mb-2">Track Your Reading</h3>
          <p className="text-gray-600 mb-4">Keep track of your reading progress and share reviews with the community.</p>
          <span className="text-indigo-600 font-medium group-hover:underline">View Profile →</span>
        </button>
      </div>

      {!isAuthenticated ? (
        <div className="text-center">
          <Link
            to="/register"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
          >
            Join the Community
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <Link
            to="/clubs"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
          >
            Explore Book Clubs
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;