import { Routes, Route } from "react-router-dom";
import SplashPage from "../pages/splash/splash";
import Login from "../pages/auth/login";
import Register from "../pages/auth/Register";
import Admin from "../pages/admin/Dashboard";
import CreateStore from "../pages/admin/CreateStore";
import ShopInvitation from "../pages/auth/ShopInvitation";
import ShopVerification from "../pages/auth/ShopVerification";

import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import GoogleCallback from "../pages/auth/GoogleCallback";
// import Admin from "../pages/admin/Admin";
import AIMode from "../pages/AIMode";
import ProtectedRoute from "../components/ProtectedRoute";
import Inventory from "../pages/admin/Inventory";
import SuccessPage from "../pages/auth/successPage";
import Wallet from "../pages/admin/wallet";
import { useAuthStore } from "../../stores/authStore";
import Sales from "../pages/admin/Sales";

export default function AppNavigation() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      {/* root path will render the splash screen first */}
      <Route index element={<SplashPage />} />
      <Route path="/" element={<SplashPage />} />
      
      {/* Authentication Routes - Only show when not authenticated */}
      {!isAuthenticated && (
        <>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </>
      )}
      
      {/* Protected Routes - Only show when authenticated */}
      {isAuthenticated && (
        <>
          <Route path="/dashboard" element={<Admin />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/shop-invitation" element={<ShopInvitation />} />
          <Route path="/shop-verification" element={<ShopVerification />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/ai-mode" element={<AIMode />} />
          <Route path="/create-store" element={<CreateStore />} />
          <Route path="/Sales" element={<ProtectedRoute><Sales/></ProtectedRoute>}></Route>
        </>
      )}
      
      {/* Public Routes - Always available */}
      <Route path="/google-callback" element={<GoogleCallback />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />
      <Route path="/success-register" element={<SuccessPage />} />
    </Routes>
  );
}
