import { useState } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
} from "@mui/material";
import { resetPassword } from "../api/api";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Try again.");
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <Typography
          variant="h5"
          align="center"
          sx={{ fontFamily: "'JetBrains Mono', monospace", mb: 4, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          {"<"}
          <Box component="span" sx={{ color: "primary.main" }}>DevBlog</Box>
          {" />"}
        </Typography>

        <Paper
          elevation={0}
          sx={{ p: 4, bgcolor: "#111111", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Typography variant="h6" sx={{ mb: 3 }}>
            Set a new password
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Password reset! Redirecting you to login...
            </Alert>
          ) : (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                helperText="At least 6 characters"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ background: "linear-gradient(135deg, #4F46E5, #6366F1)", py: 1.2 }}
              >
                Reset Password
              </Button>
            </Box>
          )}

          <Typography align="center" sx={{ mt: 3, color: "text.secondary", fontSize: 14 }}>
            <Link component={RouterLink} to="/login" sx={{ color: "primary.light" }}>
              Back to Login
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default ResetPassword;