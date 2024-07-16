// src/components/Startup.js
import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";

const StartupContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#1a1a1a",
  color: "#fff",
}));

const animationVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const circleVariants = {
  initial: { scale: 0, rotate: 0 },
  animate: {
    scale: [0, 1.2, 0.8, 1], // Adjusted scale values for bulging effect
    rotate: [0, 360],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity, // Repeat the animation infinitely
      repeatDelay: 0.5, // Optional delay between repeats
    },
  },
};

const Startup = () => {
  return (
    <StartupContainer>
      <motion.div
        variants={circleVariants}
        initial="initial"
        animate="animate"
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #ff4081 0%, #40c4ff 100%)",
        }}
      />

      <motion.div
        variants={animationVariants}
        initial="initial"
        animate="animate"
      >
        <Typography variant="h6" marginTop={4}>
          Loading...
        </Typography>
      </motion.div>
    </StartupContainer>
  );
};

export default Startup;
