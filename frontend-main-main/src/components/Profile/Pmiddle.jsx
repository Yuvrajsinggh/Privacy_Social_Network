import React, { useEffect, useState } from 'react';
import EditProfileModal from './EditProfileModal';
import Post from '../Feed/Post';
import { Link } from 'react-router-dom';
import { Avatar } from "@material-tailwind/react";
import axios from 'axios';

const Pmiddle = ({ selectedUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAnonymousPosts, setShowAnonymousPosts] = useState(false);
  const [user, setUser] = useState({});
  const [anonymousPosts, setAnonymousPosts] = useState([]);
  const [nonAnonymousPosts, setNonAnonymousPosts] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const sessionToken = userData ? userData.token : null;
  const [isFollowing, setIsFollowing] = useState(false);

  const isPrivateAccount = selectedUser && selectedUser.privacy_status

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const toggleAnonymousPosts = (showAnonymous) => {
    setShowAnonymousPosts(showAnonymous);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchUserDataAndPostsAndFollows = async () => {
      if (selectedUser) {
        const followsRespnse = await axios.get(`http://127.0.0.1:8000/user/followcount/${selectedUser.id}/`, {
          headers: {
            Authorization: `Token ${sessionToken}`,
          },
        });

        setUser({
          image: "http://127.0.0.1:8000" + selectedUser.profile_picture,
          username: selectedUser.username,
          displayName: selectedUser.first_name + " " + selectedUser.last_name,
          anonymousName: selectedUser.anonymous_name,
          followers: followsRespnse.data.followers_count,
          following: followsRespnse.data.following_count,
        });

        const followStatusResponse = await axios.get(`http://127.0.0.1:8000/user/follow/${selectedUser.id}/`, {
          headers: {
            Authorization: `Token ${sessionToken}`,
          },
        });
        setIsFollowing(followStatusResponse.data.success && followStatusResponse.data.following.some(item => item.follows_id === selectedUser.id));

        const postsResponse = await axios.get(`http://127.0.0.1:8000/posts/otheruserposts/${selectedUser.id}/`);
  
        // Separate posts into anonymous and non-anonymous
        const { anonymous_posts, non_anonymous_posts } = postsResponse.data;
        // setAnonymousPosts(anonymous_posts);
        setNonAnonymousPosts(non_anonymous_posts);
        console.log(postsResponse.data)
      }

      else {
      const userResponse = await axios.get('http://127.0.0.1:8000/user/current/', {
        headers: {
          Authorization: `Token ${sessionToken}`,
        },
      });
      console.log(userResponse)
      const userId = userResponse.data.id;

      const followsRespnse = await axios.get(`http://127.0.0.1:8000/user/followcount/${userId}/`, {
        headers: {
          Authorization: `Token ${sessionToken}`,
        },
      });

      setUser({
        image: "http://127.0.0.1:8000" + userResponse.data.profile_picture,
        username: userResponse.data.username,
        displayName: userResponse.data.first_name + " " + userResponse.data.last_name,
        anonymusName: userResponse.data.anonymous_name,
        followers: followsRespnse.data.followers_count, 
        following: followsRespnse.data.following_count,
      });

      const postsResponse = await axios.get('http://127.0.0.1:8000/posts/userposts/', {
        headers: {
          Authorization: `Token ${sessionToken}`,
        },
      });

      // Separate posts into anonymous and non-anonymous
      const { anonymous_posts, non_anonymous_posts } = postsResponse.data;
      setAnonymousPosts(anonymous_posts);
      setNonAnonymousPosts(non_anonymous_posts);
    };
  }
    fetchUserDataAndPostsAndFollows();
  }, [selectedUser, isFollowing]);


  const displayPosts = showAnonymousPosts ? anonymousPosts : nonAnonymousPosts;
  const sortedPosts = displayPosts.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));


  const handleFollowClick = async () => {
    if (isFollowing) {
      // Unfollow the user
      await axios.post(`http://127.0.0.1:8000/user/follow/${selectedUser.id}/`, null, {
        headers: {
          Authorization: `Token ${sessionToken}`,
        },
      });
      setIsFollowing(false);
    } else {
      // Follow the user
      await axios.post(`http://127.0.0.1:8000/user/follow/${selectedUser.id}/`, null, {
        headers: {
          Authorization: `Token ${sessionToken}`,
        },
      });
      setIsFollowing(true);
    }
  };

  return (
    <div className="rounded shadow-lg w-full h-full bg-white/10 border-black border-l-[0.5px]">
      <div className="p-4">
        <div className="flex justify-between items-center">
          <Avatar src={user.image} alt="avatar" size='xxl' />
          {selectedUser && selectedUser.id !== userData.id ? (
            <button
              onClick={handleFollowClick}
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-semibold">{user.displayName}</h1>
          <p className="text-gray-600">@{user.username}</p>
          <p className="text-gray-600">@{user.anonymusName}</p>
        </div>
        <div className="mt-6">
          <div className="flex">
            <div className="mr-6">
              <Link to="/followers">
                <p className="font-semibold">{user.followers}</p>
                Followers
              </Link>
            </div>
            <div>
              <Link to="/following">
                <p className="font-semibold">{user.following}</p>
                Following
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center mb-4">
          {selectedUser && selectedUser.id !== userData.id ? (
            <ul className="flex w-full justify-around">
              <li className={!showAnonymousPosts ? 'hover:border-b-2 border-black' : ''}
                onClick={() => toggleAnonymousPosts(false)}
              >
                Normal Posts
              </li>
            </ul>
          ) : (
            <ul className="flex w-full justify-around">
              <li className={showAnonymousPosts ? 'hover:border-b-2 border-black' : ''}
                onClick={() => toggleAnonymousPosts(true)}
              >
                Anonymous Posts
              </li>
              <li className={!showAnonymousPosts ? 'hover:border-b-2 border-black' : ''}
                onClick={() => toggleAnonymousPosts(false)}
              >
                Normal Posts
              </li>
            </ul>
          )}
        </div>
        {isPrivateAccount && !isFollowing ? (
          <p className='w-full h-full text-center'>This Account is Private. Follow it to see the posts.</p>
        ) : (
          <ul>
            {sortedPosts.map((post) => (
              <li key={post.id}>
                <Post post={post} postId={post.id}/>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isEditing && <EditProfileModal onClose={handleCloseModal} isOpen={isEditing}/>}
    </div>
  );
};

export default Pmiddle;
