import Navbar from "./components/Navbar";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";


import { Toaster } from "react-hot-toast";
import { axiosInstance } from "./lib/axois";
import { useAuthStore } from "./store/useAuthStore";

import { LoaderCircle } from 'lucide-react';

const App = () => {
  const { authUser , checkAuth , isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
    },[checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" replace />} />
        <Route path="/singup" element={!authUser ? <SignUpPage /> : <Navigate to="/" replace />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" replace />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" replace />} />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;