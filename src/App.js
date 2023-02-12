import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Index from './pages/index.js';
import LoggedIndex from './pages/loggedindex.js';
import Register from './pages/register.js';
import Login from './pages/login.js';
import Privacy from './pages/privacy.js';
import Terms from './pages/terms.js';
import Profile from './pages/profile.js';
import UserProfile from './pages/userprofile.js';
import DelAcc from './pages/delacc.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/home" element={<LoggedIndex />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/userprofile" element={<UserProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/privacypolicy" element={<Privacy />} />
      <Route path="/termsofservice" element={<Terms />} />
      <Route path="/deleteaccount" element={<DelAcc />} />
    </Routes>
  );
}

export default App;