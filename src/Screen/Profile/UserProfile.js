// UserProfile.js
import React, { useEffect, useState } from 'react';
import './Profile.css';
import Feed from '../Feed/Feed';
import EditProfilePopup from './EditProfilePopup';
import FriendListPopup from '../FriendList'; 
import { useNavigate } from 'react-router-dom';
import FRequestsPopup from './FRequestsPopup';
import { fetchUserData,fetchUserPosts, fetchFriendsList, saveChanges, deleteUserProfile } from '../api';

const UserProfile = ({ token, onDelete, onEditPost }) => {
    const [userDetails,setUserDetails] = useState(null);
    const [showEditContainer, setShowEditContainer] = useState(false);
    const [showFriendList, setShowFriendList] = useState(false); 
    const [userPosts, setUserPosts] = useState([]);
    const [friendsList, setFriendsList] = useState([]); 
    const [showFriendRequests, setShowFriendRequests] = useState(false); 

    const [storedUserData, setStoredUserData] = useState(() => {
        const data = localStorage.getItem('userData');
        return data ? JSON.parse(data) : null;
    });

    const navigate = useNavigate(); // Initialize navigate

    const fetchUserDetails = async () => {
        if (storedUserData && token) {
            try {
                const userInfo = await fetchUserData(storedUserData.username, token);
                const friends = await fetchFriendsList(storedUserData.username, token);
                setUserDetails(userInfo);
                setFriendsList(friends);
                
                console.log("userdata before: ",storedUserData)
                console.log("userInfo(fetched):",userInfo)

                // Update local storage with merged user data
                const updatedUserData = { ...storedUserData, ...userInfo };
                localStorage.setItem('userData', JSON.stringify(updatedUserData));
                setStoredUserData(updatedUserData);

                console.log("userdata after: ",updatedUserData)

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };


    useEffect(() => {
            fetchUserDetails();
    }, [storedUserData.username, token]);



    useEffect(() => {
        if (storedUserData  && token) {
            fetchUserPosts(storedUserData.username, token)
                .then(posts => {
                    setUserPosts(posts);
                })
                .catch(error => console.error('Error fetching user posts:', error));

            fetchFriendsList(storedUserData.username, token)
                .then(friends => setFriendsList(friends))
                .catch(error => console.error('Error fetching friends list:', error));

        }
    }, [storedUserData,token]);



    const openEditContainer = () => {
        setShowEditContainer(true);
    };

    const closeEditContainer = () => {
        setShowEditContainer(false);
    };

    const handleOpenFriendList = () => {
        setShowFriendList(true);
    };

    const handleCloseFriendList = () => {
        setShowFriendList(false);
    };

    const handleOpenFriendRequests = () => setShowFriendRequests(true);
    const handleCloseFriendRequests = () => setShowFriendRequests(false);

    const handleSaveUserData = async (fieldName, fieldValue) => {
        try {
            const response = await saveChanges(storedUserData.username, fieldName, fieldValue, token);
            if (response.success) {
                console.log("True")
              
                fetchUserDetails(); 
                return true;
            } else {
                console.error("False"); 
                return false;
            }

            // fetchUserDetails();
        } catch (error) {
            console.error('Error saving changes:', error.message);
        }
    };

    const deleteProfile = async () => {
        try {
            await deleteUserProfile(storedUserData.username, token);
            // If the delete request succeeds, navigate back to the feed page
            navigate('/');
        } catch (error) {
            console.error('Error deleting profile:', error.message);
        }
    };

    if (!storedUserData) {
        return <div>Loading...</div>;
    }

    // const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const { displayName, profilePic } = storedUserData;
    const imageUrl = `data:image/jpeg;base64,${profilePic}`;


    return (
        <div className="container mt-4">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>
            {/* Profile header */}
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="profile-container p-4 shadow rounded">
                        <div className="row align-items-center">
                            <div className="col-md-4 text-center">
                                <img src={imageUrl} alt="Profile" className="rounded-circle profile-picture" />
                            </div>
                            <div className="col-md-8">
                                <h1>{displayName}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Edit profile button */}
                <div className="col-md-4">
                    <div className="d-flex flex-column justify-content-end align-items-center">
                        <button className="btn btn-outline-secondary btn-sm btn-edit" onClick={openEditContainer}>
                            <i className="bi bi-pencil"></i>Edit Profile
                        </button>
                        <button className="btn btn-outline-secondary btn-sm btn-edit" onClick={handleOpenFriendList}>
                            <i className="bi bi-people-fill"></i>View Friends
                        </button>
                        <button className="btn btn-outline-secondary btn-sm btn-edit" onClick={deleteProfile}>
                            <i className="bi bi-trash"></i>Delete Profile
                        </button>
                        {/* Button to open friend requests popup */}
                        <button className="btn btn-outline-secondary btn-sm btn-edit" onClick={handleOpenFriendRequests}>
                            <i className="bi bi-people-fill"></i>Friend Requests
                        </button>
                    </div>
                </div>
            </div>
            {/* Edit profile popup */}
            {showEditContainer && (
                <EditProfilePopup
                    handleClose={closeEditContainer}
                    handleSave={handleSaveUserData}
                    // userData={userData}
                />
            )}
            {/* Friend list popup */}
            {showFriendList && (
                <FriendListPopup
                    username = {storedUserData.username}
                    token={token}
                    friends={friendsList|| []} 
                    handleClose={handleCloseFriendList} 
                />
            )}
            {/* Friend requests popup */}
            {showFriendRequests && (
                <FRequestsPopup token = {token}
                                currentUser = {storedUserData.username}
                                friendreqs = {userDetails.friendRequests}
                                handleClose={handleCloseFriendRequests}   
                                onHandleFriendRequest={fetchUserDetails} 

                />
            )}
            {/* User posts */}
            <div className="mt-4">
                <h2>User Posts</h2>
                <Feed posts={userPosts || []} onDeletePost={onDelete} onEditPost={onEditPost} token={token} />
            </div>
        </div>
    );
};

export default UserProfile;
