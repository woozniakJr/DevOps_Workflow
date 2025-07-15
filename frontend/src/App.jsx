import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import ParentDashboard from "./pages/dashboards/ParentDashboard";
import EtudiantDashboard from "./pages/dashboards/EtudiantDashboard";
import EnseignantDashboard from "./pages/dashboards/EnseignantDashboard";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/parent" element={<ParentDashboard />} />
          <Route path="/etudiant" element={<EtudiantDashboard />} />
          <Route path="/enseignant" element={<EnseignantDashboard />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
