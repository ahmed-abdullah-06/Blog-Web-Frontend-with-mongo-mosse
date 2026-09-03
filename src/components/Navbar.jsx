import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { KeyboardArrowDown, Add } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const GRADIENT = "linear-gradient(135deg, #4F46E5 0%, #818CF8 50%, #22D3EE 100%)";

function getInitials(name) {
  if (!name) return "??";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  function handleLogout() {
    setAnchorEl(null);
    logout();
    navigate("/login");
  }

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ gap: 3, px: { xs: 2, sm: 4 }, minHeight: "64px !important" }}>
        <Typography
          component={RouterLink}
          to="/home"
          sx={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: "1rem",
            color: "#FFFFFF",
            letterSpacing: "-0.01em",
            flexShrink: 0,
            textDecoration: "none",
          }}
        >
          {"<"}
          <Box component="span" sx={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            DevBlog
          </Box>
          {" />"}
        </Typography>

        <Box sx={{ display: "flex", gap: 0.5, ml: 1 }}>
          <Button
            component={RouterLink}
            to="/home"
            sx={{
              color: "#FFFFFF",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "0.85rem",
              textTransform: "none",
              px: 1.5,
              py: 0.5,
              borderRadius: "6px",
            }}
          >
            Home
          </Button>
          <Button
            component={RouterLink}
            to="/messages"
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "0.85rem",
              textTransform: "none",
              px: 1.5,
              py: 0.5,
              borderRadius: "6px",
              "&:hover": { color: "#ffffff" },
            }}
          >
            Messages
          </Button>
        </Box>

        <Box sx={{ flex: 1 }} />

        <Button
          component={RouterLink}
          to="/create-post"
          variant="contained"
          startIcon={<Add sx={{ fontSize: "1rem !important" }} />}
          sx={{
            background: GRADIENT,
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
            fontSize: "0.8rem",
            px: 2,
            py: 0.75,
            borderRadius: "7px",
            textTransform: "none",
            boxShadow: "0 2px 12px rgba(79,70,229,0.3)",
            whiteSpace: "nowrap",
            "&:hover": { boxShadow: "0 4px 20px rgba(79,70,229,0.5)" },
          }}
        >
          New Post
        </Button>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Avatar
            sx={{
              width: 34,
              height: 34,
              fontSize: "0.7rem",
              fontWeight: 700,
              fontFamily: "'JetBrains Mono', monospace",
              background: "linear-gradient(135deg, #4F46E5, #22D3EE)",
              cursor: "pointer",
            }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {getInitials(user?.name)}
          </Avatar>
          <IconButton
            size="small"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ color: "rgba(255,255,255,0.5)", p: 0.25 }}
          >
            <KeyboardArrowDown sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          slotProps={{
            paper: {
              sx: {
                backgroundColor: "#111111",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                mt: 1,
                minWidth: 140,
              },
            },
          }}
        >
          <MenuItem
            component={RouterLink}
            to={`/users/${user?.id}`}
            onClick={() => setAnchorEl(null)}
            sx={{ fontSize: "0.85rem", color: "#B3B3B3", "&:hover": { color: "#fff", backgroundColor: "rgba(79,70,229,0.08)" } }}
          >
            Profile
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/settings"
            onClick={() => setAnchorEl(null)}
            sx={{ fontSize: "0.85rem", color: "#B3B3B3", "&:hover": { color: "#fff", backgroundColor: "rgba(79,70,229,0.08)" } }}
          >
            Settings
          </MenuItem>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />
          <MenuItem
            onClick={handleLogout}
            sx={{ fontSize: "0.85rem", color: "#B3B3B3", "&:hover": { color: "#fff", backgroundColor: "rgba(79,70,229,0.08)" } }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
