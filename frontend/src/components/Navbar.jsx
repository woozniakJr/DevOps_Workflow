import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaUserShield, FaBars, FaTimes, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const roleLinks = {
    ETUDIANT: { path: "/etudiant", label: "Accueil étudiant", icon: <FaUserGraduate className="text-indigo-500" /> },
    ENSEIGNANT: { path: "/enseignant", label: "Accueil enseignant", icon: <FaChalkboardTeacher className="text-indigo-500" /> },
    PARENT: { path: "/parent", label: "Accueil parent", icon: <FaUsers className="text-indigo-500" /> },
    ADMIN: { path: "/admin", label: "Admin", icon: <FaUserShield className="text-indigo-500" /> },
  };

  const userRole = user?.role;
  const roleLink = roleLinks[userRole];

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-indigo-600 text-white p-2 rounded-lg">
                  <FaUsers className="h-5 w-5" />
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900 ml-2">EduConnect</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {user ? (
              <>
                {roleLink && (
                  <Link
                    to={roleLink.path}
                    className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors duration-200"
                  >
                    {roleLink.icon}
                    <span className="ml-2">{roleLink.label}</span>
                  </Link>
                )}

                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                          {user.nom.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-2 text-left">
                          <p className="text-sm font-medium text-gray-700">{user.nom}</p>
                          <p className="text-xs text-gray-500 capitalize">{userRole.toLowerCase()}</p>
                        </div>
                        <FaChevronDown className={`ml-1 h-3 w-3 text-gray-500 transition-transform ${profileOpen ? 'transform rotate-180' : ''}`} />
                      </div>
                    </button>
                  </div>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.nom}</p>
                          <p className="text-xs text-gray-500 capitalize">{userRole.toLowerCase()}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 flex items-center"
                          role="menuitem"
                        >
                          <FaSignOutAlt className="mr-2 text-gray-400" />
                          Déconnexion
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors duration-200"
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                >
                  Créer un compte
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-2 pb-3 space-y-1 border-t border-gray-200">
              {user ? (
                <>
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                        {user.nom.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{user.nom}</p>
                        <p className="text-xs text-gray-500 capitalize">{userRole.toLowerCase()}</p>
                      </div>
                    </div>
                  </div>

                  {roleLink && (
                    <Link
                      to={roleLink.path}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                    >
                      <div className="flex items-center">
                        {roleLink.icon}
                        <span className="ml-2">{roleLink.label}</span>
                      </div>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-red-600"
                  >
                    <div className="flex items-center">
                      <FaSignOutAlt className="text-gray-400 mr-2" />
                      Déconnexion
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                  >
                    Se connecter
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Créer un compte
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}