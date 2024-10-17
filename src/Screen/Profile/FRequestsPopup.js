import React, { useState, useEffect } from 'react';
import { acceptFriendRequest, deleteFriendRequest } from '../Request_api';
import {fetchUserData} from '../api'



const FRequestsPopup = ({ token, currentUser, friendreqs, handleClose }) => {
    const [friendReqDetails, setfriendReqDetails] = useState([]);

    const handleAcceptRequest = async (friendId) => {
        try {
            await acceptFriendRequest(currentUser.id, friendId, token);
            // Handle the accepted request (e.g., remove it from the list)
        } catch (error) {
            console.error('Error accepting friend request:', error.message);
            // Handle error display or logging here
        }
    };

    const handleDeleteRequest = async (friendId) => {
        try {
            await deleteFriendRequest(currentUser.id, friendId, token);
            // Handle the deleted request (e.g., remove it from the list)
        } catch (error) {
            console.error('Error deleting friend request:', error.message);
            // Handle error display or logging here
        }
    };

   
    useEffect(() => {
        const fetchFriendReqsDetails = async () => {
            const details = await Promise.all(
                friendreqs.map(async (friendReq) => {
                    try {
                        const friendInfo = await fetchUserData(friendReq, token);
                        return friendInfo; 
                    } catch (error) {
                        console.error('Error fetching friendReq data:', error);
                        return { profilePic: '', displayName: 'Unknown', id: friendReq };
                    }
                })
            );
            setfriendReqDetails(details);
        };
    
        fetchFriendReqsDetails();
    }, [friendreqs, token]); // The effect runs when 'friends' or 'token' changes


   

    return (
        <div className="popup-container">
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-content">
                    <button className="close-button" onClick={handleClose}>
                        <i className="bi bi-x-circle"></i>
                    </button>
                    <div className="popup-inner">
                        <h2>Friend Requests</h2>
                        {friendReqDetails.length > 0 ? (
                            <ul>
                                {friendReqDetails.map((request) => (
                                <li key={request.userName}>
                                    {request.userName}
                                    <div className="friend-item">
                                        <img
                                            src={`data:image/jpeg;base64,${request.profilePic}`} 
                                            alt="Profile"
                                            className="rounded-circle profile-image"
                                            />
                                        <span className="display-name">{request.displayName}</span>
                                    </div>
                                    <button onClick={() => handleAcceptRequest(request.senderId)}>Accept</button>
                                    <button onClick={() => handleDeleteRequest(request.senderId)}>Delete</button>
                                </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No friend requests</p>
                        )}
                        <button onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FRequestsPopup;
