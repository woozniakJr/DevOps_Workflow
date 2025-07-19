const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const inscrire = async (req, res) => {
  const { nom, prenom, email, motdepasse, role } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: "Email existe déjà" });

    const hashedPassword = await bcrypt.hash(motdepasse, 10);

    const user = new User({
      nom,
      prenom, 
      email,
      motdepasse: hashedPassword,
      role
    });

    await user.save();

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const connecter = async (req, res) => {
  const { email, motdepasse } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Identifiants invalides" });

    const isMatch = await bcrypt.compare(motdepasse, user.motdepasse);
    if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user: { id: user._id, prenom: user.prenom, nom: user.nom, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = { inscrire, connecter };
