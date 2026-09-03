import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Avatar,
  Typography,
  Chip,
  IconButton,
} from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { toggleLike, getLikeStatus, getImageUrl } from "../api/api";
import { useAuth } from "../context/AuthContext";

function getInitials(name) {
  if (!name) return "??";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function PostCard({ post }) {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    getLikeStatus(post.id, token).then((res) => {
      setLiked(res.data.liked);
      setLikeCount(res.data.likeCount);
    });
  }, [post.id, token]);

  async function handleLike(e) {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const res = await toggleLike(post.id, token);
      setLiked(res.data.liked);
      setLikeCount(res.data.likeCount);
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  }

  const coverUrl = getImageUrl(post.coverImageUrl);

  return (
    <Card
      onClick={() => navigate(`/posts/${post.id}`)}
      sx={{ borderRadius: "8px", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      {coverUrl && (
        <CardMedia
          component="img"
          height="180"
          image={coverUrl}
          alt={post.title}
          sx={{ objectFit: "cover" }}
        />
      )}
      {post.coverImageUrl && (
        <Box
          sx={{
            width: "10%",
            aspectRatio: "16 / 9",
            backgroundImage: `url(${(import.meta.env.VITE_API_URL || "http://localhost:5000")}${post.coverImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <Avatar
            sx={{
              width: 30,
              height: 30,
              fontSize: "0.65rem",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              bgcolor: "primary.main",
              flexShrink: 0,
            }}
          >
            {getInitials(post.author?.name)}
          </Avatar>
          <Typography variant="body2" sx={{ color: "#B3B3B3", fontSize: "0.78rem", fontWeight: 500 }}>
            {post.author?.name || "Unknown"}
          </Typography>
          {post.tag && (
            <Chip
              label={post.tag}
              size="small"
              sx={{
                ml: "auto",
                fontSize: "0.65rem",
                height: 20,
                backgroundColor: "rgba(79,70,229,0.12)",
                color: "#818CF8",
                border: "1px solid rgba(79,70,229,0.2)",
                fontFamily: "'JetBrains Mono', monospace",
                "& .MuiChip-label": { px: 1 },
              }}
            />
          )}
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: { xs: "0.95rem", sm: "1.05rem" },
            lineHeight: 1.35,
            color: "#FFFFFF",
            letterSpacing: "-0.01em",
          }}
        >
          {post.title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#B3B3B3",
            fontSize: "0.85rem",
            lineHeight: 1.65,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.content?.slice(0, 150)}
          {post.content?.length > 150 ? "..." : ""}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: "auto",
            pt: 1.5,
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.72rem",
              letterSpacing: "0.02em",
            }}
          >
            {formatDate(post.createdAt)}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={handleLike}
              sx={{
                color: liked ? "#F87171" : "rgba(255,255,255,0.4)",
                p: 0.5,
                "&:hover": { color: "#F87171", backgroundColor: "rgba(248,113,113,0.08)" },
              }}
            >
              {liked ? <Favorite sx={{ fontSize: 16 }} /> : <FavoriteBorder sx={{ fontSize: 16 }} />}
            </IconButton>
            <Typography
              variant="caption"
              sx={{
                fontFamily: "'JetBrains Mono', monospace",
                color: liked ? "#F87171" : "rgba(255,255,255,0.4)",
                fontSize: "0.75rem",
                minWidth: 24,
              }}
            >
              {likeCount}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PostCard;