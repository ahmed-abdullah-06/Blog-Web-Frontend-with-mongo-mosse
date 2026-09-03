// Central place for all backend API calls
// this file is for frontend to call backend APIs, and it will be used in the frontend components

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

export function getImageUrl(path) {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
  return `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function signup(name, email, password, age, gender) {
  return api.post("/api/auth/signup", { name, email, password, age, gender });
}

export function login(email, password) {
  return api.post("/api/auth/login", { email, password });
}

export function forgotPassword(email) {
  return api.post("/api/auth/forgot-password", { email });
}

export function resetPassword(token, password) {
  return api.post(`/api/auth/reset-password/${token}`, { password });
}

export function getUserProfile(id) {
  return api.get(`/api/users/${id}`);
}

export function getAllPosts() {
  return api.get("/api/posts");
}

export function getPostById(id) {
  return api.get(`/api/posts/${id}`);
}

export function createPost(title, content, tags, imageFile, token) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("tags", tags);
  if (imageFile) formData.append("coverImage", imageFile);

  return api.post("/api/posts", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function updatePost(id, title, content, tags, imageFile, token) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("tags", tags);
  if (imageFile) formData.append("coverImage", imageFile);

  return api.put(`/api/posts/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function deletePost(id, token) {
  return api.delete(`/api/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function getComments(postId) {
  return api.get(`/api/posts/${postId}/comments`);
}

export function addComment(postId, content, token) {
  return api.post(
    `/api/posts/${postId}/comments`,
    { content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export function deleteComment(commentId, token) {
  return api.delete(`/api/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export function toggleLike(postId, token) {
  return api.post(
    `/api/posts/${postId}/like`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export function getLikeStatus(postId, token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return api.get(`/api/posts/${postId}/like`, { headers });
}

export function updateProfile(name, age, gender, token) {
  return api.put(
    "/api/users/me",
    { name, age, gender },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export function changePassword(currentPassword, newPassword, token) {
  return api.put(
    "/api/users/me/password",
    { currentPassword, newPassword },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export function getConversations(token) {
  return api.get("/api/messages/conversations", { headers: { Authorization: `Bearer ${token}` } });
}
export function getThread(userId, token) {
  return api.get(`/api/messages/${userId}`, { headers: { Authorization: `Bearer ${token}` } });
}
export function sendMessage(userId, content, token) {
  return api.post(`/api/messages/${userId}`, { content }, { headers: { Authorization: `Bearer ${token}` } });
}

export default api;