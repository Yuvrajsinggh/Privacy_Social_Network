import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ForgetPasswordForm = () => {
  const navigate = useNavigate("")
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const userData = JSON.parse(localStorage.getItem('userData'));
  const sessionToken = userData ? userData.token : null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMatchError("Passwords don't match");
    } else {
      const response = await axios.put('http://127.0.0.1:8000/user/update/', {password: newPassword}, {
        headers: {
          Authorization: `Token ${sessionToken}`,
        },
      }); 
      if (response.data.success) {
        navigate("/login")
      } else {
        console.error(response.data.message);
      }

    }

    
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Reset Your Password</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          {passwordMatchError && (
            <div className="text-red-600 mb-4">{passwordMatchError}</div>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
