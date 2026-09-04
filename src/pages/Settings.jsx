import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Switch,
  Alert,
  MenuItem,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import { Person, Lock, Notifications as NotifIcon } from "@mui/icons-material";
import { updateProfile, changePassword } from "../api/api";
import { useAuth } from "../context/AuthContext";

const GRADIENT = "linear-gradient(135deg, #4F46E5, #6366F1)";

function SectionCard({ title, children }) {
  return (
    <Box sx={{ mb: 4 }}>
      {title && (
        <Typography
          sx={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            mb: 1.5,
            px: 0.5,
          }}
        >
          {title}
        </Typography>
      )}
      <Box sx={{ bgcolor: "#111114", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", overflow: "hidden" }}>
        {children}
      </Box>
    </Box>
  );
}

function SettingsRow({ label, description, control, danger, last }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 3,
        py: 2,
        px: 2.5,
        borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: danger ? "#F87171" : "#E4E4E7" }}>
          {label}
        </Typography>
        {description && (
          <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.35)", mt: 0.5 }}>
            {description}
          </Typography>
        )}
      </Box>
      <Box sx={{ flexShrink: 0 }}>{control}</Box>
    </Box>
  );
}

function Settings() {
  const { user, token, updateUser, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") || "profile";

  const handleTabChange = (event, newValue) => {
    setSearchParams({ tab: newValue });
  };

  const [name, setName] = useState(user?.name || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [profileMsg, setProfileMsg] = useState("");
  const [profileError, setProfileError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [notifLikes, setNotifLikes] = useState(true);
  const [notifComments, setNotifComments] = useState(true);
  const [notifFollows, setNotifFollows] = useState(false);

  async function handleProfileSave() {
    setProfileError("");
    setProfileMsg("");
    try {
      await updateProfile(name, age, gender, token);
      if (updateUser) {
        updateUser({ name, age, gender });
      }
      setProfileMsg("Profile updated successfully");
    } catch (err) {
      setProfileError(err.response?.data?.error || "Could not update profile");
    }
  }

  async function handlePasswordSave() {
    setPasswordError("");
    setPasswordMsg("");
    try {
      await changePassword(currentPassword, newPassword, token);
      setPasswordMsg("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setPasswordError(err.response?.data?.error || "Could not change password");
    }
  }

  return (
    <Box sx={{ pt: "64px", minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Typography
          variant="h5"
          sx={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, mb: 3 }}
        >
          Settings
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "rgba(255, 255, 255, 0.08)", mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#6366F1",
                height: 2.5,
                borderRadius: "2px",
              },
              "& .MuiTab-root": {
                color: "rgba(255, 255, 255, 0.5)",
                textTransform: "none",
                fontSize: 14,
                fontWeight: 600,
                minWidth: "auto",
                px: 2,
                py: 1.5,
                fontFamily: "'Inter', sans-serif",
                "&:hover": { color: "#E4E4E7" },
                "&.Mui-selected": { color: "#6366F1" },
              },
            }}
          >
            <Tab icon={<Person sx={{ fontSize: 18 }} />} iconPosition="start" label="Edit Profile" value="profile" />
            <Tab icon={<Lock sx={{ fontSize: 18 }} />} iconPosition="start" label="Security" value="security" />
            <Tab icon={<NotifIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Notifications" value="notifications" />
          </Tabs>
        </Box>

        {activeTab === "profile" && (
          <SectionCard title="Profile Details">
            <Box sx={{ p: 2.5 }}>
              {profileError && <Alert severity="error" sx={{ mb: 2 }}>{profileError}</Alert>}
              {profileMsg && <Alert severity="success" sx={{ mb: 2 }}>{profileMsg}</Alert>}
              <Stack spacing={2}>
                <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} size="small" />
                <TextField fullWidth label="Email" value={user?.email || ""} size="small" disabled />
                <TextField fullWidth label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} size="small" />
                <TextField fullWidth select label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} size="small">
                  <MenuItem value="">Prefer not to say</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
                <Button onClick={handleProfileSave} variant="contained" sx={{ background: GRADIENT, alignSelf: "flex-start", px: 3 }}>
                  Save Changes
                </Button>
              </Stack>
            </Box>
          </SectionCard>
        )}

        {activeTab === "security" && (
          <SectionCard title="Password & Security">
            <Box sx={{ p: 2.5 }}>
              {passwordError && <Alert severity="error" sx={{ mb: 2 }}>{passwordError}</Alert>}
              {passwordMsg && <Alert severity="success" sx={{ mb: 2 }}>{passwordMsg}</Alert>}
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  size="small"
                />
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  size="small"
                  helperText="At least 6 characters"
                />
                <Button
                  onClick={handlePasswordSave}
                  variant="outlined"
                  sx={{ alignSelf: "flex-start", px: 3, borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
                >
                  Change Password
                </Button>
              </Stack>
            </Box>
          </SectionCard>
        )}

        {activeTab === "notifications" && (
          <SectionCard title="Notification Preferences">
            <SettingsRow
              label="Likes"
              description="Get notified when someone likes your post"
              control={<Switch checked={notifLikes} onChange={(e) => setNotifLikes(e.target.checked)} />}
            />
            <SettingsRow
              label="Comments"
              description="Get notified when someone comments on your post"
              control={<Switch checked={notifComments} onChange={(e) => setNotifComments(e.target.checked)} />}
            />
            <SettingsRow
              label="New Followers"
              description="Get notified when someone follows you"
              control={<Switch checked={notifFollows} onChange={(e) => setNotifFollows(e.target.checked)} />}
              last
            />
          </SectionCard>
        )}

        {/* Logout */}
        <SectionCard>
          <SettingsRow
            label="Log out"
            description="Sign out of your DevBlog account on this device"
            danger
            control={
              <Button onClick={logout} sx={{ color: "#F87171", fontSize: 13 }}>
                Logout
              </Button>
            }
            last
          />
        </SectionCard>
      </Container>
    </Box>
  );
}

export default Settings;