const logger = require("../services/logger");
const weatherService = require("../services/weather");

exports.getWeather = async (req, res, next) => {
  try {
    const weather = await weatherService.getWeather();

    return res.json(weather);
  } catch (err) {
    logger.error(`Error fetching weather -> ${err.message}`);
    return res.status(400).json({ message: err.message });
  }
};
