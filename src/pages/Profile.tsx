import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BookOpen, Users, Library, Star, UserCircle, Plus, Heart, Mail, X, Check, Camera } from 'lucide-react';
import { RootState } from '../store';
import MemberList from '../components/MemberList';
import AddBookModal from '../components/AddBookModal';
import { markAsRead } from '../store/slices/bookSlice';
import { setUser } from '../store/slices/authSlice';

const Profile: React.FC = () => {
  const { user, following, followers } = useSelector((state: RootState) => state.auth);
  const { userBooks, currentlyReading } = useSelector((state: RootState) => state.books);
  const { userBookClubs } = useSelector((state: RootState) => state.bookClubs);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [addBookType, setAddBookType] = useState<'reading' | 'read'>('reading');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleMarkAsRead = (bookId: string) => {
    dispatch(markAsRead(bookId));
  };

  const openAddBookModal = (type: 'reading' | 'read') => {
    setAddBookType(type);
    setShowAddBookModal(true);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && user) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        dispatch(setUser({ ...user, avatar: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        <div className="px-6 py-4 flex flex-col md:flex-row items-center md:items-end -mt-20 relative">
          <div className="relative z-10">
            <div className="w-32 h-32 bg-white rounded-full border-4 border-white overflow-hidden shadow-lg relative group">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <span className="text-4xl font-bold text-indigo-600">
                    {user.name.charAt(0)}
                  </span>
                </div>
              )}
              <div 
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-8 w-8 text-white" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <button
                onClick={() => {
                  setShowFollowers(true);
                  setShowFollowing(false);
                }}
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
              >
                <Users className="h-5 w-5" />
                <span>{followers.length} followers</span>
              </button>
              <button
                onClick={() => {
                  setShowFollowing(true);
                  setShowFollowers(false);
                }}
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
              >
                <Heart className="h-5 w-5" />
                <span>{following.length} following</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
                <BookOpen className="h-5 w-5" />
                <span>{userBookClubs.length} book clubs</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Currently Reading Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Currently Reading</h2>
          <button
            onClick={() => openAddBookModal('reading')}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="h-5 w-5" />
            <span>Add Book</span>
          </button>
        </div>

        {currentlyReading.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No books currently being read</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {currentlyReading.map((book) => (
              <div key={book.id} className="flex space-x-4 bg-gray-50 p-4 rounded-lg">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{book.author}</p>
                  <button
                    onClick={() => handleMarkAsRead(book.id)}
                    className="flex items-center space-x-1 text-green-600 hover:text-green-700"
                  >
                    <Check className="h-4 w-4" />
                    <span>Mark as Read</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reading History Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Reading History</h2>
          <button
            onClick={() => openAddBookModal('read')}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
          >
            <Plus className="h-5 w-5" />
            <span>Add Book</span>
          </button>
        </div>

        {userBooks.length === 0 ? (
          <div className="text-center py-8">
            <Library className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No books in reading history</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {userBooks.map((book) => (
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
        )}
      </div>

      {/* Following/Followers Modal */}
      {(showFollowing || showFollowers) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {showFollowing ? 'Following' : 'Followers'}
              </h2>
              <button
                onClick={() => {
                  setShowFollowing(false);
                  setShowFollowers(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <MemberList
              members={showFollowing ? following.map(id => ({
                id,
                name: `User ${id}`,
                email: `user${id}@example.com`,
                role: 'user'
              })) : followers.map(id => ({
                id,
                name: `User ${id}`,
                email: `user${id}@example.com`,
                role: 'user'
              }))}
            />
          </div>
        </div>
      )}

      {/* Add Book Modal */}
      <AddBookModal
        isOpen={showAddBookModal}
        onClose={() => setShowAddBookModal(false)}
        type={addBookType}
      />
    </div>
  );
};

export default Profile;