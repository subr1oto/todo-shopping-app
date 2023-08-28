// WeatherDisplay.tsx
import React, { useState, useEffect } from 'react';
import { WeatherData } from '../interfaces';

const WeatherDisplay: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchWeatherData(); // Fetch weather data when component mounts
    }, []);

    const fetchWeatherData = async () => {
        try {
            const apiKey = '0ac21228fcbbeb71185850d455f4534a';
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Rourkela&appid=${apiKey}`);
            const data = await response.json();
            setWeatherData({
                temperature: data.main.temp,
                condition: data.weather[0].description,
            });
            setLoading(false);
        } catch (error) {
            setError('Error fetching weather data.');
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Weather Display</h2>
            {loading && <p>Loading weather data...</p>}
            {weatherData && (
                <div>
                    <p>Temperature: {weatherData.temperature} °C</p>
                    <p>Condition: {weatherData.condition}</p>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default WeatherDisplay;