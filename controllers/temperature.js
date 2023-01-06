const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");

exports.getTemperature = async (req, res, next) => {
  var data =
    '<?xml version="1.0" encoding="utf-8"?>\n<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">\n  <soap12:Body>\n    <FahrenheitToCelsius xmlns="https://www.w3schools.com/xml/">\n      <Fahrenheit>75</Fahrenheit>\n    </FahrenheitToCelsius>\n  </soap12:Body>\n</soap12:Envelope>';

  var config = {
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

    responseJson = parseInt(
      responseJson["soap:Envelope"]["soap:Body"]["FahrenheitToCelsiusResponse"][
        "FahrenheitToCelsiusResult"
      ]
    );

    return res.status(200).json(responseJson);
  } catch (error) {
    console.log(error);
  }
};
