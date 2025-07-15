import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/api";
import Navbar from "../../components/Navbar";

export default function EtudiantDashboard() {
  const { user } = useAuth();
  const [cours, setCours] = useState([]);
  const [notes, setNotes] = useState([]);
  const [presence, setPresence] = useState({ present: 0, absent: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [coursRes, notesRes, presenceRes] = await Promise.all([
          API.get("/etudiant/cours"),
          API.get("/etudiant/notes"),
          API.get("/etudiant/presence")
        ]);

        setCours(coursRes.data || []);
        setNotes(notesRes.data || []);
        setPresence(presenceRes.data || { present: 0, absent: 0 });
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const moyenne =
    notes.length > 0
      ? (
          notes.reduce((acc, note) => acc + note.note, 0) / notes.length
        ).toFixed(2)
      : "—";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 pt-30">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 pt-16 text-indigo-700">
              Bonjour {user?.nom} 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Voici votre tableau de bord étudiant
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-50 mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Présent</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {isLoading ? <span className="animate-pulse">...</span> : presence.present}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-red-50 mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Absent</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {isLoading ? <span className="animate-pulse">...</span> : presence.absent}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-indigo-50 mr-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total cours</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {isLoading ? <span className="animate-pulse">...</span> : cours.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-50 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Moyenne générale</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {isLoading ? <span className="animate-pulse">...</span> : moyenne}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 📘 Cours Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-xl font-semibold flex items-center text-gray-800">
                  <span className="bg-indigo-100 text-indigo-800 p-2 rounded-lg mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </span>
                  Cours suivis
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="p-5 animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  ))
                ) : cours.length > 0 ? (
                  cours.map((c, i) => (
                    <div key={i} className="p-5 hover:bg-gray-50 transition-colors">
                      <h3 className="font-medium text-indigo-700 mb-1">{c.titre}</h3>
                      <p className="text-sm text-gray-500">Professeur: {c.professeur}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-5 text-center text-gray-500">
                    Aucun cours trouvé
                  </div>
                )}
              </div>
            </div>

            {/* 🧮 Notes Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-xl font-semibold flex items-center text-gray-800">
                  <span className="bg-blue-100 text-blue-800 p-2 rounded-lg mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </span>
                  Notes par matière
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="p-5 animate-pulse flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-10"></div>
                    </div>
                  ))
                ) : notes.length > 0 ? (
                  notes.map((n, i) => (
                    <div key={i} className="p-5 hover:bg-gray-50 transition-colors flex justify-between items-center">
                      <span className="text-gray-700">{n.matiere}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${n.note >= 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {n.note}/20
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-5 text-center text-gray-500">
                    Aucune note enregistrée
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}