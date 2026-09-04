import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  Pagination,
  Button,
} from "@mui/material";
import { Search, Add, ArticleOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { getAllPosts } from "../api/api";

const GRADIENT = "linear-gradient(135deg, #4F46E5 0%, #818CF8 50%, #22D3EE 100%)";
const POSTS_PER_PAGE = 6;

function EmptyState() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, py: 12, textAlign: "center" }}>
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          backgroundColor: "rgba(79,70,229,0.08)",
          border: "1px solid rgba(79,70,229,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ArticleOutlined sx={{ fontSize: 36, color: "rgba(79,70,229,0.5)" }} />
      </Box>
      <Box>
        <Typography variant="h5" sx={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: "#FFFFFF", mb: 1 }}>
          No posts yet
        </Typography>
        <Typography variant="body2" sx={{ color: "#B3B3B3", fontSize: "0.9rem" }}>
          Be the first to write one and share it with the community.
        </Typography>
      </Box>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => navigate("/create-post")}
        sx={{
          background: GRADIENT,
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 600,
          px: 3,
          py: 1.2,
          borderRadius: "8px",
          fontSize: "0.9rem",
          boxShadow: "0 4px 20px rgba(79,70,229,0.3)",
          "&:hover": { boxShadow: "0 6px 28px rgba(79,70,229,0.45)" },
        }}
      >
        Create a Post
      </Button>
    </Box>
  );
}

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await getAllPosts();
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.author?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE
  );

  return (
    <Box sx={{ pt: "64px" }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4 }, py: { xs: 5, sm: 7 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { md: "flex-end" },
            justifyContent: "space-between",
            gap: 3,
            mb: { xs: 5, sm: 7 },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                background: GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1.5,
              }}
            >
              {/* // browse */}
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 800,
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
                color: "#FFFFFF",
                lineHeight: 1.15,
                letterSpacing: "-0.025em",
              }}
            >
              Latest from the{" "}
              <Box component="span" sx={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                community
              </Box>
            </Typography>
          </Box>

          <TextField
            placeholder="Search posts..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            size="small"
            slotProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ fontSize: 18, color: "rgba(255,255,255,0.3)" }} />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: "100%", md: 280 } }}
          />
        </Box>

        {loading ? (
          <Typography sx={{ color: "text.secondary", textAlign: "center", py: 8 }}>
            Loading posts...
          </Typography>
        ) : filteredPosts.length === 0 ? (
          <EmptyState />
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {paginatedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Box>
        )}

        {pageCount > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 6, sm: 8 }, pb: 4 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, val) => setPage(val)}
              variant="outlined"
              shape="rounded"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Home;