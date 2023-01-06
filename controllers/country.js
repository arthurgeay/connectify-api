const logger = require("../services/logger");
const countryService = require("../services/country");

exports.getCountries = async (req, res, next) => {
  try {
    const countries = await countryService.getCountries();

    return res.json(countries);
  } catch (e) {
    logger.error(`Error fetching countries -> ${e.message}`);

    return res.status(400).json({
      message: e.message,
    });
  }
};
