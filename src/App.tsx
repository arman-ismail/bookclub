import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import BookClubs from './pages/BookClubs';
import CreateBookClub from './pages/CreateBookClub';
import BookClubDetail from './pages/BookClubDetail';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/clubs" element={<PrivateRoute><BookClubs /></PrivateRoute>} />
            <Route path="/clubs/create" element={<PrivateRoute><CreateBookClub /></PrivateRoute>} />
            <Route path="/clubs/:id" element={<PrivateRoute><BookClubDetail /></PrivateRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;