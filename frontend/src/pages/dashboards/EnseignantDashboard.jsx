import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/api";
import Navbar from "../../components/Navbar";
import { FaChalkboardTeacher, FaBook, FaClipboardList, FaCalendarAlt, FaUsers, FaChartBar } from "react-icons/fa";

export default function EnseignantDashboard() {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [classesRes, evalsRes] = await Promise.all([
          API.get("/enseignant/classes"),
          API.get("/enseignant/evaluations")
        ]);

        setClasses(classesRes.data || []);
        setEvaluations(evalsRes.data || []);
      } catch (err) {
        console.error("Erreur chargement enseignant :", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate statistics
  const stats = {
    totalClasses: classes.length,
    totalEvaluations: evaluations.length,
    upcomingEvaluations: evaluations.filter(ev => new Date(ev.date) > new Date()).length
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 pt-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-indigo-700 flex items-center">
              <span className="bg-indigo-100 text-indigo-700 p-3 rounded-full mr-3">
                <FaChalkboardTeacher className="text-xl" />
              </span>
              Bonjour {user?.nom} <span className="ml-2 pt-16">👨‍🏫</span>
            </h1>
            <p className="text-gray-600 text-lg">Tableau de bord de vos classes et évaluations</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-50 mr-4">
                  <FaUsers className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Classes</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {isLoading ? <span className="animate-pulse">...</span> : stats.totalClasses}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-50 mr-4">
                  <FaClipboardList className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Évaluations</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {isLoading ? <span className="animate-pulse">...</span> : stats.totalEvaluations}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-orange-50 mr-4">
                  <FaCalendarAlt className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">À venir</h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {isLoading ? <span className="animate-pulse">...</span> : stats.upcomingEvaluations}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Classes Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-xl font-semibold flex items-center text-gray-800">
                  <span className="bg-indigo-100 text-indigo-800 p-2 rounded-lg mr-3">
                    <FaBook className="text-sm" />
                  </span>
                  Vos Classes
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {isLoading ? (
                  Array(2).fill(0).map((_, idx) => (
                    <div key={idx} className="p-5 animate-pulse">
                      <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  ))
                ) : classes.length > 0 ? (
                  classes.map((cls, idx) => (
                    <div key={idx} className="p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg text-indigo-700">{cls.nomClasse}</h3>
                          <p className="text-sm text-gray-500 mt-1">{cls.niveau}</p>
                        </div>
                        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                          {cls.nbEtudiants || 0} étudiants
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <FaBook className="mx-auto text-3xl text-gray-300 mb-3" />
                    Aucune classe assignée
                  </div>
                )}
              </div>
            </div>

            {/* Evaluations Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-xl font-semibold flex items-center text-gray-800">
                  <span className="bg-green-100 text-green-800 p-2 rounded-lg mr-3">
                    <FaClipboardList className="text-sm" />
                  </span>
                  Évaluations
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {isLoading ? (
                  Array(2).fill(0).map((_, idx) => (
                    <div key={idx} className="p-5 animate-pulse flex justify-between items-center">
                      <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  ))
                ) : evaluations.length > 0 ? (
                  evaluations.map((ev, idx) => (
                    <div key={idx} className="p-5 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-lg text-gray-800">{ev.titre}</h3>
                          <p className="text-sm text-gray-500 mt-1 flex items-center">
                            <FaChartBar className="mr-2 text-gray-400" />
                            {ev.matiere} • Classe: {ev.classe}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            new Date(ev.date) > new Date() 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <div className="flex items-center">
                              <FaCalendarAlt className="mr-1" />
                              {new Date(ev.date).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <FaClipboardList className="mx-auto text-3xl text-gray-300 mb-3" />
                    Aucune évaluation programmée
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