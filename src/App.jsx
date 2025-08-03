import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import "./App.css";
function App() {
  return (
    <>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="*" element={<Navigate to="/reset-password" />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
