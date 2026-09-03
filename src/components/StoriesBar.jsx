import { useState, useEffect } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "../api/api";
import { useAuth } from "../context/AuthContext";

function getInitials(name) {
  if (!name) return "??";
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function StoriesBar() {
  const [authors, setAuthors] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getAllPosts().then((res) => {
      const seen = new Set();
      const uniqueAuthors = [];
      res.data.forEach((post) => {
        if (post.author && !seen.has(post.author.id)) {
          seen.add(post.author.id);
          uniqueAuthors.push(post.author);
        }
      });
      setAuthors(uniqueAuthors.slice(0, 10));
    });
  }, []);

  return (
    <Box sx={{ display: "flex", gap: 2.5, overflowX: "auto", py: 2, px: { xs: 2, sm: 0 }, mb: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
        <Avatar
          onClick={() => navigate(`/users/${user?.id}`)}
          sx={{
            width: 60,
            height: 60,
            background: "linear-gradient(135deg, #4F46E5, #22D3EE)",
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            cursor: "pointer",
            border: "2px solid rgba(255,255,255,0.15)",
          }}
        >
          {getInitials(user?.name)}
        </Avatar>
        <Typography sx={{ fontSize: 11, color: "text.secondary" }}>Your Profile</Typography>
      </Box>

      {authors.map((author) => (
        <Box key={author.id} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
          <Box
            onClick={() => navigate(`/users/${author.id}`)}
            sx={{
              p: "2px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4F46E5, #22D3EE)",
              cursor: "pointer",
            }}
          >
            <Avatar sx={{ width: 56, height: 56, bgcolor: "#111", fontSize: "0.75rem", fontWeight: 700, border: "2px solid #0D0D0D" }}>
              {getInitials(author.name)}
            </Avatar>
          </Box>
          <Typography sx={{ fontSize: 11, color: "text.secondary", maxWidth: 60, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {author.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default StoriesBar;