import { Routes, Route } from "react-router-dom";
import AppShell from "./components/AppShell";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import Snippets from "./pages/Snippets";
// import Notifications from "./pages/Notifications";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/home" element={<AppShell><Home /></AppShell>} />
      <Route path="/create-post" element={<AppShell><CreatePost /></AppShell>} />
      <Route path="/edit-post/:id" element={<AppShell><CreatePost /></AppShell>} />
      <Route path="/posts/:id" element={<AppShell><PostDetail /></AppShell>} />
      <Route path="/users/:id" element={<AppShell><Profile /></AppShell>} />
      <Route path="/settings" element={<AppShell><Settings /></AppShell>} />
      <Route path="/messages" element={<AppShell><Messages /></AppShell>} />
      <Route path="/snippets" element={<AppShell><Snippets /></AppShell>} />
      {/* <Route path="/notifications" element={<AppShell><Notifications /></AppShell>} /> */}
    </Routes>
  );
}

export default App;