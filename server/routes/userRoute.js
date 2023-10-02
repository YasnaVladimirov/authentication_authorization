const express = require("express");
const router = express.Router();
const {verifyRoles} = require("../middleware/verifyRoles");
const ROLES_LIST = require("../config/userRoles");

const userController = require("../controllers/userController");
router.get("/", verifyRoles(ROLES_LIST.Admin), userController.getAllUsers);
router.get("/:id", userController.getUser);

router.delete("/:id", verifyRoles(ROLES_LIST.Admin), userController.deleteUser);

module.exports = router; 