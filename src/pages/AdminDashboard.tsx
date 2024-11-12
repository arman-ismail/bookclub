import React from 'react';
import { useSelector } from 'react-redux';
import { Users, BookOpen, BarChart2 } from 'lucide-react';
import { RootState } from '../store';

const AdminDashboard: React.FC = () => {
  const { bookClubs } = useSelector((state: RootState) => state.bookClubs);
  const { summaries } = useSelector((state: RootState) => state.books);

  const totalMembers = bookClubs.reduce((acc, club) => acc + club.members.length, 0);
  const totalBooks = bookClubs.reduce((acc, club) => acc + (club.currentBook ? 1 : 0), 0);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Users className="h-8 w-8 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Total Members</h3>
          <p className="text-3xl font-bold text-gray-900">{totalMembers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <BookOpen className="h-8 w-8 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Active Books</h3>
          <p className="text-3xl font-bold text-gray-900">{totalBooks}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <BarChart2 className="h-8 w-8 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Book Summaries</h3>
          <p className="text-3xl font-bold text-gray-900">{summaries.length}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Book Clubs</h2>
          <div className="space-y-4">
            {bookClubs.slice(0, 5).map((club) => (
              <div key={club.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{club.name}</h3>
                  <p className="text-sm text-gray-600">{club.members.length} members</p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-700">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Summaries</h2>
          <div className="space-y-4">
            {summaries.slice(0, 5).map((summary) => (
              <div key={summary.id} className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Book Summary</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(summary.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button className="text-indigo-600 hover:text-indigo-700">
                  View Summary
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;