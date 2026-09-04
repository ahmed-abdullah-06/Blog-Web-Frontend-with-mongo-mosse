import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
import { forgotPassword } from "../api/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await forgotPassword(email);
      setSubmitted(true);
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
            Reset your password
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {submitted ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              If an account exists for {email}, a reset link has been sent.
            </Alert>
          ) : (
            <Box component="form" onSubmit={handleSubmit}>
              <Typography sx={{ color: "text.secondary", fontSize: 14, mb: 3 }}>
                Enter your email and we'll send you a link to reset your password.
              </Typography>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Send Reset Link
              </Button>
            </Box>
          )}

          <Typography align="center" sx={{ mt: 3, color: "text.secondary", fontSize: 14 }}>
            Remembered your password?{" "}
            <Link component={RouterLink} to="/login" sx={{ color: "primary.light" }}>
              Login
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default ForgotPassword;