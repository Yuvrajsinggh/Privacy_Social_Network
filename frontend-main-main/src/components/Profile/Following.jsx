import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Following = () => {
  // Sample following data with following status
  const navigate = useNavigate();
  const [following, setFollowing] = useState([
    {
      id: 1,
      username: 'following1',
      displayName: 'Following One',
      isFollowing: false,
    },
    {
      id: 2,
      username: 'following2',
      displayName: 'Following Two',
      isFollowing: true, // Initially following
    },
    // Add more following data as needed
  ]);

  // Function to toggle follow/unfollow status
  const toggleFollow = (followingId) => {
    setFollowing((prevFollowing) =>
      prevFollowing.map((followed) =>
        followed.id === followingId
          ? { ...followed, isFollowing: !followed.isFollowing }
          : followed
      )
    );
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Following</h2>
      <ul>
        {following.map((followed) => (
          <li
            key={followed.id}
            className="flex justify-between items-center border-b border-gray-300 py-2"
          >
            <p>{followed.displayName} (@{followed.username})</p>
            <button
              onClick={() => toggleFollow(followed.id)}
              className={`${
                followed.isFollowing
                  ? 'bg-gray-300 text-gray-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } px-3 py-1 rounded focus:outline-none`}
            >
              {followed.isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        Go Back
      </button>
    </div>
  );
};

export default Following;
