import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Avatar,
  Typography,
  CircularProgress,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

const ProfileCard = styled(Card)(({ theme }) => ({
  maxWidth: 935,
  borderRadius: 0,
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  margin:"auto"
}));

const FollowAvatarWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
}));

const FollowDataWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: "100%",
    justifyContent: "space-around",
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 70,
  height: 70,
  marginRight: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    width: 100,
    height: 100,
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginTop: "10px",
}));

const BioText = styled(Typography)(({ theme }) => ({}));

const LoadingBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

const FollowStatsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
}));

const FollowStatsItem = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const DialogHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const DialogContentWrapper = styled(DialogContent)(({ theme }) => ({
  minWidth: "300px",
  flexGrow: 1,
  overflowY: 'auto',
  marginBottom: theme.spacing(6),
}));

const UserProfileData = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);
  const [followersList, setFollowersList] = useState(null);
  const [followingList, setFollowingList] = useState(null);
  const [posts, setPosts] = useState(0);
  const [isFollower, setIsFollower] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const myId = useSelector((state) => state.auth.user._id);
  const navigate=useNavigate();

  const followUser = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/follow/followUser`, { userId: myId, followingId: userId });
      await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/follow/addToFollowerList`, { userId, followerId: myId });
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchData = async () => {
    try {
      const [userRes, postsRes, followersRes, followingsRes, isFollowerRes, isFollowingRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/users/getUserById/${userId}`),
        axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/posts/getUserPosts/${userId}`),
        axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/follow/followers/${userId}`),
        axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/follow/followings/${userId}`),
        axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/follow/isFollower`, { params: { userId: myId, followerId: userId } }),
        axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/follow/isFollowing`, { params: { userId: myId, followingId: userId } }),
      ]);
      setUserData(userRes.data);
      setPosts(postsRes.data.length);
      setFollowers(followersRes.data.length);
      setFollowersList(followersRes.data);
      setFollowings(followingsRes.data.length);
      setFollowingList(followingsRes.data);
      setIsFollower(isFollowerRes.data);
      setIsFollowing(isFollowingRes.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, myId]);

  

  if (!userData) {
    return (
      <LoadingBox>
        <CircularProgress />
      </LoadingBox>
    );
  }

  const toggleFollowers = () => {
    setFollowersOpen(!followersOpen);
  };

  const toggleFollowing = () => {
    setFollowingOpen(!followingOpen);
  };


  return (
    <Box sx={{ padding: 0, width: "100%"}}>
      <ProfileCard>
        <FollowAvatarWrapper>
          <ProfileAvatar alt={userData.username} src={userData.profilePicture} />
          <FollowDataWrapper>
            <FollowStatsBox>
              {["Posts", "Followers", "Following"].map((label, index) => (
                <FollowStatsItem key={label}>
                  <Typography variant="h6">{[posts, followers, followings][index]}</Typography>
                  <Typography variant="body2" onClick={() => {
                    if (label === "Followers") {
                      toggleFollowers();
                    } else if (label === "Following") {
                      toggleFollowing();
                    }
                  }}>{label}</Typography>
                </FollowStatsItem>
              ))}
            </FollowStatsBox>
            <Box>
              <Button variant="contained" onClick={followUser}>
                {isFollower ? (isFollowing ? "Following" : "Follow Back") : (isFollowing ? "Following" : "Follow")}
              </Button>
            </Box>
          </FollowDataWrapper>
        </FollowAvatarWrapper>
        <ContentWrapper>
          <Typography variant="h5" component="div">
            {userData.username}
          </Typography>
          <BioText variant="body1">{userData.bio}</BioText>
        </ContentWrapper>
      </ProfileCard>
      <Dialog open={followersOpen} onClose={toggleFollowers} aria-labelledby="followers-dialog">
        <DialogTitle>
          <DialogHeader>
            <Typography variant='h6'>Followers</Typography>
            <IconButton onClick={toggleFollowers}>
              <CloseIcon />
            </IconButton>
          </DialogHeader>
        </DialogTitle>
        <DialogContentWrapper>
          <List>
            {followersList && followersList.map((follower) => (
              <ListItem key={follower._id} sx={{ gap: 1 }}>
                <Avatar src={follower.followerId.profilePicture} alt={follower.followerId.username} onClick={()=>{navigate(`/post-view?postId=${follower.followerId._id}`)}}/>
                <ListItemText primary={follower.followerId.username} />
              </ListItem>
            ))}
          </List>
        </DialogContentWrapper>
      </Dialog>
      <Dialog open={followingOpen} onClose={toggleFollowing} aria-labelledby="following-dialog">
        <DialogTitle>
          <DialogHeader>
            <Typography variant='h6'>Following</Typography>
            <IconButton onClick={toggleFollowing}>
              <CloseIcon />
            </IconButton>
          </DialogHeader>
        </DialogTitle>
        <DialogContentWrapper>
          <List>
            {followingList && followingList.map((following) => (
              <ListItem key={following._id} sx={{ gap: 1 }}>
                <Avatar src={following.followingId.profilePicture} alt={following.followingId.username} onClick={()=>{navigate(`/post-view?postId=${following.followingId._id}`)}}/>
                <ListItemText primary={following.followingId.username} />
              </ListItem>
            ))}
          </List>
        </DialogContentWrapper>
      </Dialog>
    </Box>
  );
};

export default UserProfileData;
