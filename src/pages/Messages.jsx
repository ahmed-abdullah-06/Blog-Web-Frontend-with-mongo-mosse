import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  List,
  ListItemButton,
  InputAdornment,
  Badge,
} from "@mui/material";
import { Send, Search, Circle } from "@mui/icons-material";
import { getConversations, getThread, sendMessage } from "../api/api";
import { useAuth } from "../context/AuthContext";

const GRADIENT = "linear-gradient(135deg, #4F46E5, #6366F1)";

function getInitials(name) {
  if (!name) return "??";
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function formatTime(dateString) {
  return new Date(dateString).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [search, setSearch] = useState("");
  const [activeUser, setActiveUser] = useState(null);
  const [thread, setThread] = useState([]);
  const [text, setText] = useState("");
  const { user, token } = useAuth();
  const bottomRef = useRef(null);

  useEffect(() => {
    getConversations(token).then((res) => setConversations(res.data));
  }, [token]);

  useEffect(() => {
    if (!activeUser) return;
    getThread(activeUser.id, token).then((res) => setThread(res.data));
    const interval = setInterval(() => {
      getThread(activeUser.id, token).then((res) => setThread(res.data));
    }, 4000);
    return () => clearInterval(interval);
  }, [activeUser, token]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread]);

  async function handleSend(e) {
    e.preventDefault();
    if (!text.trim() || !activeUser) return;
    await sendMessage(activeUser.id, text, token);
    setText("");
    const res = await getThread(activeUser.id, token);
    setThread(res.data);
  }

  const filteredConvos = conversations.filter((c) =>
    c.user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ pt: "64px", height: "100vh", display: "flex", bgcolor: "#0A0A0C", flexDirection: { xs: "column", sm: "row" } }}>
      {/* Conversation list */}
      <Box
        sx={{
          width: { xs: "100%", sm: 320 },
          display: { xs: activeUser ? "none" : "flex", sm: "flex" },
          flexDirection: "column",
          borderRight: { sm: "1px solid rgba(255,255,255,0.06)" },
        }}
      >
        <Box sx={{ p: 2.5, pb: 1.5 }}>
          <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 18, mb: 2 }}>
            Messages
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ fontSize: 16, color: "rgba(255,255,255,0.3)" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <List sx={{ overflowY: "auto", flex: 1, px: 1 }}>
          {filteredConvos.map((c) => (
            <ListItemButton
              key={c.user.id}
              selected={activeUser?.id === c.user.id}
              onClick={() => setActiveUser(c.user)}
              sx={{
                borderRadius: "10px",
                mb: 0.5,
                "&.Mui-selected": { bgcolor: "rgba(79,70,229,0.12)" },
                "&:hover": { bgcolor: "rgba(255,255,255,0.03)" },
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={<Circle sx={{ fontSize: 10, color: "#22D3EE" }} />}
              >
                <Avatar sx={{ mr: 1.5, width: 40, height: 40, fontSize: 13, fontWeight: 700, background: GRADIENT }}>
                  {getInitials(c.user.name)}
                </Avatar>
              </Badge>
              <Box sx={{ overflow: "hidden", flex: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{c.user.name}</Typography>
                  <Typography sx={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{formatTime(c.lastMessageAt)}</Typography>
                </Box>
                <Typography sx={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {c.lastMessage}
                </Typography>
              </Box>
            </ListItemButton>
          ))}
          {filteredConvos.length === 0 && (
            <Typography sx={{ p: 2, fontSize: 13, color: "text.secondary" }}>
              No conversations yet. Visit a profile to start chatting.
            </Typography>
          )}
        </List>
      </Box>

      {/* Active thread */}
      <Box sx={{ flex: 1, display: { xs: activeUser ? "flex" : "none", sm: "flex" }, flexDirection: "column" }}>
        {activeUser ? (
          <>
            <Box sx={{ p: 2, borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 1.5 }}>
              {/* Mobile back button */}
              <Box
                onClick={() => setActiveUser(null)}
                sx={{ display: { xs: "block", sm: "none" }, cursor: "pointer", fontSize: 20, color: "rgba(255,255,255,0.5)" }}
              >
                ←
              </Box>
              <Avatar sx={{ width: 36, height: 36, fontSize: 12, fontWeight: 700, background: GRADIENT }}>
                {getInitials(activeUser.name)}
              </Avatar>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: 14 }}>{activeUser.name}</Typography>
                <Typography sx={{ fontSize: 11, color: "#22D3EE" }}>Active now</Typography>
              </Box>
            </Box>

            <Box sx={{ flex: 1, overflowY: "auto", p: 2.5, display: "flex", flexDirection: "column", gap: 1 }}>
              {thread.map((m) => {
                const mine = m.senderId === user.id;
                return (
                  <Box key={m.id} sx={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start" }}>
                    <Box
                      sx={{
                        maxWidth: "65%",
                        px: 2,
                        py: 1.2,
                        borderRadius: "14px",
                        borderBottomRightRadius: mine ? "4px" : "14px",
                        borderBottomLeftRadius: mine ? "14px" : "4px",
                        background: mine ? GRADIENT : "#17171B",
                        color: "#fff",
                        fontSize: 14,
                        lineHeight: 1.5,
                      }}
                    >
                      {m.content}
                    </Box>
                  </Box>
                );
              })}
              <div ref={bottomRef} />
            </Box>

            <Box component="form" onSubmit={handleSend} sx={{ display: "flex", gap: 1, p: 2, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <TextField
                fullWidth
                size="small"
                placeholder={`Message ${activeUser.name}...`}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <IconButton type="submit" sx={{ background: GRADIENT, color: "#fff", "&:hover": { opacity: 0.9 } }}>
                <Send fontSize="small" />
              </IconButton>
            </Box>
          </>
        ) : (
          <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography sx={{ color: "text.secondary" }}>Select a conversation to start chatting</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Messages;