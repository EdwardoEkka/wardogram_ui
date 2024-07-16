import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserProfileData from "./components/userProfileData";
import UserPostFeed from "./components/userPostFeed";
import Box from '@mui/material/Box';
import { useSelector } from "react-redux";

const UserProfileFeed = () => {
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const auth = useSelector((state) => state.auth);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newUserId = params.get("userId");
    setUserId(newUserId);
  }, [location]);

  useEffect(() => {
    if (userId === auth.user._id) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
  }, [userId, auth.user._id]);

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      minHeight="100vh"
    >
      {userId && (
        <>
          <Box sx={{ width: '100%', maxWidth: '935px' }}>
            <UserProfileData userId={userId} />
          </Box>
          <Box sx={{ width: '100%', maxWidth: '935px' }}>
            <UserPostFeed userId={userId} isCurrentUser={isCurrentUser}/>
          </Box>
        </>
      )}
    </Box>
  );
};

export default UserProfileFeed;
