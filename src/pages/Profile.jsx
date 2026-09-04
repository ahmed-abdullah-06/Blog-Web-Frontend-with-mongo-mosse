import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Typography, Avatar, Button, Divider, Stack } from "@mui/material";
import { getUserProfile, getImageUrl } from "../api/api";
import { useAuth } from "../context/AuthContext";

function getInitials(name) {
  if (!name) return "??";
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile(id)
      .then((res) => setProfile(res.data))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ pt: "64px", textAlign: "center", py: 8 }}>
        <Typography sx={{ color: "text.secondary" }}>Loading profile...</Typography>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ pt: "64px", textAlign: "center", py: 8 }}>
        <Typography sx={{ color: "text.secondary" }}>Profile not found.</Typography>
      </Box>
    );
  }

  const posts = profile.Posts || [];
  const isOwnProfile = user && user.id === profile.id;

  return (
    <Box sx={{ pt: "64px", minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Header */}
        <Box sx={{ display: "flex", gap: 4, alignItems: "center", mb: 4, flexWrap: "wrap" }}>
          <Avatar
            sx={{
              width: 96,
              height: 96,
              fontSize: "1.8rem",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              background: "linear-gradient(135deg, #4F46E5, #22D3EE)",
            }}
          >
            {getInitials(profile.name)}
          </Avatar>

          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5, flexWrap: "wrap" }}>
              <Typography variant="h6" sx={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
                {profile.name}
              </Typography>
              {isOwnProfile ? (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate("/settings?tab=profile")}
                  sx={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
                >
                  Edit Profile
                </Button>
              ) : (
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{ background: "linear-gradient(135deg, #4F46E5, #6366F1)" }}
                  >
                    Follow
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate("/messages", { state: { user: profile } })}
                    sx={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
                  >
                    Message
                  </Button>
                </Stack>
              )}
            </Box>

            <Box sx={{ display: "flex", gap: 4, mb: 1.5 }}>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 15 }}>{posts.length}</Typography>
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>Posts</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 15 }}>0</Typography>
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>Followers</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 15 }}>0</Typography>
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>Following</Typography>
              </Box>
            </Box>

            <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
              {profile.email}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 3 }} />

        <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", mb: 2 }}>
          POSTS
        </Typography>

        {posts.length === 0 ? (
          <Typography sx={{ color: "text.secondary" }}>No posts yet.</Typography>
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}>
            {posts.map((post) => {
              const coverUrl = getImageUrl(post.coverImageUrl);
              return (
                <Box
                  key={post.id}
                  onClick={() => navigate(`/posts/${post.id}`)}
                  sx={{
                    aspectRatio: "1 / 1",
                    bgcolor: "#111114",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "6px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 1.5,
                    textAlign: "center",
                    overflow: "hidden",
                    backgroundImage: coverUrl ? `url(${coverUrl})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    "&:hover": { borderColor: "rgba(79,70,229,0.4)" },
                  }}
                >
                  {!coverUrl && (
                    <Typography sx={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: "#B3B3B3" }}>
                      {post.title}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Profile;