import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Post from "./components/Post"; // Import the Post component

const Homepage = () => {
  const auth = useSelector((state) => state.auth);
  const [followings, setFollowings] = useState([]);
  const [posts, setPosts] = useState([]);
  const userId = auth?.user?._id;

  const fetchFollowings = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/follow/followings/${userId}`);
      setFollowings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPosts = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/posts/getAllPosts/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const printPosts = async () => {
    const allPosts = [];
    for (const following of followings) {
      const userPosts = await fetchPosts(following.followingId._id);
      allPosts.push(...userPosts);
    }
    // Sort posts by createdAt date in descending order
    allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setPosts(allPosts);
  };

  useEffect(() => {
    if (userId) {
      fetchFollowings();
    }
  }, [userId]);

  useEffect(() => {
    if (followings.length > 0) {
      printPosts();
    }
  }, [followings]);

  return (
    <Box sx={{ padding: "16px", display: "flex", alignItems: "center", justifyContent: "center",minHeight:"100vh"}}>
      <Box sx={{ marginTop: "16px", maxWidth: 600 }}>
        {posts.length === 0 ? (
          <Typography variant="h6">No posts available</Typography>
        ) : (
          posts.map((post) => <Post key={post._id} post={post} />)
        )}
      </Box>
    </Box>
  );
};

export default Homepage;
