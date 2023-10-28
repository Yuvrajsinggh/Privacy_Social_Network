import React, { useState } from 'react';
import axios from 'axios';

const Pright = ({ setSelectedUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchTerm) {
    axios.get(`http://127.0.0.1:8000/user/retrieveusers/`, { params: { name: searchTerm, username: searchTerm } })
      .then((response) => {
        setSearchResults(response.data.users); 
      })
      .catch((error) => {
        console.error(error.message);
        setSearchResults([]); 
      });
    };
  }

  const handleClear = () => {
    setSearchTerm('');
    setSearchResults([]);
    setSelectedUser(null)
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div className="min-h-screen p-4 w-fit bg-gradient-to-r from-[#ff4b2b] to-[#ff416c]">
      <div className="mx-auto w-[18rem]">
        <input
        type="text"
        className="w-64 border p-2 rounded-lg"
        placeholder="Search for users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {searchTerm && (
        <span
          className="absolute top-[27px] right-[19px] cursor-pointer"
          onClick={handleClear}
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      )}
      <div className="mt-4">
        {searchResults.map((user) => (
          <div key={user.id} className="bg-white shadow-md rounded-lg p-3 mb-4" onClick={() => handleUserSelect(user)}>
            <p className="text-lg font-semibold">{user.first_name + " " +user.last_name}</p>
            <p className="text-gray-600">@{user.username}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Pright;

