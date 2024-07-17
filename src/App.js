import "./App.css";
import { Paper,Box} from "@mui/material";
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
import { useDispatch,useSelector} from "react-redux";
import { fetchCurrentUser } from "./store/actions/authActions";
import { createTheme, ThemeProvider} from '@mui/material';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // Customize other theme options
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    // Customize other theme options
  },
});


function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.mode.darkMode);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch(fetchCurrentUser(token));
    } else {
      dispatch({ type: 'AUTHENTICATION_FAILURE' }); 
    }
  }, [dispatch]);

  return (
    <Paper className="App" sx={{minHeight:"100vh"}}>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route 
              element={
                <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
                <Paper sx={{ display: { xs: "block", sm: "flex" } }}>
                  <SideNavBar />
                  <Box sx={{ width: "100%", marginBottom: { xs: "56px", sm: "0px" }, minHeight: '100vh' }}>
                    <Outlet />
                  </Box>
                </Paper>
              </ThemeProvider>
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
    </Paper>
  );
}

export default App;
