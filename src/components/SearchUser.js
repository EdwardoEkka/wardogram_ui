import React, { useState } from "react";
import axios from "axios";
import {
  Avatar,
  Typography,
  CircularProgress,
  Box,
  TextField,
  Button,
  ListItem,
  ListItemText,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const GetUser = () => {
  const [searchUserData, setSearchUserData] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async (username) => {
    setLoading(true);
    console.log(username);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/api/users/getUserByUserName/${username}`
      );
      setSearchUserData(response.data);
      setLoading(false);
    } catch (error) {
      setError("User not found. Please try again.");
      setLoading(false);
    }
  };

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  return (
    <Paper style={{ padding: "20px", width: "100%", height: "100%", border:"none",boxShadow:"none",borderRadius:"none" }}>
      <div>
        <TextField
          onChange={handleSearchName}
          value={searchName}
          placeholder="Search user by username"
          fullWidth
          variant="outlined"
          style={{ marginBottom: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            fetchUsers(searchName);
          }}
        >
          Search
        </Button>
        {loading && (
          <Box display="flex" justifyContent="center" marginTop="20px">
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography variant="body1" color="error" style={{ marginTop: "10px" }}>
            {error}
          </Typography>
        )}
        {searchUserData && !loading && !error && (
          <Box marginTop="20px">
            <ListItem sx={{ gap: 1 }} onClick={() => { navigate(`/userProfile?userId=${searchUserData._id}`) }}>
              <Avatar src={searchUserData.profilePicture} alt={searchUserData.username} />
              <ListItemText primary={searchUserData.username} />
            </ListItem>
          </Box>
        )}
      </div>
    </Paper>
  );
};

export default GetUser;
