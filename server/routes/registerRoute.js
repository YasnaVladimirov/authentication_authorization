const express = require("express");
const router = express.Router();
const { validateRegistration } = require("../validation/registerValidation");

const registerController = require("../controllers/registerController");
router.post("/", validateRegistration, registerController.handleRegister);

module.exports = router;