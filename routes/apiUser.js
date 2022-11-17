const express = require("express");
const router = express.Router();
const apiUserCtrl = require("../controllers/apiUser");

router.post("/login", apiUserCtrl.login);
router.post("/register", apiUserCtrl.register);

module.exports = router;
