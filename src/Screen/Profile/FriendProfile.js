// FriendProfile.js
import React, { useEffect, useState } from 'react';
import './Profile.css';
import Feed from '../Feed/Feed';
import FriendListPopup from '../FriendList'; 
import { useNavigate } from 'react-router-dom';
import { fetchUserData, fetchUserPosts, fetchFriendsList } from '../api';

const FriendProfile = ({ visitedUser, token }) => {
    const [friendPosts, setFriendPosts] = useState([]);
    const [showFriendList, setShowFriendList] = useState(false); 
    const [friendsList, setFriendsList] = useState([]); 
    const [userDetails,setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); 

    const handleOpenFriendList = () => {
        setShowFriendList(true);
    };

    const handleCloseFriendList = () => {
        setShowFriendList(false);
    };
    console.log("visitedUser",visitedUser)


    const fetchUserDetails = async () => {
        if (visitedUser && token) {
            try {
                // console.log("visitedUser",visitedUser)
                const userInfo = await fetchUserData(visitedUser, token);
                // console.log("userInfo", userInfo);
                const friends = await fetchFriendsList(visitedUser, token);
                // console.log("friends: ",friends)
                setFriendsList(friends);
                setUserDetails(userInfo);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [token, visitedUser]);



    useEffect(() => {
        // Fetch friend's posts when the component mounts
        fetchUserPosts(visitedUser, token)
            .then(posts => setFriendPosts(posts))
            .catch(error => console.error('Error fetching friend posts:', error));
    
        fetchFriendsList(visitedUser, token);

    }, [visitedUser, token]);

    if (loading) {
        return <div>Loading...???</div>;

    }

    if (error) {
        return <div>{error}</div>;  
    }

    const displayName = userDetails.displayName
    const imageUrl = `data:image/jpeg;base64,${userDetails.profilePic}`;



    return (
        <div className="container mt-4">
            {/* Friend profile header */}
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
                <div className="col-md-4">
                    <div className="d-flex flex-column justify-content-end align-items-center">
                        {/* View friends button */}
                        <button className="btn btn-outline-secondary btn-sm btn-edit" onClick={handleOpenFriendList}>
                            <i className="bi bi-people-fill"></i>View Friends
                        </button>
                    </div>
                </div>
            </div>
            {/* Friend list popup */}
            {showFriendList && (
                <FriendListPopup
                    token={token}
                    friends={friendsList || []} 
                    handleClose={handleCloseFriendList}
                />
            )}
            {/* Friend posts */}
            <div className="mt-4">
                <h2>Friend Posts</h2>
                {/* Check if userPosts is not null before passing it to Feed */}
                <Feed posts={friendPosts || []} onDeletePost={null} onEditPost={null} token={token}/>
            </div>
        </div>
    );
};

export default FriendProfile;
