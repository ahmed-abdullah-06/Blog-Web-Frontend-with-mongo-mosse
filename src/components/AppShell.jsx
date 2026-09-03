import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import {
  HomeRounded,
  HomeOutlined,
  PlayCircleRounded,
  PlayCircleOutlineRounded,
  AddCircleOutlineRounded,
  ChatBubbleOutlineRounded,
  ChatBubbleRounded,
  NotificationsNoneRounded,
  NotificationsRounded,
  SettingsOutlined,
  SettingsRounded,
} from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";

const DRAWER_WIDTH = 240;
const GRADIENT = "linear-gradient(135deg, #4F46E5 0%, #818CF8 50%, #22D3EE 100%)";

function getInitials(name) {
  if (!name) return "??";
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

const NAV_ITEMS = [
  { label: "Home", path: "/home", icon: HomeOutlined, iconActive: HomeRounded },
  { label: "Snippets", path: "/snippets", icon: PlayCircleOutlineRounded, iconActive: PlayCircleRounded },
    { label: "Create", path: "/create-post", icon: AddCircleOutlineRounded, iconActive: AddCircleOutlineRounded },
  { label: "Messages", path: "/messages", icon: ChatBubbleOutlineRounded, iconActive: ChatBubbleRounded },
  { label: "Notifications", path: "/notifications", icon: NotificationsNoneRounded, iconActive: NotificationsRounded },
];

function AppShell({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useMediaQuery("(max-width:768px)");

  function isActive(path) {
    return location.pathname === path;
  }

  if (isMobile) {
    return (
      <Box>
        <Box sx={{ pb: "56px" }}>{children}</Box>
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
            bgcolor: "#0D0D0D",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
          elevation={0}
        >
          <BottomNavigation
            value={location.pathname}
            onChange={(_, val) => navigate(val)}
            sx={{ bgcolor: "transparent" }}
          >
            {NAV_ITEMS.map((item) => {
              const Icon = isActive(item.path) ? item.iconActive : item.icon;
              return (
                <BottomNavigationAction
                  key={item.path}
                  value={item.path}
                  icon={<Icon sx={{ color: isActive(item.path) ? "#818CF8" : "rgba(255,255,255,0.4)" }} />}
                  sx={{ minWidth: 0 }}
                />
              );
            })}
            <BottomNavigationAction
              value={`/users/${user?.id}`}
              icon={
                <Avatar sx={{ width: 24, height: 24, fontSize: "0.6rem", background: GRADIENT }}>
                  {getInitials(user?.name)}
                </Avatar>
              }
              sx={{ minWidth: 0 }}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            bgcolor: "#0A0A0A",
            borderRight: "1px solid rgba(255,255,255,0.06)",
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography
            component={RouterLink}
            to="/home"
            sx={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            {"<"}
            <Box component="span" sx={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              DevBlog
            </Box>
            {" />"}
          </Typography>
        </Box>

        <List sx={{ px: 1.5 }}>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            const Icon = active ? item.iconActive : item.icon;
            return (
              <ListItemButton
                key={item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: "8px",
                  mb: 0.5,
                  bgcolor: active ? "rgba(79,70,229,0.1)" : "transparent",
                  "&:hover": { bgcolor: "rgba(79,70,229,0.08)" },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon sx={{ color: active ? "#818CF8" : "rgba(255,255,255,0.5)" }} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: active ? 600 : 500,
                    color: active ? "#fff" : "rgba(255,255,255,0.6)",
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>

        <Box sx={{ mt: "auto", p: 1.5 }}>
          <ListItemButton
            onClick={() => navigate("/settings")}
            sx={{ borderRadius: "8px", mb: 0.5 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {isActive("/settings") ? (
                <SettingsRounded sx={{ color: "#818CF8" }} />
              ) : (
                <SettingsOutlined sx={{ color: "rgba(255,255,255,0.5)" }} />
              )}
            </ListItemIcon>
            <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }} />
          </ListItemButton>
          <ListItemButton onClick={() => navigate(`/users/${user?.id}`)} sx={{ borderRadius: "8px" }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Avatar sx={{ width: 28, height: 28, fontSize: "0.65rem", background: GRADIENT }}>
                {getInitials(user?.name)}
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={user?.name || "Profile"} primaryTypographyProps={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }} />
          </ListItemButton>
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1, ml: `${DRAWER_WIDTH}px` }}>{children}</Box>
    </Box>
  );
}

export default AppShell;