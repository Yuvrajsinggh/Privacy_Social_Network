import React, { useEffect, useState } from 'react'
import Post from './Feed/Post'
import axios from 'axios';

const Middle = () => {
    const [currentMode, setCurrentMode] = useState('normal');
    const [posts, setPosts] = useState([]);
    const [postIds, setPostIds] = useState([]);
  
    const userData = JSON.parse(localStorage.getItem('userData'));
    const sessionToken = userData ? userData.token : null;
  
    const fetchPosts = async (url) => {
        try {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Token ${sessionToken}`,
            },
          });
          const postIds = response.data.posts.map((post) => post.id);
    
          setPosts(response.data.posts);
          setPostIds(postIds);
        } catch (error) {
          console.error('Error fetching posts: ', error);
        }
      };
      useEffect(() => {
        if (currentMode === 'normal') {
          fetchPosts('http://127.0.0.1:8000/posts/general/');
        } else if (currentMode === 'anonymous') {
          fetchPosts('http://127.0.0.1:8000/posts/anonymous/');
        }
      }, [currentMode]);
  return (
    <>
        <main className='flex h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-black w-full'>
            <div className='p-2 backdrop-blur z-10 bg-white/10 sticky top-0'>
                <div className="mb-4">
                        <button
                            className={`mr-2 px-4 py-2 ${
                                currentMode === 'normal' ? 'bg-blue-500 text-white' : 'bg-gray-300'
                            } rounded`}
                            onClick={() => setCurrentMode('normal')}
                        >
                            Normal Posts
                        </button>
                        <button
                        className={`px-4 py-2 ${
                            currentMode === 'anonymous' ? 'bg-blue-500 text-white' : 'bg-gray-300'
                        } rounded`}
                        onClick={() => setCurrentMode('anonymous')}
                        >
                            Anonymous Posts
                        </button>
                    </div>                
            </div>
                {currentMode === 'normal' && (
                    <div>
                        {posts.map((post) => (
                            <div key={post.id}>
                                    <Post post={post} postId={post.id}/>
                            </div>
                        ))}
                        {/* {postIds.map((postId, index) => (
                        <div key={postId}>
                            <Post postId={postId} post={posts[index]}/>
                        </div>
                        ))} */}
                    </div>
                )}

                {currentMode === 'anonymous' && (
                    <div>
                        {posts.map((post) => (
                            <div key={post.id}>
                                    <Post post={post} postId={post.id}/>
                            </div>
                        ))}
                        {/* {postIds.map((postId, index) => (
                        <div key={postId}>
                            <Post postId={postId} post={posts[index]}/>
                        </div>
                        ))} */}
                    </div>
                )}
        </main>
    </>
  )
}

export default Middle 