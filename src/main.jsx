import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import RequireAuth from "./auth/RequireAuth";
import { ToastProvider } from "./components/Toast";

import PacienteDetalhes from "./pages/PacienteDetalhes";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Pacientes from "./pages/Pacientes";
import PacienteForm from "./pages/PacienteForm";
import Reports from "./pages/Reports";
import ReportForm from "./pages/ReportForm";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
              <Route index element={<Navigate to="/pacientes" replace />} />
              <Route path="pacientes" element={<Pacientes />} />
              <Route path="pacientes/new" element={<PacienteForm />} />
              <Route path="pacientes/:id/edit" element={<PacienteForm />} />
              <Route path="pacientes/:id" element={<PacienteDetalhes />} />
              

              <Route path="reports" element={<Reports />} />
              <Route path="reports/new" element={<ReportForm />} />
              <Route path="reports/:id/edit" element={<ReportForm />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);