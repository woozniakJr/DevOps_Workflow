const mongoose = require("mongoose");

const classeSchema = new mongoose.Schema({
  nomClasse: String,
  niveau: String
});

module.exports = mongoose.model("Classe", classeSchema);
