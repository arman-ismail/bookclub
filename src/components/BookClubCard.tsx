import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Users, BookOpen } from 'lucide-react';
import { BookClub } from '../types';
import { RootState } from '../store';
import { joinBookClub, leaveBookClub } from '../store/slices/bookClubSlice';

interface BookClubCardProps {
  club: BookClub;
}

const BookClubCard: React.FC<BookClubCardProps> = ({ club }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const isMember = club.members.some(m => m.id === user?.id);

  const handleJoinLeave = () => {
    if (!user) return;
    
    if (isMember) {
      dispatch(leaveBookClub({ clubId: club.id, userId: user.id }));
    } else {
      dispatch(joinBookClub({ clubId: club.id, user }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${club.coverImage})` }}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{club.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{club.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Users className="h-5 w-5" />
            <span>{club.members.length} members</span>
          </div>
          {club.currentBook && (
            <div className="flex items-center space-x-2 text-gray-600">
              <BookOpen className="h-5 w-5" />
              <span className="truncate max-w-[150px]">{club.currentBook.title}</span>
            </div>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleJoinLeave}
            className={`flex-1 text-center px-4 py-2 rounded-md transition-colors ${
              isMember 
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {isMember ? 'Leave Club' : 'Join Club'}
          </button>
          <Link
            to={`/clubs/${club.id}`}
            className="flex-1 text-center bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookClubCard;