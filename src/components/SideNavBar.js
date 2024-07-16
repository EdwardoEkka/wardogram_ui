import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PersonIcon from "@mui/icons-material/Person";
import { useMediaQuery } from "@mui/material";
import GetUser from "./SearchUser";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const drawerWidth = 240;
const iconWidth = 80; 

const SideNavBar = () => {
  const isSmallScreen = useMediaQuery("(max-width:768px)");
  const isVerySmallScreen = useMediaQuery("(max-width:600px)");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate=useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

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
            { icon: <HomeIcon />, label: "Home",onClick:()=>navigate('/') },
            {
              icon: <SearchIcon />,
              label: "Search",
              onClick: handleSearchClick,
            },
            { icon: <AddCircleIcon />, label: "Create", onClick:()=>navigate('/create-post') },
            { icon: <PersonIcon />, label: "Profile",onClick:()=>navigate(`/userProfile?userId=${user?._id}`)  },
            { icon: <SettingsIcon />, label: "Settings" },
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
      </AnimatePresence>
    </Box>
  );
};

export default SideNavBar;
