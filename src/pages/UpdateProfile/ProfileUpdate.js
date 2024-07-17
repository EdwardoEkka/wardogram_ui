import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

const UpdateProfileForm = () => {
  const profile = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    username: "",
    profilePicture: "",
    bio: "",
  });
  const [profilePicturePreview, setProfilePicturePreview] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/api/users/getUserById/${profile?._id}`
        );
        const user = response.data;
        setFormData({
          username: user.username,
          profilePicture: user.profilePicture,
          bio: user.bio,
        });
        setProfilePicturePreview(user.profilePicture);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (profile?._id) {
      fetchUserData();
    }
  }, [profile]);

  const validate = () => {
    const newErrors = {};
    if (!formData.username) {
      newErrors.username = "Username is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      profilePicture: file,
    }));
    setProfilePicturePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        const formDataToSend = new FormData();
        formDataToSend.append("username", formData.username);
        formDataToSend.append("profilePicture", formData.profilePicture);
        formDataToSend.append("bio", formData.bio);
        const response = await axios.put(
          `${process.env.REACT_APP_BASE_API_URL}/api/users/update/${profile?._id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        // Handle success, e.g., show a notification or redirect
        console.log("Profile updated successfully");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', mt: '20px' }}>
      <form onSubmit={handleSubmit} style={{margin:"20px", maxWidth: '500px', width: '100%' }}>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}
          >
            <Avatar
              alt={formData.username}
              src={profilePicturePreview}
              sx={{
                width: { xs: 72, sm: 96, md: 120 },
                height: { xs: 72, sm: 96, md: 120 },
                marginBottom: 2
              }}
            />
            <Button variant="contained" component="label">
              Choose Picture
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              error={Boolean(errors.username)}
              helperText={errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="bio"
              name="bio"
              label="Bio"
              multiline
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              error={Boolean(errors.bio)}
              helperText={errors.bio}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || !formData.username}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default UpdateProfileForm;
