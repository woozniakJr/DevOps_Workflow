import { FaChalkboardTeacher, FaUserGraduate, FaUserTie, FaUserShield, FaBookOpen, FaChartLine, FaUsers } from "react-icons/fa";
import { MdSchool, MdAssignment, MdDateRange } from "react-icons/md";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <header className="relative bg-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 to-indigo-600 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              <span className="block">Bienvenue sur</span>
              <span className="block text-yellow-300">EduConnect</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-indigo-100">
              La plateforme éducative qui simplifie la gestion des classes, des évaluations et du suivi des étudiants.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <a
                href="/login"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-yellow-400 hover:bg-yellow-300 md:py-4 md:text-lg md:px-10 transition duration-150"
              >
                Se connecter
              </a>
              <a
                href="/register"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 md:py-4 md:text-lg md:px-10 transition duration-150"
              >
                Créer un compte
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}