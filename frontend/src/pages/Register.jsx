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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const isPasswordStrong = (password) =>
    password.length >= 8 && /\d/.test(password) && /[A-Za-z]/.test(password);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg p-8 rounded-xl shadow-xl space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 flex items-center justify-center gap-2">
          <UserPlus className="text-indigo-600" size={28} />
          Créer un compte
        </h2>

        {error && (
          <div className="text-sm text-red-600 bg-red-100 border border-red-300 p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="prenom" className="text-sm font-medium text-gray-700">Prénom</label>
            <input
              type="text"
              name="prenom"
              id="prenom"
              placeholder="Ex : Awa"
              value={formData.prenom}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="nom" className="text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="nom"
              id="nom"
              placeholder="Ex : Diop"
              value={formData.nom}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Adresse email</label>
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
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="motdepasse" className="text-sm font-medium text-gray-700">Mot de passe</label>
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
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="role" className="text-sm font-medium text-gray-700">Rôle</label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

        <p className="text-center mt-4 text-sm text-gray-600">
          Vous avez déjà un compte ?{" "}
          <a href="/login" className="text-indigo-600 hover:underline font-medium">
            Se connecter
          </a>
        </p>
      </form>
    </div>
  );
}
