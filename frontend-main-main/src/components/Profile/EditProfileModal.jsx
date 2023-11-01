import React, { useState } from 'react';
import axios from 'axios';


const EditProfileModal = ({ onClose, isOpen }) => {
  const [formData, setFormData] = useState({
    username: '', 
    displayName: '',
    image: null,
  });

  const userData = JSON.parse(localStorage.getItem('userData'));
  const sessionToken = userData ? userData.token : null;

  const [first_name, last_name] = formData.displayName.split(" ");


  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'file' ? e.target.files[0] : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async () => {
    try {

      const updatedData = new FormData();

      // Add fields to FormData
      if (formData.username) {
        updatedData.append('username', formData.username);
      }
      if (formData.displayName) {
        updatedData.append('first_name', first_name);
        updatedData.append('last_name', last_name);
      }
      if (formData.image) {
        updatedData.append('profile_picture', formData.image);
      }

      const response = await axios.put('http://127.0.0.1:8000/user/update/', updatedData, {
        headers: {
          Authorization: `Token ${sessionToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }); 
      if (response.data.success) {
        onClose(); 
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50  ${
      isOpen ? 'opacity-100 backdrop-blur-md' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="bg-white p-4 w-1/3 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
          <div className="mb-4">
            <label htmlFor="editname" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="editname"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="editdn" className="block text-gray-700 font-bold mb-2">
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              id="editdn"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="editimage" className="block text-gray-700 font-bold mb-2">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              id="editimage"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
