const express = require("express");
const router = express.Router();
const apiUserCtrl = require("../controllers/apiUser");
const authMiddleware = require("../middleware/auth");

router.get("/me", authMiddleware, apiUserCtrl.getUserProfile);
router.post("/login", apiUserCtrl.login);
router.post("/register", apiUserCtrl.register);

module.exports = router;
