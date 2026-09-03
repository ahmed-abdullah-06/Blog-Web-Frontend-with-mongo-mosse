import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function PostForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const { token } = useAuth() || {};
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await createPost(title, content, token);
      setTitle("");
      setContent("");
      onSuccess?.();
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create post");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="post-form">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">Publish</button>
    </form>
  );
}
