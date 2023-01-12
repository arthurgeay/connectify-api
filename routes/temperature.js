const express = require("express");
const router = express.Router();
const temperatureCtrl = require("../controllers/temperature");

router.post("/conversion", temperatureCtrl.getTemperature);

module.exports = router;
