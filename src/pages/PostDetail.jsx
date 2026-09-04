import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Paper, Typography, Button, Stack, Divider } from "@mui/material";
import { getPostById, deletePost, getImageUrl } from "../api/api";
import { useAuth } from "../context/AuthContext";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [commentRefresh, setCommentRefresh] = useState(0);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(id)
      .then((res) => setPost(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this post? This cannot be undone.");
    if (!confirmed) return;

    try {
      await deletePost(id, token);
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.error || "Could not delete post");
    }
  }

  if (loading) {
    return (
      <Box sx={{ pt: "64px", textAlign: "center", py: 8 }}>
        <Typography sx={{ color: "text.secondary" }}>Loading post...</Typography>
      </Box>
    );
  }

  if (notFound || !post) {
    return (
      <Box sx={{ pt: "64px", textAlign: "center", py: 8 }}>
        <Typography sx={{ color: "text.secondary" }}>Post not found.</Typography>
      </Box>
    );
  }

  const isOwner = user && post.author && user.id === post.author.id;
  const coverUrl = getImageUrl(post.coverImageUrl);

  return (
    <Box sx={{ pt: "64px", minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="md" sx={{ py: { xs: 3, sm: 6 }, px: { xs: 2, sm: 3 } }}>
        <Paper elevation={0} sx={{ p: 4, bgcolor: "#111111", border: "1px solid rgba(255,255,255,0.08)", mb: 3 }}>
          <Typography variant="h4" sx={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, mb: 1 }}>
            {post.title}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 3 }}>
            By {post.author?.name || "Unknown"} · {formatDate(post.createdAt)}
          </Typography>

          {coverUrl && (
            <Box
              component="img"
              src={coverUrl}
              alt={post.title}
              sx={{
                width: "100%",
                maxHeight: 450,
                objectFit: "cover",
                borderRadius: "8px",
                mb: 4,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            />
          )}

                    <Box
            sx={{
              color: "#e0e0e0",
              fontSize: 16,
              lineHeight: 1.8,
              mb: 4,
              "& h1, & h2, & h3": { fontFamily: "'JetBrains Mono', monospace", mt: 3, mb: 1.5 },
              "& p": { mb: 2 },
              "& code": {
                backgroundColor: "rgba(255,255,255,0.06)",
                padding: "2px 6px",
                borderRadius: "4px",
                fontFamily: "monospace",
                fontSize: "0.9em",
              },
              "& pre": {
                backgroundColor: "#0A0A0A",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                padding: "16px",
                overflowX: "auto",
                mb: 2,
              },
              "& ul, & ol": { pl: 3, mb: 2 },
              "& a": { color: "#818CF8" },
            }}
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </Box>


          {isOwner && (
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => navigate(`/edit-post/${post.id}`)}
                sx={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
              >
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </Stack>
          )}
        </Paper>

        <Paper elevation={0} sx={{ p: 4, bgcolor: "#111111", border: "1px solid rgba(255,255,255,0.08)" }}>
          <Typography variant="h6" sx={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, mb: 3 }}>
            Comments
          </Typography>

          <CommentForm postId={id} onCommentAdded={() => setCommentRefresh((k) => k + 1)} />

          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 3 }} />

          <CommentList
            postId={id}
            refreshKey={commentRefresh}
            onCommentDeleted={() => setCommentRefresh((k) => k + 1)}
          />
        </Paper>
      </Container>
    </Box>
  );
}

export default PostDetail;