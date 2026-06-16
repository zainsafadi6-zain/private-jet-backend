import express from "express";

const router = express.Router();

const cityCoordinates = {
  amman: { lat: 31.95, lon: 35.93 },
  london: { lat: 51.5, lon: -0.12 },
  dubai: { lat: 25.2, lon: 55.27 },
  paris: { lat: 48.85, lon: 2.35 },
  turkey: { lat: 41.0, lon: 28.97 },
  antalya: { lat: 36.89, lon: 30.7 },
};

router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city.toLowerCase();
    const location = cityCoordinates[city];

    if (!location) {
      return res.status(404).json({ message: "City not supported" });
    }

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,wind_speed_10m`
    );

    const data = await response.json();

    res.json({
      city: req.params.city,
      temperature: data.current.temperature_2m,
      windSpeed: data.current.wind_speed_10m,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch weather data" });
  }
});

export default router;