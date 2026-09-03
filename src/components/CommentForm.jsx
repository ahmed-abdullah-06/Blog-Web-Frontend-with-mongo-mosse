import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { addComment } from "../api/api";
import { useAuth } from "../context/AuthContext";

function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user, token } = useAuth();

  if (!user) {
    return null; // logged-out users don't see the comment form at all
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      await addComment(postId, content, token);
      setContent("");
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      alert(err.response?.data?.error || "Could not post comment");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 1.5, mb: 3 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Add a comment... (Enter to post, Shift+Enter for new line)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        multiline
        maxRows={4}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={submitting || !content.trim()}
        sx={{ background: "linear-gradient(135deg, #4F46E5, #6366F1)", px: 3, flexShrink: 0 }}
      >
        Post
      </Button>
    </Box>
  );
}

export default CommentForm;