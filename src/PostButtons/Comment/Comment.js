// Comment.js
import React, { useState, useEffect} from 'react';
import './Comment.css'
import { fetchUserData } from '../../Screen/api';
import { addPrefixIfNeeded, formatDate } from '../../utils';


// { comments, deleteComment, editComment }
const Comment = ({ comment, token }) => {
    const [userData, setUserData] = useState(null);

    // const handleDeleteComment = (commentId) => {
    //     deleteComment(commentId);
    // };

    // const [editedCommentId, setEditedCommentId] = useState(null);
    // const [editedComment, setEditedComment] = useState('');

    // const handleEditComment = (commentId, text) => {
    //     setEditedCommentId(commentId);
    //     setEditedComment(text);
    // };

    // const handleCancelEdit = () => {
    //     setEditedCommentId(null);
    //     setEditedComment('');
    // };

    // const handleSaveEdit = (commentId) => {
    //     editComment(commentId, editedComment);
    //     setEditedCommentId(null);
    //     setEditedComment(''); // Clear the edited comment state after saving
    // };


    useEffect(() => {
        const fetchCommentUserData  = async () => {

            try {
                const data = await fetchUserData(comment.createdBy, token);
               
                if (data) {
                    setUserData(data);
          
                } else {
                  console.error('Error fetching user details:');
                  return comment;
                }
              } catch (error) {
                console.error('Error fetching user details:', error.message);
                return comment;
              }
            
        };
      
        fetchCommentUserData();
      }, [comment, token]);
    
 
    return (
    
        <div className="comments-container">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            {comment ? (
                <div className='mt-3'>
                    <div style={{ display: 'flex', alignItems: 'center' }}>   
                        <div>          
                        {userData && userData.profilePic && (
                                <img src={addPrefixIfNeeded(userData.profilePic)} alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                            )}
                        </div>
                        
                        <div className='comment-content'>
                            {userData && userData.displayName && (
                            <span className="display-name" style={{ marginRight: '10px' }}>{userData.displayName}</span>
                                )}        
                              <p style={{ margin: '0', marginRight: '10px' }}>{comment.text}</p>
                       </div> 
                        
                    </div>
                    <p style={{ margin: '0', color: 'gray', fontSize:'12px' }}>{formatDate(comment.createdAt)}</p>

                </div> 

            ) : (
                <div>No comment available.</div> 
            )}
        </div>
    );
};

export default Comment;


    {/* Render existing comments */}
            {/* {comments.map(comment => (
                <div key={comment.id} className="comment-container">
                    <div className="comment-content"> */}
                        {/* Conditionally render input field if comment is being edited */}
                        {/* {editedCommentId === comment.id ? (
                            <form className="row g-3">
                                <div className="col-auto">
                                    <textarea
                                        className="form-control custom-textarea"
                                        value={editedComment}
                                        onChange={(e) => setEditedComment(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="col-auto">
                                    <button type="button" className="btn btn-primary" onClick={() => handleSaveEdit(comment.id)}>Save</button>
                                </div>
                                <div className="col-auto">
                                    <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <p>{comment.text}</p>
                        )} */}
                    {/* </div>
                    <div className="comment-actions"> */}
                        {/* Add delete and edit functionality */}
                        {/* <button type="button" className="btn btn-outline-secondary btn-sm btn-edit" onClick={() => handleDeleteComment(comment.id)}>
                            <i className="bi bi-trash"></i>
                        </button> */}
                        {/* Render edit button only if not currently editing any comment */}
                        {/* {comment.id !== editedComment.id && (
                            <button type="button" className="btn btn-outline-secondary btn-sm btn-edit" onClick={() => handleEditComment(comment.id, comment.text)}>
                                <i className="bi bi-pencil"></i>
                            </button>
                        )}
                    </div>
                </div>
            ))} */}