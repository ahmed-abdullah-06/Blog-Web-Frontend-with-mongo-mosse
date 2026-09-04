import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Container, Paper, Typography, TextField, Button, Alert } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { createPost, getPostById, updatePost, getImageUrl } from "../api/api";
import { useAuth } from "../context/AuthContext";

function CreatePost() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [error, setError] = useState("");
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isEditMode) {
      getPostById(id)
        .then((res) => {
          setTitle(res.data.title);
          setContent(res.data.content);
          setTags((res.data.tags || []).join(", "));
          setExistingImageUrl(res.data.coverImageUrl);
        })
        .catch((err) => {
          setError(err.response?.data?.error || "Could not load post for editing");
        });
    }
  }, [id, isEditMode]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty");
      return;
    }

    try {
      if (isEditMode) {
        await updatePost(id, title, content, tags, imageFile, token);
        navigate(`/posts/${id}`);
      } else {
        const res = await createPost(title, content, tags, imageFile, token);
        navigate(`/posts/${res.data.id}`);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  }

  const previewSrc = imageFile ? URL.createObjectURL(imageFile) : getImageUrl(existingImageUrl);

  return (
    <Box sx={{ pt: "64px", minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="sm" sx={{ py: { xs: 3, sm: 6 }, px: { xs: 2, sm: 3 } }}>
        <Paper elevation={0} sx={{ p: 4, bgcolor: "#111111", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Typography variant="h5" sx={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, mb: 3 }}>
            {isEditMode ? "Edit Post" : "Create a New Post"}
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Tags (comma-separated)"
              placeholder="react, nodejs, tutorial"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 1 }}>
                Cover Image {existingImageUrl && !imageFile && "(uploading a new one will replace the current image)"}
              </Typography>
              {previewSrc && (
                <Box
                  component="img"
                  src={previewSrc}
                  alt="Cover Preview"
                  sx={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: "8px", mb: 1, border: "1px solid rgba(255,255,255,0.1)" }}
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                style={{ color: "#B3B3B3", fontSize: "14px" }}
              />
            </Box>

            <TextField
              fullWidth
              label="Content (Markdown supported)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              multiline
              rows={10}
              sx={{ mb: 2 }}
            />

            {content && (
              <Box
                sx={{
                  mb: 3,
                  p: 2,
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "8px",
                  backgroundColor: "#0A0A0A",
                  maxHeight: 200,
                  overflowY: "auto",
                }}
              >
                <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.35)", mb: 1, fontFamily: "'JetBrains Mono', monospace" }}>
                  PREVIEW
                </Typography>
                <Box sx={{ color: "#e0e0e0", fontSize: 14, "& p": { mb: 1 } }}>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Box>
              </Box>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ background: "linear-gradient(135deg, #4F46E5, #6366F1)", py: 1.2 }}
            >
              {isEditMode ? "Save Changes" : "Publish Post"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default CreatePost;