const express = require("express");
const router = express.Router();
const countryCtrl = require("../controllers/country");

router.get("/", countryCtrl.getCountries);

module.exports = router;
