const axios = require("axios");
const logger = require("../services/logger");
const { XMLParser } = require("fast-xml-parser");

exports.getTemperature = async (req, res, next) => {
  if (
    req.body.temperatures === undefined ||
    !Array.isArray(req.body.temperatures)
  ) {
    throw new Error("Bad arguments. Temperature must be an array of numbers.");
  }

  const { temperatures } = req.body;

  const farenheitTemperatures = [];

  for (const temperature of temperatures) {
    const data = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
      <soap12:Body>
        <CelsiusToFahrenheit xmlns="https://www.w3schools.com/xml/">
          <Celsius>${temperature}</Celsius>
        </CelsiusToFahrenheit>
      </soap12:Body>
    </soap12:Envelope>`;

    const config = {
      method: "post",
      url: "https://www.w3schools.com/xml/tempconvert.asmx",
      headers: {
        "Content-Type": "application/soap+xml; charset=utf-8",
      },
      data: data,
    };

    const parser = new XMLParser();

    try {
      const response = await axios(config);

      let responseJson = parser.parse(response.data);

      responseJson =
        responseJson["soap:Envelope"]["soap:Body"][
          "CelsiusToFahrenheitResponse"
        ]["CelsiusToFahrenheitResult"];

      farenheitTemperatures.push(responseJson);
    } catch (error) {
      logger.error(
        `Error conversion from celcius to farenheit -> ${e.message}`
      );

      return res.status(400).json({
        message: e.message,
      });
    }
  }

  return res.status(200).json({ temperatures: farenheitTemperatures });
};
