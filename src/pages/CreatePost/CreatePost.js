import React from "react";
import PostEditor from "./components/PostEditor";
import { Box } from "@mui/material";

const CreatePost=()=>{
    return(
      <Box sx={{mt:5}}>
            <PostEditor/>
        </Box>
    )
}

export default CreatePost;