import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Button,
  Input,
  Container,
  Typography,
  Box,
  TextField,
  CircularProgress
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const MediaEditor = ({ file }) => {
  const [filePreview, setFilePreview] = useState(null);
  const [next, setNext] = useState(false);

  useEffect(() => {
    const fileUrl = URL.createObjectURL(file);
    setFilePreview(fileUrl);
    return () => URL.revokeObjectURL(fileUrl);
  }, [file]);

  const renderPreview = () => {
    const previewStyle = {
      width: "100%",
      height: "auto",
      maxHeight: "100%",
      maxWidth: "100%",
      objectFit: "contain",
    };
    if (!filePreview) return;
    const fileType = file.type.split("/")[0];
    if (fileType === "image") {
      return <img src={filePreview} alt="file-preview" style={previewStyle} />;
    } else if (fileType === "video") {
      return (
        <video controls style={previewStyle}>
          <source src={filePreview} type={file.type} />
        </video>
      );
    } else {
      return (
        <Typography variant="body1">File preview not available</Typography>
      );
    }
  };

  return (
    <Box
    >
      {next ? (
        <CaptionEditor file={file} />
      ) : (
        <Box
          sx={{
            width: "100%",
            maxWidth: "600px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f9f9f9",
            }}
          >
            {renderPreview()}
          </Box>
          <Button
            variant="contained"
            onClick={() => setNext(true)}
            sx={{
              mt: 2,
              width: "100%",
              borderRadius: 0,
              backgroundColor: "#0095f6",
              "&:hover": {
                backgroundColor: "#007bb5",
              },
            }}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};

const FinalViewer = ({ file, caption }) => {
  const profile = useSelector((state) => state.auth.user);
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  useEffect(() => {
    const fileUrl = URL.createObjectURL(file);
    setFilePreview(fileUrl);
    return () => URL.revokeObjectURL(fileUrl);
  }, [file]);

  const renderPreview = () => {
    const previewStyle = {
      width: "100%",
      height: "auto",
      maxHeight: "100%",
      maxWidth: "100%",
      objectFit: "contain",
    };
    if (!filePreview) return;
    const fileType = file.type.split("/")[0];
    if (fileType === "image") {
      return <img src={filePreview} alt="file-preview" style={previewStyle} />;
    } else if (fileType === "video") {
      return (
        <video controls style={previewStyle}>
          <source src={filePreview} type={file.type} />
        </video>
      );
    } else {
      return (
        <Typography variant="body1">File preview not available</Typography>
      );
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);
    formData.append("userId", profile._id);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/api/posts/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setUploadSuccess(true);
      console.log("File uploaded successfully", response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error uploading file", error);
    }
  };

  return (
    <Box sx={{ marginBottom: "20px" }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "600px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
          }}
        >
          {renderPreview()}
        </Box>
        <Container>
          <Typography variant="body2">{caption}</Typography>
        </Container>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 2,
            width: "100%",
            borderRadius: 0,
            backgroundColor: "#0095f6",
            "&:hover": {
              backgroundColor: "#007bb5",
            },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Upload"}
        </Button>
        {uploadSuccess && (
          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckCircleIcon color="success" />
            <Typography variant="body1" sx={{ ml: 1 }}>
              Upload successful!
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const CaptionEditor = ({ file }) => {
  const [next, setNext] = useState(false);
  const [caption, setCaption] = useState("");
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    const fileUrl = URL.createObjectURL(file);
    setFilePreview(fileUrl);
    return () => URL.revokeObjectURL(fileUrl);
  }, [file]);

  const renderPreview = () => {
    if (!filePreview) return;

    const fileType = file.type.split("/")[0];
    const previewStyle = {
      width: "100%",
      height: "auto",
      maxHeight: "100%",
      maxWidth: "100%",
    };

    if (fileType === "image") {
      return <img src={filePreview} alt="file-preview" style={previewStyle} />;
    } else if (fileType === "video") {
      return (
        <video controls style={previewStyle}>
          <source src={filePreview} type={file.type} />
        </video>
      );
    } else {
      return (
        <Typography variant="body1">File preview not available</Typography>
      );
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  return (
    <Box>
      {next ? (
        <FinalViewer file={file} caption={caption} />
      ) : (
        <Box>
          <Box sx={{ width: "150px", height: "auto" }}>{renderPreview()}</Box>
          <TextField
            type="text"
            name="caption"
            value={caption}
            onChange={handleCaptionChange}
            variant="outlined"
            fullWidth
            margin="normal"
            label="Write a caption..."
          />
          <Button onClick={() => setNext(true)} variant="contained">
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};

const PostEditor = () => {
  const [file, setFile] = useState(null);
  const [next, setNext] = useState(true);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setNext(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {next ? (
        <Box textAlign="center">
          <Button variant="contained" component="label">
            Choose a media
            <Input
              type="file"
              name="file"
              id="file-input"
              onChange={handleFileChange}
              required
              hidden
            />
          </Button>
        </Box>
      ) : (
        <MediaEditor file={file} />
      )}
    </Container>
  );
};

export default PostEditor;
