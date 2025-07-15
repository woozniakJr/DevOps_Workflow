import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Mail, KeyRound, Lock } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, motdepasse);
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col md:flex-row font-sans bg-gray-50">
      {/* Branding Section */}
      <div className="md:w-1/2 h-1/3 md:h-full bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex flex-col justify-center items-center p-8 md:p-12">
        <div className="w-full max-w-md space-y-8">

          <div className="flex justify-center mb-10">
            <img
              src="/saut.png"
              alt="Illustration EduConnect"
              className="h-80 w-auto object-contain drop-shadow-xl mb-"
            />
          </div>
           <div className="text-center">
            <h1 className="text-4xl font-bold flex items-center justify-center">
              EduConnect <span className="ml-2 ">🎓</span>
            </h1>
          </div>
          <div className="mt-8 text-center">
            <div className="inline-flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full ${
                    i === 1 ? "w-4 bg-indigo-300 animate-ping" : "w-6 bg-white animate-pulse"
                  }`}
                />
              ))}
            </div>
            <p className="mt-4 text-indigo-200 italic">
              "Ensemble pour une éducation connectée!"
            </p>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="md:w-1/2 h-2/3 md:h-full flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mt-8">
              <Lock className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
            <p className="text-gray-500">Accédez à votre espace personnel</p>
          </div>

          {error && (
            <div className="mb-6 p-3 text-sm text-red-700 bg-red-50 rounded-lg flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Adresse email
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md transition"
                  placeholder="exemple@domaine.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="motdepasse"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mot de passe
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="motdepasse"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={motdepasse}
                  onChange={(e) => setMotdepasse(e.target.value)}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2">Se souvenir de moi</span>
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-indigo-600 hover:underline"
              >
                Mot de passe oublié ?
              </a>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Connexion...
                  </>
                ) : (
                  "Se connecter"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Nouveau sur EduConnect ?
                </span>
              </div>
            </div>

            <div className="mb-8">
              <a
                href="/register"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
              >
                Créer un compte
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}