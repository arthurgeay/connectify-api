const express = require("express");
const router = express.Router();
const weatherCtrl = require("../controllers/weather");

router.get("/current", weatherCtrl.getWeather);

module.exports = router;
