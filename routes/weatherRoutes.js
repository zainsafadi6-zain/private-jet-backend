import express from "express";

const router = express.Router();

router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city;

    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1&language=en&format=json`
    );

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      return res.status(404).json({
        message: "City not found",
      });
    }

    const location = geoData.results[0];

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,wind_speed_10m`
    );

    const weatherData = await weatherResponse.json();

    res.json({
      city: location.name,
      country: location.country,
      temperature: weatherData.current.temperature_2m,
      windSpeed: weatherData.current.wind_speed_10m,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch weather data",
    });
  }
});

export default router;