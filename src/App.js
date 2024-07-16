import "./App.css";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import SignupForm from "./pages/Sign Up/Sign Up";
import SigninForm from "./pages/Sign In/Sign In";
import PostView from "./pages/PostView/PostView";
import UserProfileFeed from "./pages/UserProfile/userProfile";
import UpdateProfileForm from "./pages/UpdateProfile/ProfileUpdate";
import CreatePost from "./pages/CreatePost/CreatePost";
import Homepage from "./pages/Home/homepage";
import ProtectedRoute from "./components/ProtectedRoute";
import SideNavBar from "./components/SideNavBar";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated"; // Import the new component
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./store/actions/authActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch(fetchCurrentUser(token));
    } else {
      dispatch({ type: 'AUTHENTICATION_FAILURE' }); 
    }
  }, [dispatch]);

  return (
    <Box className="App">
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route 
              element={
                <Box sx={{ display: { xs: "block", sm: "flex" } }}>
                  <SideNavBar />
                  <Box sx={{ width: "100%", marginBottom: { xs: "60px", sm: "0px" } }}>
                    <Outlet />
                  </Box>
                </Box>
              }
            >
              <Route path="/" element={<Homepage />} />
              <Route path="/userProfile" element={<UserProfileFeed />} />
              <Route path="/update-profile" element={<UpdateProfileForm />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/post-view" element={<PostView />} />
            </Route>
          </Route>
          <Route 
            path="/signup" 
            element={
              <RedirectIfAuthenticated>
                <SignupForm />
              </RedirectIfAuthenticated>
            } 
          />
          <Route 
            path="/login" 
            element={
              <RedirectIfAuthenticated>
                <SigninForm />
              </RedirectIfAuthenticated>
            } 
          />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
