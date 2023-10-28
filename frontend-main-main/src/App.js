import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './container/Home';
import Profile from './container/Profile';
import Followers from './components/Profile/Followers';
import Following from './components/Profile/Following';
import Login from './container/Login/Login';
import Settings from './container/Settings';
import Message from './container/Message';
import ForgetPasswordForm from './utils/ForgetPasswordForm';

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Login />} />
      <Route path="/twitter" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/followers" element={<Followers />} />
      <Route path="/following" element={<Following />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/message" element={<Message />} />
      <Route path="/forget" element={<ForgetPasswordForm /> } />
    </Routes>
  )
}

export default App