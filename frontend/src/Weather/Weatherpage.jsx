import { useState, useEffect } from "react";
import { CircleLoader } from "react-spinners";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import './Weatherpage.css';
import ThemeToggle from "../../components/ThemeToggle";

export default function Weatherpage() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!city) {
        setError("City is required");
        return;
      }
      const response = await fetch(`http://127.0.0.1:5000/api/${city}`, {
        method: 'POST'
      });
      if (!response.ok) {
        setError("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      if (data.error) {
        setError(data.error);
        return;
      }
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data");
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  return (
    <div
      // className={`flex flex-col h-screen ${isDarkMode ? "bg-background text-card-foreground" : "bg-background text-foreground"
      //   }`}
    >
      <header className="bg-card py-4 px-6 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold">Weather App</span>
        </div>
        <div className="flex items-center gap-4">
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={30}
          />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            placeholder="Search for a city"
            value={city}
            onChange={handleInputChange}
            className="px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
          <button type="submit" className="ml-2 px-4 py-2 bg-primary text-white rounded-md">
            Search
          </button>
        </form>
        {loading ? (
          <div className="text-muted-foreground">
            <CircleLoader color="#663419" loading size={150} speedMultiplier={1.5} />
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : weatherData ? (
          <div className="bg-card p-6 rounded-md shadow-md w-full max-w-md">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold mb-2">
                {weatherData.country}, {weatherData.city}
              </div>
              <div className="text-6xl font-bold mb-2">{weatherData.temperature}°C</div>
              <div className="text-lg text-muted-foreground mb-4">
                Feels like {weatherData.feels_like}°C
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col items-center">
                  <div className="text-lg font-bold">Humidity</div>
                  <div className="text-muted-foreground">{weatherData.humidity}%</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-lg font-bold">Wind</div>
                  <div className="text-muted-foreground">{weatherData.wind_speed} m/s</div>
                </div>
              </div>
              <div className="text-lg text-muted-foreground mt-4">{weatherData.description}</div>
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground">Enter a city to get weather data</div>
        )}
      </div>
    </div>
  );
}
