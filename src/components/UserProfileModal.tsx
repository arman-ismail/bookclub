import React from 'react';
import { X, BookOpen, Users, Heart } from 'lucide-react';
import { User } from '../types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { followUser, unfollowUser } from '../store/slices/authSlice';

interface UserProfileModalProps {
  user: User;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const { following, user: currentUser } = useSelector((state: RootState) => state.auth);
  const isFollowing = following.includes(user.id);

  const handleFollowToggle = () => {
    if (isFollowing) {
      dispatch(unfollowUser(user.id));
    } else {
      dispatch(followUser(user.id));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
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
            </div>
          </div>
        </div>

        <div className="pt-20 pb-6 px-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div className="flex justify-center space-x-6 mb-6">
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-semibold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Books</div>
            </div>
          </div>

          {currentUser && currentUser.id !== user.id && (
            <button
              onClick={handleFollowToggle}
              className={`w-full py-2 px-4 rounded-md transition-colors ${
                isFollowing
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;