import { Routes, Route } from "react-router-dom";
import SplashPage from "../pages/splash/splash";
import Login from "../pages/auth/login";
import Register from "../pages/auth/Register";
import Admin from "../pages/admin/Dashboard";
import CreateStore from "../pages/admin/CreateStore";

import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import GoogleCallback from "../pages/auth/GoogleCallback";
// import Admin from "../pages/admin/Admin";
import AIMode from "../pages/AIMode";
import ProtectedRoute from "../components/ProtectedRoute";
import Inventory from "../pages/admin/Inventory";
import SuccessPage from "../pages/auth/successPage";


export default function AppNavigation() {
  return (
    <Routes>
      {/* root path will render the splash screen first */}
      <Route index element={<SplashPage />} />
      <Route path="/" element={<SplashPage />} />
      <Route path="/register" element={<Register/>}/>
      
      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} /> */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/Inventory" element={<Inventory />} />
      <Route path="/forgetpassword" element={<ForgotPassword />} />

      

      {/* {isAuthenticated ? (
        <>
          <Route path="/Home" element={<Home />} />
        </>
      ) : (
        <>
            <Route path="/login" element={<Login />} />
        </>
      )} */}

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />
      <Route path="/success-register" element={<SuccessPage />} />
      
      {/* Protected Routes */}
      <Route path="/ai-mode" element={<ProtectedRoute><AIMode /></ProtectedRoute>} />
      <Route path="/Inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      <Route path="/create-store" element={<ProtectedRoute><CreateStore /></ProtectedRoute>} />
      {/* <Route path="/store/:code" element={<ProtectedRoute><StoreDetail /></ProtectedRoute>} /> */}


    </Routes>
      
  );
}
