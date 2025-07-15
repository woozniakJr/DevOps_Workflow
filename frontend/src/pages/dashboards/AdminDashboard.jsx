import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/api";
import Navbar from "../../components/Navbar";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ utilisateurs: 0, cours: 0, classes: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats");
        setStats(res.data || {});
      } catch (err) {
        console.error("Erreur chargement stats :", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-indigo-700">
            Bienvenue {user?.nom} 🧠
          </h1>
          <p className="text-gray-600 mb-8">Vue d’ensemble de la plateforme</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded shadow">
              <h2 className="text-gray-700 text-lg font-semibold">Utilisateurs</h2>
              <p className="text-3xl text-indigo-600 font-bold">{stats.utilisateurs}</p>
            </div>
            <div className="bg-white p-5 rounded shadow">
              <h2 className="text-gray-700 text-lg font-semibold">Cours</h2>
              <p className="text-3xl text-indigo-600 font-bold">{stats.cours}</p>
            </div>
            <div className="bg-white p-5 rounded shadow">
              <h2 className="text-gray-700 text-lg font-semibold">Classes</h2>
              <p className="text-3xl text-indigo-600 font-bold">{stats.classes}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
