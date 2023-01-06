const express = require("express");
const router = express.Router();
const temperatureCtrl = require("../controllers/temperature");

router.get("/celsius", temperatureCtrl.getTemperature);

module.exports = router;
