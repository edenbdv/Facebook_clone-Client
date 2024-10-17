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
    const [userData, setUserData] = useState(null);
    const [userDetails,setUserDetails] = useState(null);
    const [showEditContainer, setShowEditContainer] = useState(false);
    const [showFriendList, setShowFriendList] = useState(false); 
    const [userPosts, setUserPosts] = useState([]);
    const [friendsList, setFriendsList] = useState([]); 

    const [showFriendRequests, setShowFriendRequests] = useState(false); 
    const navigate = useNavigate(); // Initialize navigate
    

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);


    useEffect(() => {
        const fetchUserDetails = async () => {
           try {
                const userInfo = await fetchUserData(userData.username, token);
                 if (JSON.stringify(userInfo) !== JSON.stringify(userDetails)) {
                    setUserDetails(userInfo);   
                    console.log("userInfo",userDetails)
                    console.log("friendRequests",userDetails.friendRequests)
                 }
                
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
              
        };

        if (userData && token) {
            // Initial fetch
            fetchUserDetails();
    
            // Polling every 30 seconds 
            const interval = setInterval(fetchUserDetails, 30000);
    
            // Cleanup interval on component unmount
            return () => clearInterval(interval);
        }
    }, [userData, token, userDetails]);


    useEffect(() => {
        // Fetch user posts when user data is available
        if (userData && token) {
            fetchUserPosts(userData.username, token)
                .then(posts => {
                    setUserPosts(posts);
                })
                .catch(error => console.error('Error fetching user posts:', error));
            

            fetchFriendsList(userData.username, token)
                .then(friends => setFriendsList(friends))
                .catch(error => console.error('Error fetching friends list:', error));
        }
    }, [userData, token]);


    
    const openEditContainer = () => {
        setShowEditContainer(true);
    };

    const closeEditContainer = () => {
        setShowEditContainer(false);
    };

    const handleOpenFriendList = () => {
        setShowFriendList(true);
        console.log("setShowFriendList: true");
    };

    const handleCloseFriendList = () => {
        setShowFriendList(false);
    };

    const handleOpenFriendRequests = () => setShowFriendRequests(true);
    const handleCloseFriendRequests = () => setShowFriendRequests(false);

    const handleSaveUserData = async (editedField, value) => {
        try {
            await saveChanges(userData.username, { [editedField]: value }, token);
            // If the save is successful, update the user data in the state
            setUserData(prevUserData => ({
                ...prevUserData,
                [editedField]: value,
            }));
            console.log(`Changes saved successfully for ${editedField}`);
        } catch (error) {
            console.error('Error saving changes:', error.message);
            // Handle error display or logging here
        }
    };

    const deleteProfile = async () => {
        try {
            await deleteUserProfile(userData.username, token);
            // If the delete request succeeds, navigate back to the feed page
            navigate('/');
        } catch (error) {
            console.error('Error deleting profile:', error.message);
            // Handle error display or logging here
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    const { displayName, profilePic } = userData;
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
                    editedUserData={userData}
                    setEditedUserData={setUserData}
                />
            )}
            {/* Friend list popup */}
            {showFriendList && (
                <FriendListPopup
                    token={token}
                    friends={friendsList|| []} // Pass the list of friends
                    handleClose={handleCloseFriendList} // Pass the close handler
                />
            )}
            {/* Friend requests popup */}
            {showFriendRequests && (
                <FRequestsPopup token = {token}
                                currentUser = {userData.username}
                                friendreqs = {userDetails.friendRequests}
                                handleClose={handleCloseFriendRequests}   
                />
            )}
            {/* User posts */}
            <div className="mt-4">
                <h2>User Posts</h2>
                {/* Check if userPosts is not null before passing it to Feed */}
                <Feed posts={userPosts || []} onDeletePost={onDelete} onEditPost={onEditPost} token={token} />
            </div>
        </div>
    );
};

export default UserProfile;
