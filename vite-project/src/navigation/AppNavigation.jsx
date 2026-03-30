// import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SplashPage from "../pages/splash/splash";
import Login from "../pages/auth/login";
import Register from "../pages/auth/Register";
import Admin from "../pages/admin/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Inventory from "../pages/admin/Inventory";
import ForgetPassword from "../pages/auth/ForgetPassword";




// import { useAuthStore } from "../stores/authStore";



export default function AppNavigation() {
// const { isAuthenticated } = useAuthStore();
  return (
    <Routes>
      {/* root path will render the splash screen first */}
      <Route index element={<SplashPage />} />
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} /> */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/Inventory" element={<Inventory />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      

      {/* {isAuthenticated ? (
        <>
          <Route path="/Home" element={<Home />} />
        </>
      ) : (
        <>
            <Route path="/login" element={<Login />} />
        </>
      )} */}
    </Routes>
  );
}
