const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: {type: String, required: true},
  email: { type: String, required: true, unique: true },
  motdepasse: { type: String, required: true },
  role: {
    type: String,
    enum: ["ADMIN", "ENSEIGNANT", "ETUDIANT", "PARENT"],
    default: "ETUDIANT",
  },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
