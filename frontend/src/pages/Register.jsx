import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, UserPlus, Mail, Loader2 } from "lucide-react";
import API from "../api/api";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    motdepasse: "",
    role: "ETUDIANT",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isPasswordStrong = (password) => {
    return password.length >= 8 && /\d/.test(password) && /[A-Za-z]/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isPasswordStrong(formData.motdepasse)) {
      setError("Le mot de passe doit contenir au moins 8 caractères, dont des lettres et des chiffres.");
      return;
    }

    setLoading(true);
    try {
      await API.post("/register", formData);
      navigate("/login");
    } catch (err) {
      setError("Erreur lors de l'inscription. Veuillez vérifier vos informations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Branding gauche */}
      <div className="md:w-1/2 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex flex-col justify-center items-center p-8 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 flex items-center justify-center">
              EduConnect <span className="ml-2">🎓</span>
            </h1>
            <p className="text-xl text-indigo-100 mt-2">
              La plateforme éducative nouvelle génération
            </p>
          </div>
          <div className="flex justify-center mt-12">
            <img
              src="/saut.png"
              alt="Illustration EduConnect"
              className="h-64 w-auto object-contain drop-shadow-xl"
            />
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i}
                  className={`h-1 rounded-full ${i === 1 ? 'w-4 bg-indigo-300 animate-ping' : 'w-6 bg-white animate-pulse'}`}
                />
              ))}
            </div>
            <p className="mt-4 text-indigo-200 italic">
              "Ensemble pour une éducation connectée!"
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire droite */}
      <div className="md:w-1/2 flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md p-8 rounded-xl shadow-md"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center gap-2">
            <UserPlus className="text-indigo-600" size={28} />
            Créer un compte
          </h2>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              name="nom"
              id="nom"
              placeholder="Ex : Diop"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
              Prenom
            </label>
            <input
              type="text"
              name="prenom"
              id="prenom"
              placeholder="Ex : awa"
              value={formData.prenom}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="exemple@domaine.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="motdepasse" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                name="motdepasse"
                id="motdepasse"
                placeholder="••••••••"
                value={formData.motdepasse}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Rôle
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ETUDIANT">Étudiant</option>
              <option value="PARENT">Parent</option>
              <option value="ENSEIGNANT">Enseignant</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-md flex items-center justify-center gap-2 transition duration-200 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Inscription..." : "S'inscrire"}
          </button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Vous avez déjà un compte ?{" "}
            <a href="/login" className="text-indigo-600 hover:underline font-medium">
              Se connecter
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
