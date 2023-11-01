import React, { useEffect, useState } from 'react';
import { Avatar, Typography } from "@material-tailwind/react";
import Rune from './Rune';
import { LikeIcon, ReplyIcon, ReportIcon, DeleteIcon } from './Icons';
import axios from 'axios';

const Post = ({ post, postId }) => {
  const [reported, setReported] = useState(false); // New state for reporting
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const sessionToken = userData ? userData.token : null;

  const getLike = () => {
    axios.get(`http://127.0.0.1:8000/post/likes/${postId}`).then((response) => 
    {
      if (response.data.success) {
        setLikeCount(response.data.likes_count);
        
      } else {
        console.error(response.data.message);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const fetchComments = () => {
    axios.get(`http://127.0.0.1:8000/post/comments/${postId}/`)
      .then((response) => {
        if (response.data.success) {
          setComments(response.data.comments);
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLike = () => {
    
    axios.post(`http://127.0.0.1:8000/post/like/${postId}/`,null, {
      headers: {
        Authorization: `Token ${sessionToken}`,
      },
    }).then((response) => {
      if (response.data.success) {
        getLike();
      } else {
        console.error(response.data.message);
      }
    }).catch((error) => {
      console.log(likeCount)
      console.error(error);
    });
  };

  const handleReport = () => {
    if (reported) {
      // If already reported, unreport the post.
      axios.post(`http://127.0.0.1:8000/post/report/${postId}/`, null, {
        headers: {
          Authorization: `Token ${sessionToken}`,
        },
      }).then((response) => {
        if (response.data.success) {
          setReported(false);
        } else {
          console.error(response.data.message);
        }
      }).catch((error) => {
        console.error(error);
      });
    } else {
      // If not reported, report the post.
      axios.post(`http://127.0.0.1:8000/post/report/${postId}/`, null, {
        headers: {
          Authorization: `Token ${sessionToken}`,
        },
      }).then((response) => {
        if (response.data.success) {
          setReported(true);
        } else {
          console.error(response.data.message);
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  };

  const handleCommentClick = () => {
    fetchComments();
    setShowCommentBox(!showCommentBox);
    setComments([]);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      axios.post(`http://127.0.0.1:8000/post/comments/${postId}/`, {
        comment: newComment,
      }).then((response) => {
        if (response.data.success) {
          fetchComments();
          setNewComment('');
          setCommentCount(commentCount + 1);
        } else {
          console.error(response.data.message);
        }
      }).catch((error) => {
        console.error(error);
        setComments([...comments, newComment]);
        setNewComment('');
        setCommentCount(commentCount + 1);
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      axios
        .delete(`http://127.0.0.1:8000/post/delete/${postId}/`, {
          headers: {
            Authorization: `Token ${sessionToken}`,
          },
        })
        .then((response) => {
          if (response.data.success) {
            alert("Post Deleted | Please Refresh once")
          } else {
            alert("You can't delete other user post")
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <div className="border-t-[2px] hover:bg-gray-200 transition-colors duration-500 ease-out px-4 pt-3 pb-2">

        <div className="flex gap-1 items-center">
          <Avatar src={"http://127.0.0.1:8000" + post.user_profile_picture} alt="avatar" size='md' className={`${post.anonymous_status ? 'hidden' : 'block'}`} />
          <Typography variant="lead" color="current" className={`${post.anonymous_status ? 'hidden' : 'font-bold'}`}>
            {post.display_name}
          </Typography>
          <Typography variant="paragraph" color="gray" className={`${post.anonymous_status ? 'font-bold text-md text-black' : 'font-normal'}`}>
            @{post.user}
          </Typography><span className='font-bold'>.</span>
          <Typography variant="small" color="gray">
          {post.created_at}
          </Typography>
        </div>
        <p className="text-gray-600 mt-2">{post.description}</p>

        <div className="mt-4 flex justify-between">
          <div className='flex items-center group' onClick={handleLike}>
            <Rune
              Icon={<LikeIcon fill="group-hover:fill-red-500" />}
              color="group-hover:bg-red-100"
            />
            <span className="group-hover:text-red-500">{likeCount}</span>
          </div>
          <div className="flex items-center group" onClick={handleCommentClick}>
            <Rune
              Icon={<ReplyIcon fill="group-hover:fill-red-500" />}
              color="group-hover:bg-red-100"
            />
            <span className="group-hover:text-red-500">{commentCount}</span>
          </div>
          <div className="flex items-center group" onClick={handleReport}>
            <Rune
              Icon={<ReportIcon fill="group-hover:fill-red-500" />}
              color="group-hover:bg-red-100"
            />
            {reported ? (
              <span className="group-hover:text-red-500">Reported</span>
            ) : (
              <span>Report</span>
            )}
          </div>
          <div className="flex items-center group" onClick={handleDelete}>
            <Rune
              Icon={<DeleteIcon fill="group-hover:fill-red-500" />}
              color="group-hover:bg-red-100"
            />
          </div>
        </div>

        {showCommentBox && (
          <div className="mt-4">
            <input
              type="text"
              className="border rounded-md p-2 w-full"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              onClick={handleAddComment}
            >
              Add Comment
            </button>
          </div>
        )}

        {comments.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Comments:</h3>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className="mt-2">{comment}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Post;

