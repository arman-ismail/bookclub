import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserCircle, UserPlus, UserMinus } from 'lucide-react';
import { User } from '../types';
import { RootState } from '../store';
import { followUser, unfollowUser } from '../store/slices/authSlice';
import UserProfileModal from './UserProfileModal';

interface MemberListProps {
  members: User[];
  showFollow?: boolean;
}

const MemberList: React.FC<MemberListProps> = ({ members, showFollow = true }) => {
  const dispatch = useDispatch();
  const { user, following } = useSelector((state: RootState) => state.auth);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const handleFollowToggle = (memberId: string) => {
    if (following.includes(memberId)) {
      dispatch(unfollowUser(memberId));
    } else {
      dispatch(followUser(memberId));
    }
  };

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setSelectedUser(member)}
          >
            {member.avatar ? (
              <img
                src={member.avatar}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-indigo-600" />
              </div>
            )}
            <div>
              <h3 className="font-medium text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.email}</p>
            </div>
          </div>
          
          {showFollow && user && member.id !== user.id && (
            <button
              onClick={() => handleFollowToggle(member.id)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
                following.includes(member.id)
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              }`}
            >
              {following.includes(member.id) ? (
                <>
                  <UserMinus className="w-4 h-4" />
                  <span>Unfollow</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Follow</span>
                </>
              )}
            </button>
          )}
        </div>
      ))}

      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default MemberList;