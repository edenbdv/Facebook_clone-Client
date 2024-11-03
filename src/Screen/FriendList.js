import React ,{ useEffect, useState }  from 'react';
import {fetchUserData} from './api'

const FriendListPopup = ({ token, friends, handleClose }) => {

    const [friendDetails, setFriendDetails] = useState([]);

    useEffect(() => {
        const fetchFriendsDetails = async () => {
            const details = await Promise.all(
                friends.map(async (friend) => {
                    try {
                        const friendInfo = await fetchUserData(friend, token);
                        return friendInfo; 
                    } catch (error) {
                        console.error('Error fetching friend data:', error);
                        return { profilePic: '', displayName: 'Unknown', id: friend };
                    }
                })
            );
            setFriendDetails(details);
        };
    
        fetchFriendsDetails();
    }, [friends, token]); // The effect runs when 'friends' or 'token' changes


    // Check if friends is null or undefined
    if (friends === null || friends.length === 0) {
        return (
            <div className="popup-container">
                <div className="popup" onClick={(e) => e.stopPropagation()}>
                    <div className="popup-content">
                        <button className="close-button" onClick={handleClose}>
                            <i className="bi bi-x-circle"></i>
                        </button>
                        <div>No friends to show</div>
                    </div>
                </div>
            </div>
        );
    }

    if (!Array.isArray(friends)) {
        return null; 
    }


    // Render the list of friends
    return (
        <div className="popup-container">
            <div className="popup" onClick={(e) => e.stopPropagation()}>
                <div className="popup-content">
                    <h2>Friends</h2>

                    <button className="close-button" onClick={handleClose}>
                        <i className="bi bi-x-circle"></i>
                    </button>
                    {friendDetails.map((friend, index) => (
                        <div className="friend-item" key={index}>
                            <img
                                src={`data:image/jpeg;base64,${friend.profilePic}`} 
                                alt="Profile"
                                className="rounded-circle profile-image"
                                />
                            <span className="display-name">{friend.displayName}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FriendListPopup;
