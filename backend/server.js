const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes montées avec le bon préfixe /api
app.use("/api", require("./routes/authRoutes"));
app.use("/api/etudiant", require("./routes/etudiantRoutes"));
app.use("/api/enseignant", require("./routes/enseignantRoutes"));
app.use("/api/parent", require("./routes/parentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/classes", require("./routes/ClassesRoutes"));
app.use("/api/evaluations", require("./routes/evaluationRoutes"));
app.use("/api/notes", require("./routes/notesRoutes"));

const PORT = process.env.PORT || 8000;
app.listen(PORT,'0.0.0.0', () =>
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`)
);
