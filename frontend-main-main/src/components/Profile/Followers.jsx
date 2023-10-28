import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Followers = () => {
  // Sample follower data with following status
  const navigate = useNavigate();
  const [followers, setFollowers] = useState([
    {
      id: 1,
      username: 'follower1',
      displayName: 'Follower One',
      isFollowing: false,
    },
    {
      id: 2,
      username: 'follower2',
      displayName: 'Follower Two',
      isFollowing: true, // Initially following
    },
    // Add more follower data as needed
  ]);

  // Function to toggle follow/unfollow status
  const toggleFollow = (followerId) => {
    setFollowers((prevFollowers) =>
      prevFollowers.map((follower) =>
        follower.id === followerId
          ? { ...follower, isFollowing: !follower.isFollowing }
          : follower
      )
    );
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Followers</h2>
      <ul>
        {followers.map((follower) => (
          <li
            key={follower.id}
            className="flex justify-between items-center border-b border-gray-300 py-2"
          >
            <p>{follower.displayName} (@{follower.username})</p>
            <button
              onClick={() => toggleFollow(follower.id)}
              className={`${
                follower.isFollowing
                  ? 'bg-gray-300 text-gray-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              } px-3 py-1 rounded focus:outline-none`}
            >
              {follower.isFollowing ? 'Unfollow' : 'Follow'}
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

export default Followers;
