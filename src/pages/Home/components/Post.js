import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import {useNavigate} from 'react-router-dom';

const Post = ({ post }) => {
  const { userId, media, caption, comments, likes, createdAt } = post;
  const navigate=useNavigate();

  return (
    <Box sx={{ border: "1px solid #ccc", borderRadius: "8px", marginBottom: "16px", padding: "16px",cursor:"pointer"}} >
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }} onClick={()=>{navigate(`/userProfile?userId=${userId._id}`)}}>
        <Avatar src={userId.profilePicture} alt={userId.username} />
        <Typography variant="h6" sx={{ marginLeft: "8px" }}>{userId.username}</Typography>
      </Box>
      {media && (
        media.contentType.startsWith("image") ? (
          <Box component="img" src={media.url} alt="post media" sx={{ width: "100%",height:"60vh", borderRadius: "8px",objectFit:"scale-down"}} />
        ) : (
          <Box component="video" controls src={media.url} sx={{ width: "100%",height:"60vh", borderRadius: "8px",objectFit:"scale-down"}} />
        )
      )}
      {caption && <Typography variant="body1" sx={{ marginTop: "16px" }}>{caption}</Typography>}
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
        <Typography variant="body2" sx={{cursor:"pointer"}} onClick={()=>{navigate(`/post-view?postId=${post._id}`)}}>{likes.length} likes</Typography>
        <Typography variant="body2" sx={{cursor:"pointer"}} onClick={()=>{navigate(`/post-view?postId=${post._id}`)}}>{comments.length} comments</Typography>
      </Box>
      <Typography variant="body2" sx={{ marginTop: "8px"}}>
        {new Date(createdAt).toLocaleDateString()}
      </Typography>
    </Box>
  );
};

export default Post;
