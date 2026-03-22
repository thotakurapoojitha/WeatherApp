async function getWeather() {
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    // 🌍 Get coordinates from city name
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results) {
      document.getElementById("weatherResult").innerHTML = "❌ City not found";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 🌦 Get weather data
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherResponse.json();

    const weather = weatherData.current_weather;

    // 🌡 Weather Code Mapping
    const weatherCodes = {
      0: "☀️ Clear Sky",
      1: "🌤 Mainly Clear",
      2: "⛅ Partly Cloudy",
      3: "☁️ Cloudy",
      45: "🌫 Fog",
      48: "🌫 Depositing Rime Fog",
      51: "🌦 Light Drizzle",
      61: "🌧 Rain",
      71: "❄️ Snow",
      95: "⛈ Thunderstorm"
    };

    document.getElementById("weatherResult").innerHTML = `
      <h2>${name}, ${country}</h2>
      <p>🌡 Temperature: ${weather.temperature}°C</p>
      <p>${weatherCodes[weather.weathercode] || "🌈 Weather Unknown"}</p>
      <p>🌬 Wind Speed: ${weather.windspeed} km/h</p>
      <p>🧭 Wind Direction: ${weather.winddirection}°</p>
    `;
  } catch (error) {
    document.getElementById("weatherResult").innerHTML =
      "⚠️ Error fetching weather data";
  }
}