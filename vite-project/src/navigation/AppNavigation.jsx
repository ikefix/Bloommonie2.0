import { Routes, Route } from "react-router-dom";
import SplashPage from "../pages/splash/splash";
import Login from "../pages/auth/login";
import Register from "../pages/auth/Register";
import UserDashboard from "../pages/admin/Dashboard";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import GoogleCallback from "../pages/auth/GoogleCallback";
import AIMode from "../pages/AIMode";
import ProtectedRoute from "../components/ProtectedRoute";
import Inventory from "../pages/admin/Inventory";


export default function AppNavigation() {
  return (
    <Routes>
      {/* root path will render the splash screen first */}
      <Route index element={<SplashPage />} />
      <Route path="/" element={<SplashPage />} />
      
      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} /> */}
      <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
      <Route path="/Inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />
      
      {/* Protected Routes */}
      <Route path="/ai-mode" element={<ProtectedRoute><AIMode /></ProtectedRoute>} />
    </Routes>
  );
}
