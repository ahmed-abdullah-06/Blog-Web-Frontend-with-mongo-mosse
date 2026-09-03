import { useState, useEffect } from "react";
import { Box, Typography, IconButton, Avatar, Divider } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import { getComments, deleteComment } from "../api/api";
import { useAuth } from "../context/AuthContext";

function getInitials(name) {
  if (!name) return "??";
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function CommentList({ postId, refreshKey, onCommentDeleted }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    getComments(postId)
      .then((res) => setComments(res.data))
      .finally(() => setLoading(false));
  }, [postId, refreshKey]);

  async function handleDelete(commentId) {
    try {
      await deleteComment(commentId, token);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      if (onCommentDeleted) onCommentDeleted();
    } catch (err) {
      alert(err.response?.data?.error || "Could not delete comment");
    }
  }

  if (loading) {
    return <Typography sx={{ color: "text.secondary", fontSize: 14 }}>Loading comments...</Typography>;
  }

  if (comments.length === 0) {
    return <Typography sx={{ color: "text.secondary", fontSize: 14 }}>No comments yet. Be the first to comment.</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {comments.map((comment, i) => (
        <Box key={comment.id}>
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontSize: "0.65rem",
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                bgcolor: "primary.main",
              }}
            >
              {getInitials(comment.author?.name)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
                  {comment.author?.name || "Unknown"}
                </Typography>
                <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "'JetBrains Mono', monospace" }}>
                  {formatDate(comment.createdAt)}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 14, color: "#B3B3B3", mt: 0.5 }}>
                {comment.content}
              </Typography>
            </Box>
            {user && user.id === comment.author?.id && (
              <IconButton size="small" onClick={() => handleDelete(comment.id)} sx={{ color: "rgba(255,255,255,0.3)" }}>
                <DeleteOutlined sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Box>
          {i < comments.length - 1 && <Divider sx={{ borderColor: "rgba(255,255,255,0.05)", mt: 2 }} />}
        </Box>
      ))}
    </Box>
  );
}

export default CommentList;