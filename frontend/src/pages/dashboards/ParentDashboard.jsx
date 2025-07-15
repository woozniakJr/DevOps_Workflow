import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/api";
import Navbar from "../../components/Navbar";

export default function ParentDashboard() {
  const { user } = useAuth();
  const [enfants, setEnfants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enfantsRes = await API.get("/parent/enfants");
        setEnfants(enfantsRes.data || []);
      } catch (err) {
        console.error("Erreur chargement enfants :", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-6 pt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-indigo-700">
            Bonjour {user?.nom} 👨‍👩‍👧‍👦
          </h1>
          <p className="text-gray-600 mb-8">Suivi des enfants scolarisés</p>

          <div className="space-y-6">
            {enfants.map((enf, idx) => (
              <div key={idx} className="bg-white rounded shadow p-4">
                <h2 className="text-lg font-semibold text-indigo-700">{enf.nom}</h2>
                <p className="text-sm text-gray-500 mb-2">{enf.classe}</p>
                <ul className="text-sm space-y-1">
                  {enf.notes?.map((n, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{n.matiere}</span>
                      <span className="font-bold">{n.note}/20</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {enfants.length === 0 && (
              <p className="text-gray-500">Aucun enfant à afficher pour ce compte.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
