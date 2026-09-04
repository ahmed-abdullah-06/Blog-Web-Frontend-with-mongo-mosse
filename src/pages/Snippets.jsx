import { Box, Typography } from "@mui/material";

function Snippets() {
  return (
    <Box sx={{ pt: "64px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "background.default" }}>
      <Typography sx={{ color: "text.secondary" }}>
        Snippets (Reels) — coming soon, needs video upload backend.
      </Typography>
    </Box>
  );
}

export default Snippets;