import './PostItem.css'; 
import LikeButton from '../PostButtons/LikeButton';
import ShareButton from '../PostButtons/ShareButton';
import CommentButton from '../PostButtons/Comment/CommentButton';
import CommentPopUp from '../PostButtons/Comment/CommentPopUp';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import EditPost from './Edit/EditPost';
import EditPostForm from './Edit/EditPostForm'; 
import DeletePost from './Delete/DeletePost';

function PostItem({ _id, text, picture, authorP, authorN, isoDate, username, onDelete, onEditPost }) {
    const [editing, setEditing] = useState(false);
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const currentUser = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).username : null;

    const date = new Date(isoDate);
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, 
      });


    const handleEditClick = () => {
        setEditing(true);
    };

    const handleCancelEdit = () => {
        setEditing(false);
    };

    const handleSaveEdit = (editedText) => {
        onSaveText(editedText);
        setEditing(false);
    };

    const onSaveText = (editedText) => {
        onEditPost('text', editedText);
    };


    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const addComment = (newComment) => {
        const newCommentObject = { id: comments.length + 1, text: newComment };
        setComments([...comments, newCommentObject]);
    };

    const deleteComment = (commentId) => {
        setComments(comments.filter(comment => comment.id !== commentId));
    };

    const editComment = (commentId, editedContent) => {
        setComments(comments.map(comment => {
            if (comment.id === commentId) {
                return { ...comment, text: editedContent };
            }
            return comment;
        }));
    };


    const handleLikeClick = () => {
        setLiked(!liked);
    };

    const handleDeleteClick = () => {
        onDelete(_id); 
    };

    return (
<div className="card-container">
        <div className="card mb-3" >
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center justify-content-center">
                    <Link
                        to={{
                            pathname: `/profile/${username}`,
                            state: { onDelete, onEditPost }
                        }}
                        className="author-link"
                    >
                        <img src={authorP} className="rounded-circle me-2" alt="Author" style={{ width: '40px', height: '40px' }} />
                        <span className="author-name">{authorN}</span>
                    </Link>
                      
                    </div>
                    <div className="d-flex align-items-between">
                        {/* Edit and Delete buttons */}
                        {currentUser === username && (
                            <div className="d-flex align-items-between">
                                {editing ? (
                                    <EditPostForm
                                        initialText={text}
                                        onSave={handleSaveEdit}
                                        onCancel={handleCancelEdit}
                                        onEditPost={onEditPost} 
                                    />
                                ) : (

                                    <EditPost onClick={handleEditClick} />
                                )}
                                <DeletePost onDeletePost={DeletePost} onClick={handleDeleteClick} />
                            </div>
                        )}
                        <div className="card-date ml-2" >
                                {formattedDate}
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <p className="card-text">{text}</p>
                </div>
                {picture && (
                    <div className="post-image-container">
                        <img src={picture} className="post-image" alt="Post" />
                    </div>
                )}
                <div className="card-footer d-flex justify-content-between align-items-center">
                <div className="col-4 d-flex justify-content-center">
                    <LikeButton liked={liked} handleLikeClick={handleLikeClick} />
                </div>
                <div className="col-4 d-flex justify-content-center">
                    <CommentButton onClick={toggleComments} />
                </div>
                <div className="col-4 d-flex justify-content-center">
                    <ShareButton />
                </div>
                </div>
            </div>
            {showComments && <CommentPopUp
                comments={comments}
                addComment={addComment}
                deleteComment={deleteComment}
                editComment={editComment}
                onClose={() => setShowComments(false)}
            />}
        </div>
    );
}


export default PostItem;