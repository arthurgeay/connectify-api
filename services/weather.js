const fetch = require("node-fetch");
const { format } = require("date-fns");

exports.getWeather = async () => {
  try {
    const currentDate = format(new Date(), "yyyy-MM-dd");

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=47.22&longitude=-1.55&hourly=temperature_2m&current_weather=true&start_date=${currentDate}&end_date=${currentDate}&hourly=precipitation`
    );

    const result = await response.json();
    const weather = result.hourly.time.map((time, index) => {
      return {
        date: time,
        temperature: result.hourly.temperature_2m[index],
        precipitation: result.hourly.precipitation[index],
      };
    });

    return weather;
  } catch (e) {
    throw e;
  }
};
