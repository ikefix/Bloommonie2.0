import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <AuthProvider>
        <App />
      </AuthProvider>
=======
      <App />
>>>>>>> e8bbc507096c7552c908a45da85ab862a6a1000a
    </BrowserRouter>
  </StrictMode>
);
