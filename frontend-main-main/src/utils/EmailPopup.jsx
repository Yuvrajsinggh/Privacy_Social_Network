import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePostPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate("");
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleCancel = () => {
    onClose()
  }

  const handlePasswordReset = () => {
    if (!email) {
      setError('Please enter a valid username.');
      return;
    }

    axios.get(`http://127.0.0.1:8000/user/retrieveusers/`, { params: { name: email, username: email } })
      .then((response) => {
        const responseData = response.data;
        if (responseData.success) {
          setEmail("");
          navigate("/forget");
        } else {
          setError('Username not found. Please enter a correct username.');
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  return (
    <div
      className={`absolute top-0 left-0 inset-0 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? 'opacity-100 backdrop-blur-md' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-lg p-6 shadow-md w-96">
        <div className="flex items-center mb-4">
          <input
            type="text"
            id="usermail"
            value={email}
            placeholder='Enter the Username'
            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null); // Clear the error when the input changes
            }}
          />
        </div>

        {error && (
          <div className="text-red-500 mb-2">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={handlePasswordReset}
          >
            Next
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPopup;
