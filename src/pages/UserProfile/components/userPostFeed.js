import React,{useEffect} from "react";
import axios from "axios";
import {
  Grid,
  Container,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,

} from "@mui/material";
import { styled } from "@mui/system";
import PlayCircleFilledOutlined from '@mui/icons-material/PlayCircleFilledOutlined';
import {useNavigate} from 'react-router-dom';



const PostCardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 935,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 0,
  boxShadow: "none",
  border: "none",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

const RenderData = ({ data,isCurrentUser }) => {
  const navigate = useNavigate();
  
  return (
    <Grid container spacing={0.5} sx={{ display: "flex", alignItems: "center", flexDirection: "row", border: "none" }}>
      {data.map((dataItem, index) => {
        const { url, contentType } = dataItem.media;
        const isImage = contentType ? contentType.startsWith("image/") : false;
        const isVideo = contentType ? contentType.startsWith("video/") : false;

        if (isImage || isVideo) {
          return (
            <Grid item key={index} sx={{ width: "33.33%", height: { xs: "150px", sm: "200px", md: "300px" }, cursor: "pointer" }}>
              <Card sx={{ height: "100%", borderRadius: 0,position:"relative"}} onClick={() => { navigate(`/post-view?postId=${dataItem._id}`) }}>

                {isImage ? (
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                    <CardMedia
                      component="img"
                      image={url}
                      alt={dataItem.file_name}
                      sx={{ height: "100%", width: "100%", objectFit: "cover" }}
                    />
                  </Box>
                ) : (
                  <Box sx={{ position: "relative", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CardMedia
                      component="video"
                      src={url}
                      sx={{ height: "100%", width: "100%", objectFit: "cover" }}
                    />
                    <PlayCircleFilledOutlined
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "3rem",
                      }}
                    />
                  </Box>
                )}
                <CardContent>
                  <Typography variant="body2">
                    {dataItem.file_name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        } else {
          return null;
        }
      })}
    </Grid>
  );
};

const UserPostFeed = ({ userId,isCurrentUser }) => {
  const [posts, setPosts] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/api/posts/getUserPosts/${userId}`
        );
        setPosts(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching posts");
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <Container sx={{ padding: 0, borderRadius: 0, border: "none" }}>
        <PostCardContainer>
          <CircularProgress />
        </PostCardContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ padding: 0, borderRadius: 0, border: "none" }}>
        <PostCardContainer>
          <div>{error}</div>
        </PostCardContainer>
      </Container>
    );
  }

  return (
    <Box sx={{ padding: 0, borderRadius: 0, border: "none" }}>
      <PostCardContainer>
        {posts ? <RenderData data={posts} isCurrentUser={isCurrentUser}/> : <div>No posts available</div>}
      </PostCardContainer>
    </Box>
  );
};

export default UserPostFeed;
