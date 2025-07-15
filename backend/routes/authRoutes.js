const express = require("express");
const { inscrire, connecter } = require("../controllers/authController");

const router = express.Router();

router.post("/register", inscrire);
router.post("/login", connecter);

module.exports = router;
