import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogContent,
  DialogTitle,
  Drawer,
  ListItemIcon,
  Divider,
  Paper,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";
import LinkIcon from "@mui/icons-material/Link";



const PostView = () => {
  const currentPageUrl = window.location.href;
  const urlObject = new URL(currentPageUrl);
  const params = new URLSearchParams(urlObject.search);
  const postId = params.get("postId");
  const profile = useSelector((state) => state.auth.user);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentsOpen, setCommentsOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down('sm'));

  const handleEditDrawer = () => {
    setIsEditOpen(!isEditOpen);
  };
  const handleDrawerToggle = () => {
    setOpen(!open);
  };


  const fetchLikes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/like/likes/${postId}`
      );
      setLikes(response.data);
      setLiked(response.data.some((like) => like.userId === profile?._id));
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/comment/comments/${postId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/api/posts/getPostById/${postId}`
        );
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchPost();
    fetchLikes();
    fetchComments();
  }, [postId]);

  useEffect(() => {
    if (post?.userId?._id === auth.user._id) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
  }, [post, auth.user._id]);

  const handleLike = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/like/likePost`,
        {
          userId: profile?._id,
          postId,
        }
      );
      fetchLikes();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/comment/commentPost`,
        {
          userId: profile?._id,
          postId,
          comment: newComment,
        }
      );
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const toggleComments = () => {
    setCommentsOpen(!commentsOpen);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!post) {
    return <Typography variant="h5">Post not found</Typography>;
  }

  const isVideo = post.media.contentType.startsWith("video");

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: isLargeScreen ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          padding: "10px",
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Avatar src={post.userId.profilePicture} alt={post.userId.username} />
        <Typography variant="body1" sx={{ marginLeft: 2 }}>
          {post.userId.username}
        </Typography>
        {isCurrentUser && (
          <IconButton
            sx={{ zIndex: 100, marginLeft: "auto" }}
            onClick={handleDrawerToggle}
            
          >
            <MoreVertIcon  onClick={() => {
                    handleEditDrawer();
                  }}/>
          </IconButton>
        )}
      </Card>
      <Card
        sx={{
          maxWidth: isLargeScreen ? "60%" : "100%",
          height: "80vh",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          border: "1px solid #ccc",
        }}
      >
        <CardMedia
          component={isVideo ? "video" : "img"}
          image={post.media.url}
          title="Post media"
          controls={isVideo}
          sx={{ height: "100%", objectFit: "contain" }}
        />
      </Card>
      <Card
        sx={{
          maxWidth: isLargeScreen ? "40%" : "100vw",
          height: isLargeScreen ? "80vh" : "auto",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          border: "1px solid #ccc",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: isLargeScreen ? 0 : 2,
        }}
      >
        <CardContent
          sx={{
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Card
            sx={{
              width: "100%",
              padding: "10px",
              display: { md: "flex", xs: "none" },
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Avatar
              src={post.userId.profilePicture}
              alt={post.userId.username}
            />
            <Typography variant="body1" sx={{ marginLeft: 2 }}>
              {post.userId.username}
            </Typography>
            {isCurrentUser && (
              <IconButton
                sx={{ zIndex: 100, marginLeft: "auto" }}
                onClick={handleDrawerToggle}
              >
                <MoreVertIcon
                  onClick={() => {
                    handleEditDrawer();
                  }}
                />
              </IconButton>
            )}
          </Card>
          <Box>
            <Typography
              variant="body2"
              component="p"
              sx={{ marginBottom: 2 }}
            >
              {post.caption}
            </Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <IconButton
                onClick={handleLike}
                sx={{ color: liked ? "red" : "gray" }}
              >
                {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <Typography variant="body2" color="textSecondary" component="p">
                {likes.length} {likes.length === 1 ? "like" : "likes"}
              </Typography>
              {!isLargeScreen && (
                <IconButton
                  onClick={toggleComments}
                  sx={{ marginLeft: "auto" }}
                >
                  {commentsOpen ? <CloseIcon /> : <CommentIcon />}
                </IconButton>
              )}
            </Box>
          </Box>
          {isLargeScreen ? (
            <Box sx={{ flexGrow: 1, overflowY: "auto", marginBottom: 6 }}>
              <Typography variant="h6">Comments</Typography>
              <List>
                {comments.map((comment) => (
                  <ListItem key={comment._id}>
                    <Avatar
                      src={comment.userId.profilePicture}
                      alt={comment.userId.username}
                      sx={{ marginRight: "10px" }}
                    />
                    <ListItemText
                      primary={comment.userId.username}
                      secondary={comment.comment}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : null}
        </CardContent>
        {isLargeScreen && (
          <Box
            sx={{
              position: "sticky",
              bottom: 0,
              padding: 2,
              display: "flex",
              gap: 1,
            }}
          >
            <TextField
              label="Add a comment"
              variant="outlined"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleCommentSubmit}
            >
              Post
            </Button>
          </Box>
        )}
      </Card>
      <Dialog
        open={commentsOpen}
        onClose={toggleComments}
        aria-labelledby="comments-dialog-title"
      >
        <DialogTitle id="comments-dialog-title">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Comments</Typography>
            <IconButton onClick={toggleComments}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ flexGrow: 1, overflowY: "auto", marginBottom: 6 }}>
            <List>
              {comments.map((comment) => (
                <ListItem key={comment._id}>
                  <Avatar
                    src={comment.userId.profilePicture}
                    alt={comment.userId.username}
                    sx={{ marginRight: "10px" }}
                  />
                  <ListItemText
                    primary={comment.userId.username}
                    secondary={comment.comment}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box
            sx={{
              position: "sticky",
              bottom: 0,
              padding: 2,
              display: "flex",
              gap: 1,
            }}
          >
            <TextField
              label="Add a comment"
              variant="outlined"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={handleCommentSubmit}
            >
              Post
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <Drawer anchor={matchesXS ? "bottom" : "right"} open={isEditOpen} onClose={handleEditDrawer}>
      <List sx={{ width: 250 }}>
          {isCurrentUser&&
          
        <ListItem button>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </ListItem>
          }
        <ListItem button>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Share" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ReportIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <LinkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Copy Link" />
        </ListItem>
      </List>
    </Drawer>
    </Paper>
  );
};

export default PostView;
