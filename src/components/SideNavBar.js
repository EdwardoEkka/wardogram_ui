import React, { useState, useCallback } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  IconButton,
  Typography
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GetUser from "./SearchUser";

const drawerWidth = 240;
const iconWidth = 80;

const SideNavBar = () => {
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const isVerySmallScreen = useMediaQuery("(max-width:600px)");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAccessibilityDialogOpen, setIsAccessibilityDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const mode=useSelector((state)=>state.mode.darkMode);

  const handleSearchClick = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, [dispatch]);

  const handleSettingsClick = useCallback(() => {
    setIsSettingsOpen((prev) => !prev);
  }, []);

  const handleAccessibilityClick = useCallback(() => {
    setIsAccessibilityDialogOpen(true);
  }, []);

  const handleCloseAccessibilityDialog = useCallback(() => {
    setIsAccessibilityDialogOpen(false);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: isSmallScreen || isSearchOpen ? iconWidth : drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSmallScreen || isSearchOpen ? iconWidth : drawerWidth,
            boxSizing: "border-box",
            ...(isVerySmallScreen && {
              bottom: 0,
              top: "auto",
              left: 0,
              right: 0,
              height: "auto",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              zIndex: 1400,
            }),
          },
        }}
        variant="permanent"
        anchor={isVerySmallScreen ? "bottom" : "left"}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: isVerySmallScreen ? "row" : "column",
            padding: 0,
            justifyContent: isVerySmallScreen ? "space-around" : "flex-start",
            height: "100%",
          }}
        >
          {[
            { icon: <HomeIcon />, label: "Home", onClick: () => navigate("/") },
            {
              icon: <SearchIcon />,
              label: "Search",
              onClick: handleSearchClick,
            },
            {
              icon: <AddCircleIcon />,
              label: "Create",
              onClick: () => navigate("/create-post"),
            },
            {
              icon: <PersonIcon />,
              label: "Profile",
              onClick: () => navigate(`/userProfile?userId=${user?._id}`),
            },
            {
              icon: <SettingsIcon />,
              label: "Settings",
              onClick: handleSettingsClick,
            },
          ].map(({ icon, label, onClick }, index) => (
            <ListItem
              button
              key={index}
              onClick={onClick}
              sx={{ padding: "16px 8px", textAlign: "center" }}
            >
              <ListItemIcon sx={{ minWidth: "auto", margin: "0 auto" }}>
                {icon}
              </ListItemIcon>
              {!isSmallScreen && !isSearchOpen && (
                <ListItemText
                  primary={label}
                  sx={{ padding: 0, margin: 0 }}
                  primaryTypographyProps={{ textAlign: "center" }}
                />
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{
              x: isVerySmallScreen ? 0 : "-100%",
              y: isVerySmallScreen ? "-100%" : 0,
            }}
            animate={{
              x: isVerySmallScreen
                ? 0
                : isSmallScreen || isSearchOpen
                ? iconWidth
                : drawerWidth,
              y: 0,
            }}
            exit={{
              x: isVerySmallScreen ? 0 : "-100%",
              y: isVerySmallScreen ? "-100%" : 0,
            }}
            transition={{ type: "tween", duration: 0.3 }}
            style={{
              position: "fixed",
              top: isVerySmallScreen ? 0 : "auto",
              left: 0,
              height: isVerySmallScreen ? "100vh" : "100%",
              width: isVerySmallScreen ? "100%" : 320,
              boxShadow: "none",
              borderRight: isVerySmallScreen ? "none" : "1px solid #e2e3e5",
              borderBottom: isVerySmallScreen ? "1px solid #e2e3e5" : "none",
              background: "#fff",
              zIndex: 900,
            }}
          >
            <GetUser />
          </motion.div>
        )}
        {isSettingsOpen && (
          <Drawer
            anchor="right"
            open={isSettingsOpen}
            onClose={handleSettingsClick}
          >
            <List>
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Accounts" />
              </ListItem>
              <ListItem button onClick={handleAccessibilityClick}>
                <ListItemIcon>
                  <AccessibilityIcon />
                </ListItemIcon>
                <ListItemText primary="Accessibility" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText primary="Security" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Drawer>
        )}
      </AnimatePresence>
      <Dialog
        open={isAccessibilityDialogOpen}
        onClose={handleCloseAccessibilityDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          <Typography variant="h6">Accessibility Options</Typography>
        </DialogTitle>
        <DialogContent>
          <Button onClick={() => { dispatch({ type: 'BACKGROUND_MODE' }); }} startIcon={<Brightness4Icon />}>
            {mode?"Light Mode":"Dark Mode"}
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SideNavBar;
