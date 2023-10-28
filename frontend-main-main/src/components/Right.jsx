import React, { useState, useEffect } from 'react';
import Search from '../utils/Search'; // Import the Search component.

const App = () => {
    // eslint-disable-next-line
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Define a function to perform the user search and update searchResults state.
  const handleUserSearch = (query) => {
    // Clear searchResults when the query is empty.
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    // Call your backend API to search for users based on the query.
    // Update the searchResults state with the search results.
    // For simplicity, you can use mock data until your backend is ready.

    // Mock data example:
    const mockSearchResults = [
      { id: 1, username: 'user1', name: 'User One' },
      { id: 2, username: 'user2', name: 'User Two' },
      // Add more results here.
    ];

    setSearchResults(mockSearchResults);
  };

  useEffect(() => {
    // Load initial data or perform other setup tasks here.
  }, []);

  return (
    <div className="min-h-screen p-4 w-fit bg-gradient-to-r from-[#ff4b2b] to-[#ff416c]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-semibold mb-4 text-white">User Search</h1>
        <Search
          onSearch={(query) => {
            setSearchQuery(query); 
            handleUserSearch(query);
          }}
        />
        <div className="mt-4">
          {searchResults.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-gray-600">@{user.username}</p>
            </div>
          ))}
        </div>
        {/* Other components like Feed, CreatePost, etc. */}
      </div>
    </div>
  );
};

export default App;
